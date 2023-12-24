import React, { useState, useEffect } from "react";

import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { SlArrowLeft } from "react-icons/sl";
import styles from "../../styles/styles";
import OrderSummary from "./OrderSummary.jsx";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [deliveryMethod, setdeliveryMethod] = useState("");
  console.log(cart);
  const navigate = useNavigate();
  // The state variable for the display status of the div
  const [showDiv, setShowDiv] = useState("first");
  const [active, setActive] = useState(true);

  // The function to toggle the active status of the button
  const toggleActive = (prev) => {
    setActive(prev);
  };

  // The function to toggle the display status of the div
  const toggleDiv = (button) => {
    setShowDiv(button);
  };
  // setdeliveryMethod(showDiv)
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const paymentSubmit = () => {
    let orderData = "";
    setdeliveryMethod(showDiv);
    if (showDiv === "first") {
      if (
        address1 === "" ||
        address2 === "" ||
        //zipCode === null ||
        country === "" ||
        city === ""
      ) {
        toast.error("Please choose your delivery address!");
      } else {
        const shippingAddress = {
          address1,
          address2,
          //zipCode,
          country,
          city,
        };

        orderData = {
          cart,
          totalPrice,
          subTotalPrice,
          deliveryMethod,
          shipping,
          discountPrice,
          shippingAddress,
          user,
        };
      }
    } else if (showDiv === "second") {
      orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        deliveryMethod,
        shipping,
        discountPrice,
        //shippingAddress,
        user,
      };
    }
    /* cart data:
  _v,
  _id,
  category,
  createdAt,
  description,
  discountPrice,
  images:Array,
  name,
  originalPrice,
  qty,
  reviews:Array,
  shop:object{role,availibleBalance,createdAt,address,...},
  shopId,
  sold_out,
  stock,
  tags
 
*/
    // update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  //   group cart items by shopId
  const shopItemsMap = new Map();

  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, {
        items: [],
        address: item.shop.address,
        shopName: item.shop.name,
      });
    }
    shopItemsMap.get(shopId).items.push(item);
  }

  //  console.log('shopItemsMap after push',shopItemsMap )
  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };
  console.log(showDiv);
  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  //console.log(discountPercentenge);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className=" flex flex-col 900px:flex-row-reverse gap-4">
          {/* {isUser ? "checkout " : "Become Seller"} */}
          {/* <p className="uppercase text-xl mx-4 my-4 font-extrabold text-center ">
            Checkout 
          </p>
          <div className="">
            <span
              className="text-neutral-800
            text-[12px] md:text-[14px]
            font-normal "
            >
              Checkout faster with saved details and get access to exclusive
              offers
            </span>
            <Link to="/login" className="inline-block"> */}
          {/* <div className={`${styles.open_button}  `}>
                <span className=" text-[15px] ">Login or Sign up</span>
              </div>
            </Link>
          </div>
        </div> */}

          {/* <div className="my-4">
          <form className="">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Contact
              </span>{" "}
            </label>
            <input
              className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-1 px-3 py-2   shadow-sm  placeholder-slate-400 focus:outline-none focus:border-beige focus:ring-pink block  text-sm focus:ring-1"
              type="tel"
              placeholder="Enter your phone number"
              id="phone"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
            />
          </form>
        </div> */}

          <div className=" 900px:w-[550px] ">
            {cart &&
              cart.map((i, index) => {
                console.log(i);
                return (
                  <OrderSummary
                    key={index}
                    data={i}
                    handleSubmit={handleSubmit}
                    totalPrice={totalPrice}
                    shipping={shipping}
                    subTotalPrice={subTotalPrice}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    discountPercentenge={discountPercentenge}
                    showDiv={showDiv}
                  />
                );
              })}
          </div>
          {/* design me home --> no of product, seller rate, sold products, best seller..
   ruth++us sell
  ruhi  products --> added 
            --> sold
            --> all
  me  orders--> placed        
          --> history
    ##        
  ruth  profile--  edit
  different footer and different faq      */}

          {/* delivery method */}
          <div className={`${styles.section} my-4 `}>
            <p className="text-lg font-medium uppercase">Delivery Method</p>

            <div className="flex flex-col  my-4">
              {/* The first button that can show or hide the first div */}
              <div className=" w-full flex flex-row h-[45px] md:ml-4">
                <div
                  className={`${
                    active ? "bg-beige text-black" : "bg-[#F9F9F9] "
                  } p-2 px-8 border-r-4 border-[#B5B5B5;]  md:w-[25%]  hover:bg-beige focus:outline-none flex flex-row items-center justify-center cursor-pointer mx-0`}
                  onClick={() => {
                    toggleDiv("first");
                    toggleActive(true);
                  }}
                >
                  <CiDeliveryTruck size={18} className="h-[18px]" />

                  <span className="pl-2">Shipping</span>
                </div>
                {/* The second button that can show or hide the second div */}
                <div
                  className={` ${
                    active ? "bg-[#F9F9F9] " : "bg-beige text-black "
                  } p-2  px-8  hover:bg-beige focus:outline-none mx-0  md:w-[25%] flex flex-row items-center justify-center cursor-pointer`}
                  onClick={() => {
                    toggleDiv("second");
                    toggleActive(false);
                  }}
                >
                  <GrLocation size={18} className="h-[18px]" />
                  <span className="pl-2">Pick Up</span>
                </div>
              </div>

              {/* The first div that is shown or hidden based on the state variable and the first button */}
              {showDiv === "first" && (
                <div className=" mx-0 max-w-[650px] bg-white rounded-xl shadow-md overflow-hidden  my-4  ">
                  <div className="py-4">
                    <div className="uppercase tracking-wide text-lg text-black ">
                      shipping address
                    </div>

                    <p className="mt-2 text-slate-500 text-sm ">Required *</p>
                    <form action="" className="flex flex-col">
                      <div className="sm:flex gap-2 w-full">
                        <input
                          type="text"
                          className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                          placeholder="First Name *"
                          value={user && user.name}
                          required
                        ></input>

                        <input
                          type="text"
                          className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                          placeholder="Last Name *"
                          required
                        ></input>
                      </div>

                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={user && user.phoneNumber}
                        className={`border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1`}
                      />
                      <input
                        type="text"
                        className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                        placeholder="Address 1*"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      ></input>

                      <input
                        type="text"
                        className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                        placeholder="Address 2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      ></input>

                      {/* <input
                      type="text"
                      className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                      placeholder="City *"
                    ></input> */}

                      {/* <input
                      type="text"
                      className="border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                      placeholder="Zip code"
                    ></input> */}

                      <div className="w-full flex pb-3 sm:flex gap-2 ">
                        <div className="w-[50%]">
                          <select
                            className=" h-[40px]  border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1 bg-white"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option className="block pb-2" value="">
                              Choose your country *
                            </option>
                            {Country &&
                              Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="w-[50%]">
                          <select
                            className="  h-[40px]  bg-white border border-gray-400 rounded-sm   max-w-sm  mt-3 px-3 py-2   shadow-sm  placeholder-slate-800 focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          >
                            <option
                              className="block pb-2 border border-gray-400 rounded-sm  w-full max-w-sm  mt-3 px-3 py-2   shadow-sm  "
                              value=""
                            >
                              Choose your City
                            </option>
                            {State &&
                              State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* The second div that is shown or hidden based on the state variable and the second button */}
              {showDiv === "second" &&
                Array.from(shopItemsMap).map(
                  ([shopId, { address, items, shopName }]) => (
                    <div className="max-w-[650px] mx-2  bg-white rounded-xl shadow-md overflow-hidden  mt-4 mb-4 ">
                      <div className="py-4">
                        <div className=" tracking-wide text-lg text-black ">
                          Pickup locations
                        </div>
                        {/* {console.log(showDiv)} */}
                        <div className="flex flex-col my-4" key={shopId}>
                          <div className="rounded-lg border-[#505050] border p-2 bg-beige">
                            <p className="">
                              Hebe Concept Store (18.54km) {shopName}
                            </p>
                            <p className="text-[#505050]">
                              8 Thistle Avenue, Upper Plain WGN, Masterton{" "}
                              {address}
                            </p>
                            <p className="text-[#505050]">
                              Usually ready in 24 hours
                            </p>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>

            <div className="flex sm:flex-row flex-col-reverse gap-4 items-center justify-between">
              <div className="flex flex-row items-center justify-center cursor-pointer mx-0 gap-4 hover:text-pink ">
                <SlArrowLeft size={18} className="h-[16px] mx-0" />
                <Link to={"/cart"}>
                  <p>Return to cart</p>
                </Link>
              </div>
              <div className="mx-0">
                <Link to="/payment">
                  {" "}
                  <button className={`${styles.button} `}>
                    Continue to Payment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
