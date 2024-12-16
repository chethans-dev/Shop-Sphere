import { Router } from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  getCategories,
  getProductDetails,
  updateProduct,
} from "../controllers/productsController.js";
import { isAuthUser, restrictTo } from "../middlewares/auth.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(isAuthUser, restrictTo("admin"), createProduct);

router.route("/categories").get(getCategories)

router.route("/reviews").get(getAllReviews).delete(isAuthUser, deleteReview);
router.route("/review").put(isAuthUser, createProductReview);
router
  .route("/:id")
  .put(isAuthUser, restrictTo("admin"), updateProduct)
  .delete(isAuthUser, restrictTo("admin"), deleteProduct)
  .get(getProductDetails);

export default router;
