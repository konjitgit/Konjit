const express = require("express");
const path = require("path");
const shopRouter = express.Router();
const jwt = require("jsonwebtoken");
const Shop = require("../models/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
//trade License
//seller ID
// create shop
//create shop
shopRouter.post(
  "/create-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      const shopExists = await Shop.findOne({ email });

      if (shopExists) {
        return next(new ErrorHandler("shop already exists", 400));
      }
      const shop = await Shop.create({
        name: req.body.name,
        email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      });
      console.log("shop is working");

      if (shop) {
        sendShopToken(shop, 201, res);
      } else {
        res.status(400);
        next(new ErrorHandler("Invalid shop data", 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// login shop
shopRouter.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
shopRouter.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      console.log("isSeller");
      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
shopRouter.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
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

// get shop info
shopRouter.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
shopRouter.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);
      if (req.body.avatar !== "") {
        if (existsSeller.avatar && existsSeller.avatar.public_id) {
          const imageId = existsSeller.avatar.public_id;
          await cloudinary.v2.uploader.destroy(imageId);
        }

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        existsSeller.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

shopRouter.put(
  "/update-business-details",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        region,
        kifleKetema,
        woreda,
        kebele,
        houseNo,
        businessType,
        verifyRequest,
      } = req.body;
      const shop = await Shop.findOne(req.seller._id);
      console.log(req.body);
      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }
      const myCloud1 = await cloudinary.v2.uploader.upload(
        req.body.tradeLicense,
        {
          folder: "tradeLicense",
        }
      );
      shop.businessInfo.businessName = name;
      shop.businessInfo.address.region = region;
      shop.businessInfo.address.kifleKetema = kifleKetema;
      shop.businessInfo.address.woreda = woreda;
      shop.businessInfo.address.kebele = kebele;
      shop.businessInfo.address.houseNo = houseNo;
      shop.businessType = businessType;
      shop.businessInfo.tradeLicense.public_id = myCloud1.public_id;
      shop.businessInfo.tradeLicense.url = myCloud1.secure_url;
      shop.verifyRequest = verifyRequest;
      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update seller account details

shopRouter.put(
  "/update-seller-details",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        region,
        city,
        address,
        businessType,
        verifyRequest,
      } = req.body;
      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }
      const myCloud2 = await cloudinary.v2.uploader.upload(req.body.ID, {
        folder: "sellerId",
      });
      shop.sellerInfo.firstName = firstName;
      shop.sellerInfo.lastName = lastName;
      shop.sellerInfo.region = region;
      shop.sellerInfo.city = city;
      shop.sellerInfo.address = address;
      shop.businessType = businessType;
      shop.sellerInfo.ID.image.public_id = myCloud2.public_id;
      shop.sellerInfo.ID.image.url = myCloud2.secure_url;
      shop.verifyRequest = verifyRequest;
      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
shopRouter.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

shopRouter.put(
  "/update-socials",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { telegram, twitter, whatsapp, tiktok, instagram, facebook } =
        req.body;
      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }
      shop.socials.telegram = telegram;
      shop.socials.twitter = twitter;
      shop.socials.whatsapp = whatsapp;
      shop.socials.tiktok = tiktok;
      shop.socials.instagram = instagram;
      shop.socials.facebook = facebook;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// all sellers --- for admin
shopRouter.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
shopRouter.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all requests
shopRouter.get(
  "/get-all-requests",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const requests = await Shop.find({ verifyRequest: true });
      console.log(requests);
      res.status(201).json({
        success: true,
        requests,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//verify seller
shopRouter.put(
  "/verify-seller",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;
      const updatedSeller = await Shop.findByIdAndUpdate(sellerId, {
        verify: true,
        verifyRequest: false,
      });
      res.status(201).json({
        success: true,
        updatedSeller,
      });
      console.log("inside");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = shopRouter;
