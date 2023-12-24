const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "Seller",
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  zipCode: {
    type: Number,
  },
  withdrawMethod: {
    type: Object,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      amount: {
        type: Number,
      },
      status: {
        type: String,
        default: "Processing",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  socials: {
    telegram: { type: String },
    twitter: { type: String },
    whatsapp: { type: String },
    tiktok: { type: String },
    instagram: { type: String },
    facebook:{type:String}
  },

  sellerInfo: {
    firstName: { type: String },
    lastName: { type: String },
    region: { type: String },
    city: { type: String },
    address: { type: String },
    phoneNumber: { type: Number },
    ID: {
      image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  },
  businessType: {
    type: String,
  },
  businessInfo: {
    businessName: { type: String },
    address: {
      region: { type: String },
      kifleKetema: { type: String },
      woreda: { type: String },
      kebele: { type: String },
      houseNo: { type: String },
    },
    tradeLicense: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyRequest: {
    type: Boolean,
    default: false,
  },
});

shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comapre password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
