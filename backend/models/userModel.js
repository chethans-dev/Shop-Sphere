import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [30, "Name cannot exceed 30 characters"],
      minlength: [4, "Name cannot be less than 4 characters"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [8, "Password must be at least 8 characters"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to perform password encryption before saving to db
userSchema.pre("save", async function (next) {
  // 1. If the password is not modified return, because when we update the user, we shouldn't re-encrypt the password
  if (!this.isModified("password")) return next();

  // 2. Encrypt the password
  this.password = await bcrypt.hash(this.password, 12);

  // 3. When password is changed, update the change time
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  // 4. Call next()
  next();
});

// Works before query is executed
userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});

// Create jwt
userSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Generate passsword reset token
userSchema.methods.createPasswordResetToken = function () {
  // 1. Create a token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2. Hash the token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 3. Set token expiration
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  // 4. Return the token
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
