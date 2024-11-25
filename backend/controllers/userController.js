import crypto from "crypto";
import { sendSuccessResponse } from "../utils/responses.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import Email from "../utils/email.js";

// * Create and send token
const createAndSendToken = (user, res, message) => {
  const token = user.createJWT();

  // 1. Cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // 2. Only during production
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // 3. Store the token in cookie
  res.cookie("jwt", token, cookieOptions);
  return sendSuccessResponse(message, { token }, res);
};

// * Signup
export const signup = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "123", url: "testing" },
  });

  return createAndSendToken(user, res, "User created successfully");
});

// * Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exists
  if (!email || !password)
    return next(new ErrorHandler("Email and password is required", 400));

  // 2. Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new ErrorHandler("Email or password is incorrect", 404));

  // 3. Create and send the token
  return createAndSendToken(user, res, "Logged in successfully");
});

// * Logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
});

// * Forgot password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  // 1. Check if email exists
  const user = await User.findOne({ email });
  if (!user)
    return next(new ErrorHandler("User not found with this email", 404));

  // 2. Generate reset token and send it to user's email
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Create url and message
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click on the following link to reset your password: \n\n${resetUrl}\n\nIf you did not request this, please ignore this email and no changes will be made.`;

  // 4. Send email
  try {
    await new Email(
      user,
      resetUrl,
      message,
      "Shop Sphere Password recovery!!"
    ).sendMail();
    return sendSuccessResponse("Email sent successfully", {}, res);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler(`Failed to send password reset email : ${error}`, 500)
    );
  }
});

// * Reset password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // 1. Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. If no user, throw error
  if (!user)
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );

  // 3. If passwords does not match
  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Passwords does not match", 400));

  // 4. Save new password
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 5. Send token
  return createAndSendToken(user, res, "Passsword reset successfully");
});

// * User details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return sendSuccessResponse("user details found successfully", user, res);
});

// * Update password
export const upadatePassword = catchAsyncErrors(async (req, res, next) => {
  // 1. Get the user from the collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. Cheeck is passwrod is correct
  const isPasswordMatched = await user.correctPassword(
    req.body.oldPassword,
    user.password
  );

  if (!isPasswordMatched)
    return next(new ErrorHandler("Old password is incorrect", 400));

  // 3. Check if new password and confirm password are same
  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new ErrorHandler("Passsword does not match", 400));

  // 4. If so update the password
  user.password = req.body.newPassword;
  await user.save();

  // 3. Create and send the token
  return createAndSendToken(user, res, "Password changed successfully");
});

// * Update profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return sendSuccessResponse("Profile updated successfully", user, res);
});

// * All users (admin only)
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  return sendSuccessResponse("Users found successfully", users, res);
});

// * Single user (admin only)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  return sendSuccessResponse("Users found successfully", user, res);
});

// * Update user role (admin only)
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    role: req.body.role,
  });

  if (!user) return next(new ErrorHandler("User not found", 404));

  return sendSuccessResponse("User role updated successfully", user, res);
});

// * Delete user (admin only)
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  return sendSuccessResponse("User deleted successfully", {}, res);
});
