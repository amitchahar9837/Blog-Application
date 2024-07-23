import User from '../api/models/user.model.js';
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).json({ message: "All fields are requred" });
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
            res.status(404).json({ message: error.message });
      }

}