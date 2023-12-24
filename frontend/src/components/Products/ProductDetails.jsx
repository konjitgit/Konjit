import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Collapsible from "react-collapsible";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import Avatar from "react-avatar";
import Ratings from "./Rating";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  const [value, setValue] = useState(1);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
      console.log("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
        console.log("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
        console.log("Item added to cart successfully!");
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
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  return (
    <div className="product-details relative top-16">
      {data ? (
        <div className="w-11/12 m-auto ">
          <div className="w-full mx-auto py-5">
            <div className="block items-center md:flex justify-evenly gap-12 w-full">
              <div className=" flex flex-col items-center justify-center container gap-10">
                <img
                  src={data.images[select].url}
                  alt=""
                  className="w-[80%] h-[500px]"
                />
                <div className="w-full gap-2 grid md:grid-cols-4 grid-cols-2 justify-center items-center">
                  <div
                    className={`${
                      select === 0 ? "border-2 border-pink " : "null"
                    } cursor-pointer flex justify-center border-2`}
                  >
                    <img
                      src={data?.images[0]?.url}
                      alt=""
                      className=""
                      onClick={() => setSelect(0)}
                      style={{ height: "200px" }}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border-2 border-pink" : "null"
                    } cursor-pointer flex justify-center border-2`}
                  >
                    <img
                      src={data?.images[1]?.url}
                      alt=""
                      className=""
                      onClick={() => setSelect(1)}
                      style={{ height: "200px" }}
                    />
                  </div>
                  <div
                    className={`${
                      select === 2 ? "border-2 border-pink" : "null"
                    } cursor-pointer flex justify-center border-2`}
                  >
                    <img
                      src={data?.images[2]?.url}
                      alt=""
                      className=""
                      onClick={() => setSelect(2)}
                      style={{ height: "200px" }}
                    />
                  </div>
                  <div
                    className={`${
                      select === 3 ? "border-2 border-pink" : "null"
                    } cursor-pointer flex justify-center border-2`}
                  >
                    <img
                      src={data?.images[3]?.url}
                      alt=""
                      className=""
                      onClick={() => setSelect(3)}
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
              </div>
              <div className=" pt-5 container">
                <div className="w-full flex flex-col gap-6">
                  <h1 className="font-bold text-3xl pt-10">{data.name}</h1>
                  <div>
                    <p className="text-xl pb-2 text-gray-400">
                      Item {data._id}
                    </p>
                    <div className="flex  gap-4 items-center">
                      <p className="text-2xl">{data.rating} </p>
                      <Ratings value={data.rating} />
                    </div>
                  </div>
                  <hr />
                  <p className="font-bold text-2xl">
                    {" "}
                    {data.discountPrice} ETB
                  </p>
                  <hr />

                  <div className="flex justify-center  items-center gap-2">
                    <div className="addMinus border-2 px-10 py-3 w-1/3 border-black flex items-center justify-center gap-4">
                      <div
                        className=" border-black border-2 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => setValue(value + 1)}
                      >
                        <HiPlus size={18} />
                      </div>
                      <span>{value}</span>
                      <div
                        className=" border-gray-800 border-2 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => setValue(value === 1 ? 1 : value - 1)}
                      >
                        <HiOutlineMinus size={16} />
                      </div>
                    </div>

                    <div
                      className={`cursor-pointer bg-pink w-2/3 rounded-[5px] px-10 py-3`}
                      onClick={() => {
                        addToCartHandler(data._id);
                      }}
                    >
                      <h1 className="text-white text-xl text-center font-[600]">
                        Add to cart
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                    <span
                      onClick={() => addToWishlistHandler(data)}
                      className="cursor-pointer"
                    >
                      Add to wishlist
                    </span>
                  </div>
                  <div className="description w-11/12 py-4">
                    <div className="pt-6  border-b-2 border-rose-100">
                      <Collapsible
                        triggerStyle={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        trigger={
                          <>
                            <span className="font-bold mb-3">Description</span>
                            <span className="plus-sign">
                              <ion-icon
                                name="add-outline"
                                class="w-6 h-8 "
                                style={{
                                  transition: "transform 1s",
                                }}
                              ></ion-icon>
                            </span>
                          </>
                        }
                        triggerClassName="collapsible-trigger"
                      >
                        <div className="description">{data.description}</div>
                      </Collapsible>
                    </div>
                    <div className="pt-10  border-b-2 border-rose-100">
                      <Collapsible
                        triggerStyle={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        trigger={
                          <>
                            <span className="font-bold mb-3">
                              How to use it
                            </span>
                            <span className="plus-sign">
                              <ion-icon
                                name="add-outline"
                                class="w-6 h-8 "
                                style={{
                                  transition: "transform 1s",
                                }}
                              ></ion-icon>
                            </span>
                          </>
                        }
                        triggerClassName="collapsible-trigger"
                      >
                        <div className="description">{data.description}</div>
                      </Collapsible>
                    </div>
                    <div className="pt-10  border-b-2 border-rose-100">
                      <Collapsible
                        triggerStyle={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        trigger={
                          <>
                            <span className="font-bold mb-3">Ingredients</span>
                            <span className="plus-sign">
                              <ion-icon
                                name="add-outline"
                                class="w-6 h-8 "
                                style={{
                                  transition: "transform 1s",
                                }}
                              ></ion-icon>
                            </span>
                          </>
                        }
                        triggerClassName="collapsible-trigger"
                      >
                        <div className="description">{data.description}</div>
                      </Collapsible>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <Link to={`/seller-profile/${data.shop._id}`}>
                        <Avatar
                          name={data.shop.name}
                          size="40"
                          round={true}
                          color="#A91151"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-lg ml-4 flex gap-1 items-center ">
                        <Link to={`/seller-profile/${data.shop._id}`}>
                          {" "}
                          {data.shop.name}
                        </Link>
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
                                  <stop
                                    offset="0%"
                                    stopColor="rgb(254, 249, 195)"
                                  />
                                  <stop
                                    offset="50%"
                                    stopColor="rgb(253, 224, 71)"
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor="rgb(234, 179, 8)"
                                  />
                                </radialGradient>
                              </defs>
                              <circle
                                cx="12"
                                cy="12"
                                r="12"
                                style={{ fill: "url(#custom-gradient)" }}
                              />
                            </svg>
                            <MdVerified
                              style={{ fill: "url(#custom-gradient)" }}
                            />
                          </>
                        )}
                      </div>
                      <p>{data.shop.ratings ? "" : ""} </p>
                      <div
                        onClick={handleMessageSubmit}
                        className="flex text-xl items-center gap-2 ml-4 bg-black hover:bg-gray-800 rounded-md cursor-pointer text-white w-fit p-2 transition-colors duration-300 "
                      >
                        <AiOutlineMessage size={20} />
                        <p className="text-sm">Message</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetails;
