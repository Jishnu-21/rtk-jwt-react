const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware');
const adminRouter = require('./routes/adminRoutes');
const usersRouter = require('./routes/userRoutes');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
  origin: '*', 
  credentials: true,          
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);

// Custom error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
