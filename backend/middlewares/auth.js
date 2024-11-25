import jsonwebtoken from "jsonwebtoken";
import catchAsyncErrors from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

export const isAuthUser = catchAsyncErrors(async (req, res, next) => {
  const { jwt } = req.cookies;

  //   1. Check if token does not exist
  if (!jwt)
    return next(new ErrorHandler("Please login to access this resource", 401));

  // 2. Verify the token
  const decoded = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new ErrorHandler("The user belonging to this token does not exist!", 401)
    );

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Unauthorized access", 403));
    }
    next();
  };
};
