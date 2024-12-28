import Product from "../models/productModel.js";
import {
  sendCreatedResponse,
  sendNoContentResponse,
  sendSuccessResponse,
} from "../utils/responses.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

// Create product - Admin
export const createProduct = catchAsyncErrors(async (req, res) => {
  const productPayload = req.body;

  const images = req.files?.images;
  let imagesArray = [];

  if (images) {
    // Normalize images to an array, even if only one file is uploaded
    const imagesToProcess = Array.isArray(images) ? images : [images];

    // Process each image and upload to Cloudinary
    for (const image of imagesToProcess) {
      const bufferStream = new Readable();
      bufferStream.push(image.data);
      bufferStream.push(null);

      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        // Pipe the buffer stream to Cloudinary
        bufferStream.pipe(uploadStream);
      });

      // Add uploaded image details to the images array
      imagesArray.push({
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      });
    }
  }

  // Add the uploaded images to the product payload
  productPayload.images = imagesArray;
  productPayload["user"] = req.user.id;
  const product = await Product.create(productPayload);
  return sendCreatedResponse("Product created successfully", product, res);
});

// Get all products - All
export const getAllProducts = catchAsyncErrors(async (req, res) => {
  // const totalProducts = await Product.countDocuments();
  const apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate();
  const products = await apiFeature.query;
  const totalProducts = products.length;
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
  const product = await Product.findById(id)
  // const product = await Product.findByIdAndDelete(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  // Delete all associated Cloudinary images
  const imageDeletionPromises = product.images.map(async (image) => {
    try {
      await cloudinary.uploader.destroy(image.public_id);
    } catch (error) {
      console.error(`Failed to delete image with public_id ${image.public_id}:`, error);
    }
  });

  // Wait for all images to be deleted
  await Promise.all(imageDeletionPromises);

  // Delete the product from the database
  await product.deleteOne();

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

// Get all categories
export const getCategories = catchAsyncErrors(async (req, res) => {
  const categories = await Product.distinct("category");
  return sendSuccessResponse(
    "Categories fetched successfully",
    categories,
    res
  );
});

// Get all products for admin
export const getAllAdminProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();
  return sendSuccessResponse(
    "Products fetched successfully",
    { products },
    res
  );
});
