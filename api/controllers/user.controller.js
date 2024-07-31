import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
      res.json({ message: "Test API is running" });
}

export const updateUser = async (req, res, next) => {
      if (req.user.id !== req.params.userId) {
            return next(errorHandler(403, 'You are not allowed to update the user'))
      }
      if (req.body.password) {
            if (req.body.password.length < 6) {
                  return next(errorHandler(400, 'Password must be at least 6 characters'))
            }

            req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      if (req.body.username) {
            if (req.body.username.length < 7 || req.body.username.length > 20) {
                  return next(errorHandler(400, 'username must be between 7 and 20 characters'))
            }
            if (req.body.username.includes(' ')) {
                  return next(errorHandler(400, 'username cannot contain spaces'))
            }
            if (req.body.username !== req.body.username.toLowerCase()) {
                  return next(errorHandler(400, 'username must be lowercase'))
            }
            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                  return next(errorHandler(400, 'username can only contain letters and numbers'))
            }
      }
      try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                  $set: {
                        username: req.body.username,
                        email: req.body.email,
                        profilePicture: req.body.profilePicture,
                        password: req.body.password,
                  }
            }, { new: true })

            const { password, ...rest } = updateUser._doc;
            res.status(200).json(rest);
      } catch (error) {
            next(errorHandler(error));
      }
}

export const deleteUser = async (req, res, next) => {
      if (!req.user.isAdmin && req.user.id !== req.params.userId) {
            return next(errorHandler(403, "You are not allowed to delete account"))
      }
      try {
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("Account has been deleted")
      } catch (error) {
            next(error);
      }
}

export const signout = (req, res, next) => {
      try {
            res.clearCookie('access_token').status(200).json("User has been signed out")
      } catch (error) {
            next(error)
      }
}

export const getUsers = async (req, res, next) => {
      if (!req.user.isAdmin) {
            return next(errorHandler(403, "Unauthorized"))
      }
      try {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 10
            const sortDirection = req.query.order === 'asc' ? 1 : -1;
            const usersData = await User.find()
                  .sort({ updatedAt: sortDirection })
                  .skip(startIndex)
                  .limit(limit);

            const users = usersData.map(data => {
                  const { password, ...rest } = data._doc;
                  return rest;
            })

            const totalUsers = await User.countDocuments();

            const Now = new Date();

            const oneMonthAgo = new Date(
                  Now.getFullYear(),
                  Now.getMonth() - 1,
                  Now.getDate()
            )

            const lastMonthUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

            res.status(200).json({
                  users,
                  totalUsers,
                  lastMonthUsers,
            })
      } catch (error) {
            next(error)
      }
}