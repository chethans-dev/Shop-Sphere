import Stripe from "stripe";
import catchAsyncErrors from "../utils/catchAsync.js";
import { sendCreatedResponse } from "../utils/responses.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: {
      company: "Shop-Sphere",
    },
    shipping: req.body?.shipping,
    description: "Test payment",
  });
  return sendCreatedResponse(
    "Processed!",
    { success: true, client_secret: myPayment.client_secret },
    res
  );
});

export const sendStripePubKey = catchAsyncErrors(async (req, res, next) => {
  // sbk - stripe publish key
  return res.status(200).json({ sbk: process.env.STRIPE_PUB_KEY });
});
