import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";
import Rating from "./Rating";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { MdVerified } from "react-icons/md";
const ProductCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const d = data.name;
  const product_name = d && d.replace(/\s+/g, "-");
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  return (
    <div className="flex  mt-10  w-[155px] h-[210px] sm:w-[175px] sm:h-[240px] md:w-[195px] md:h-[260px] flex-col bg-white shadow-md">
      <div className=" relative overflow-hidden h-[180px] w-full mb-[10px] rounded-lg group ">
        <Link to={`/product/${product_name}`}>
          <img
            src={data.images[0].url}
            alt="item"
            className="object-center object-cover w-full h-full"
          />
          {/* add to cart button */}{" "}
        </Link>
        {/* <div className="cursor-pointer z-0 absolute h-full w-full bg-black/20 flex items-center text-white justify-center -bottom-30 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-300">
          <AiOutlineShoppingCart
            size={25}
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
        </div> */}
      </div>

      <div className="flex flex-col pl-2 ">
        {/* /*link to category*/}
        <category className="text-[#7A7878] text-[12px] pb-3">
          {data.category[0].name}
        </category>
        <Link
          to={`/product/${product_name}`}
          className="flex gap-0.5 items-center "
        >
          <name className="text-[16px] font-medium ">{data.name}</name>
          {data.shop.verify && (
            <>
              <svg width="0" height="0">
                <defs>
                  <radialGradient
                    id="custom-gradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop offset="0%" stopColor="rgb(254, 249, 195)" />
                    <stop offset="50%" stopColor="rgb(253, 224, 71)" />
                    <stop offset="100%" stopColor="rgb(234, 179, 8)" />
                  </radialGradient>
                </defs>
                <circle
                  cx="12"
                  cy="12"
                  r="12"
                  style={{ fill: "url(#custom-gradient)" }}
                />
              </svg>
              <MdVerified style={{ fill: "url(#custom-gradient)" }} />
            </>
          )}
        </Link>
        {/* rating */}
        {/* <Rating props={data.rating} /> */}
        <div className="flex my-[5px]">
          <price className="text-[15px]  mt-[5px]">
            ETB {data.discountPrice}
          </price>
          <div className="ml-auto cursor-pointer mr-1">
            {click ? (
              <AiFillHeart
                size={20}
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={20}
                onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
