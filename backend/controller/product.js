const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const Shop = require("../models/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const productsRouter = express.Router();
const connectDatabase = require("../db/Database");

productsRouter.get("/", async (req, res) => {
  try {
    await connectDatabase();
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
});

// create product
productsRouter.post(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body, "in the backend");
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
            upload_preset: "KonjitProducts",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;
        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//addReview
productsRouter.post(
  "/add-reviews",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const reviewData = req.body;
      const userId = req.body.userId;
      const productId = req.body.productId;
      const user = await User.findById(userId);
      const product = await Product.findById(productId);
      reviewData.user = user;
      if (!user) {
        return res.status(404).json({ message: "User id is invalid" });
      }
      product.reviews.push(reviewData);

      res.status(200).json(product);
    } catch (error) {
      console.error("Error adding review:", error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

productsRouter.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findOneAndDelete({ _id: req.params.id });

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      for (let i = 0; 1 < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        );
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

productsRouter.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

productsRouter.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

productsRouter.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = productsRouter;
