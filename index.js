import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGOURI).then(() => {
      console.log("Database connected");
}).catch((err) => {
      console.log(err);
});

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(statusCode).json({
            success: false,
            statusCode,
            message
      });
});

// Start Server
app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});
