
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
export const signup = async (req, res, next) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, "All fields are required"));
      }

      const hashedpassword = bcryptjs.hashSync(password,10);
      const newUser = new User({
            username,
            email,
            password:hashedpassword
      });

      try {
            await newUser.save();
            res.status(201).json({ message: "Signup Successfull" });
      } catch (error) {
            next(error);
      }

}