import {isAuthUser, restrictTo} from "../middlewares/auth.js";
import express from "express";
import {deleteOrder, getAllOrders, getOrder, getOrders, newOrder, updateOrder} from "../controllers/orderController.js";

const router = express.Router();

router.route("/all").get(isAuthUser, restrictTo("admin"), getAllOrders);
router.route("/").post(isAuthUser, newOrder).get(isAuthUser, getOrders)
router.route("/:id")
    .get(isAuthUser, getOrder)
    .put(isAuthUser, restrictTo("admin"), updateOrder)
    .delete(isAuthUser, restrictTo("admin"), deleteOrder)

export default router;