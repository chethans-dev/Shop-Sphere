import Product from "../models/productModel.js";
import {
  sendCreatedResponse,
  sendNoContentResponse,
  sendSuccessResponse,
} from "../utils/responses.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

// Create product - Admin
export const createProduct = catchAsyncErrors(async (req, res) => {
  const productPayload = req.body;
  productPayload["user"] = req.user.id;
  const product = await Product.create(productPayload);
  return sendCreatedResponse("Product created successfully", product, res);
});

// Get all products - All
export const getAllProducts = catchAsyncErrors(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate();
  const products = await apiFeature.query;
  return sendSuccessResponse(
    "Products fetched successfully",
    { products, totalProducts },
    res
  );
});

// Get single product - All
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  return sendSuccessResponse(
    "Product details fetched successfully",
    product,
    res
  );
});

// Update product - Admin
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) return next(new ErrorHandler("Product not found", 404));

  return sendSuccessResponse("Product updated successfully", product, res);
});

// Delete product - Admin
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  return sendNoContentResponse(res);
});

// Create product review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed)
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  return sendSuccessResponse("Review created successfully", product, res);
});

// Get all reviews of a single product
export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const productId = req.query.pid;
  const product = await Product.findById(productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  return sendSuccessResponse(
    "Reviews fetched successfully",
    { reviews: product.reviews },
    res
  );
});

// Delete reviews of a single product
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const productId = req.query.pid;
  const product = await Product.findById(productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.rid
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = reviews.length > 0 ? avg / reviews.length : 0;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { runValidators: true, new: true, useFindAndModify: false }
  );

  return sendSuccessResponse(
    "Deleted Review successfully",
    { reviews: product.reviews },
    res
  );
});
