// api/controllers/authController.js
import User from '../models/ModelUser.js';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;
  
  // Check if any users exist
  const userCount = await User.countDocuments();
  
  // If this is the first user, allow them to be superadmin
  // Otherwise, only superadmin can create admin users
  if (userCount > 0 && role === 'admin' && (!req.user || req.user.role !== 'superadmin')) {
    return next(new AppError('Only superadmin can create admin users', 403));
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: { user }
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    token,
    data: { user }
  });
});