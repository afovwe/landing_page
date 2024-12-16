import User from '../models/ModelUser.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Get all users with filtering and pagination
export const getAllUsers = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.city) filter.city = req.query.city;
    if (req.query.country) filter.country = req.query.country;

    const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .select('-password'); // Exclude password from response

    const total = await User.countDocuments(filter);

    res.status(200).json({
        status: 'success',
        results: users.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: users
    });
});

// Get single user
export const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: user
    });
});

// Create new user (admin/superadmin only)
export const createUser = catchAsync(async (req, res, next) => {
    // Check if user trying to create admin
    if (req.body.role === 'admin' && req.user.role !== 'superadmin') {
        return next(new AppError('Only superadmin can create admin users', 403));
    }

    const newUser = await User.create(req.body);

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        data: newUser
    });
});

// Update user
export const updateUser = catchAsync(async (req, res, next) => {
    // Prevent password update through this route
    if (req.body.password) {
        return next(new AppError('This route is not for password updates. Please use /updatePassword', 400));
    }

    // Prevent role update if not superadmin
    if (req.body.role && req.user.role !== 'superadmin') {
        return next(new AppError('Only superadmin can update user roles', 403));
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).select('-password');

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: user
    });
});

// Delete user
export const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    // Prevent deleting superadmin unless you're a superadmin
    if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
        return next(new AppError('Only superadmin can delete superadmin users', 403));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Get current user profile
export const getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        status: 'success',
        data: user
    });
});

// Update current user password
export const updatePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    // Get user from collection
    const user = await User.findById(req.user.id);

    // Check if current password is correct
    if (!(await user.correctPassword(currentPassword, user.password))) {
        return next(new AppError('Your current password is incorrect', 401));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
    });
});

// Change user password (superadmin only)
export const changeUserPassword = catchAsync(async (req, res, next) => {
    // Check if requester is superadmin
    if (req.user.role !== 'superadmin') {
        return next(new AppError('Only superadmin can change other users passwords', 403));
    }

    const { newPassword } = req.body;
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    // Update password
    user.password = newPassword;
    await user.save(); // This will trigger the password hashing middleware

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
    });
});