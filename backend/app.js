const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "https://tester-j7yp.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const productsRouter = require("./controller/product");
const shopRouter = require("./controller/shop");
const userRouter = require("./controller/user");
const OrdersRouter = require("./controller/order");
const conversationRouter = require("./controller/conversation");
const messageRouter = require("./controller/message");

app.use("/api/products", productsRouter);
app.use("/api/shop", shopRouter);
app.use("/api/user", userRouter);
app.use("/api/order", OrdersRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);



app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

module.exports = app;
