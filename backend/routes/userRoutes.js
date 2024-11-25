import express from "express";
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  upadatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} from "../controllers/userController.js";
import { isAuthUser, restrictTo } from "../middlewares/auth.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);

// * Authenticated users only
router.use(isAuthUser);
router.route("/me").get(getUserDetails).put(updateProfile);
router.route("/updatePassword").put(upadatePassword);

// * Admin only
router.use(restrictTo("admin"));
router.route("/all").get(getAllUsers);
router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUserRole);

export default router;
