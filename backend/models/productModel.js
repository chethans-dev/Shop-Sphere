import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a name"],
    maxLength: [10, "Max length is 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter a stock"],
    maxLength: [4, "Max length is 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        reqired: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    reqired: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", productSchema);

export default Product;
