const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
    index: true,
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: [
    {
      name: {
        type: String,
        required: true,
        index: true,
      },
      items: [
        {
          title: {
            type: String,
            required: true,
          },
          subItems: {
            type: [String],
            required: true,
          },
        },
      ],
    },
  ],
  gender: {
    type: String,
    enum: ["Male", "Female", "UniSex"],
    index: true,
  },
  originalPrice: { type: Number },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
    validate: {
      validator: function (value) {
        return value <= this.originalPrice;
      },
      message: "Discount price must be less than or equal to original price",
    },
  },
  stock: { type: Number, required: [true, "Please enter your product stock!"] },
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
  reviews: [
    {
      userId: {
        type: String,
      },
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
