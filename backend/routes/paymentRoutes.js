import {
  processPayment,
  sendStripePubKey,
} from "../controllers/paymentController.js";
import { isAuthUser } from "../middlewares/auth.js";
import express from "express";

const router = express.Router();

router.route("/process").post(isAuthUser, processPayment);
router.route("/pub").get(sendStripePubKey);

export default router;
