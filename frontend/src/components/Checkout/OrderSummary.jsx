
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "../../styles/styles";

function OrderSummary({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  data,
  showDiv,
}) {
  const { cart } = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);

  // The function to toggle the active status of the button
  const toggleActive = () => {
    setActive((prev) => !prev);
  };
  const numberOfItems = cart.length;

  return (
    <div className="p-4">
      <div className="bg-beige flex justify-between p-3">
        <span>
          <span className="sm:hidden">Show </span>
          <span>
            {" "}
            Order summary
            {active ? (
              <IoIosArrowUp
                className="sm:hidden inline-block"
                onClick={() => {
                  toggleActive();
                }}
              />
            ) : (
              <IoIosArrowDown
                className="sm:hidden inline-block"
                onClick={() => {
                  toggleActive();
                }}
              />
            )}
          </span>{" "}</span>
          {/*number of items in the data */}
          <span className="hidden 900px:block">{numberOfItems} {numberOfItems !== 1 ? 'items' : 'item'}</span>{" "}

        <span className="900px:hidden">{totalPrice}</span>
      </div>

      <div className={`${active ? "block" : "hidden"} sm:block`}>
        <form className="flex h-10 mt-7 mb-4" onSubmit={handleSubmit}>
          <input
            className="border border-r-0 border-black  px-4 py-2 w-full placeholder-[#252525]    shadow-sm  focus:outline-none focus:border-[#B5B5B5;] focus:ring-[#B5B5B5;] block  text-sm focus:ring-1"
            type="email"
            placeholder="Promo code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="bg-pink hover:bg-black transition duration-500 text-white   whitespace-nowrap px-7 py-2"
            type="submit"
          >
            Apply
          </button>
        </form>

        <div className="w-full bg-[#fff]  p-5 pb-8 pt-8 border-t-2 border-t-[#000000] border-opacity-30 mt-8">
          <div className="">
            <div className="flex flex-nowrap items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={data?.images[0]?.url}
                  alt="picture"
                  className="w-[133px] h-[202px] md:w-[106px] md:h-[186px]"
                />
                <div className="p-2 flex-1 mr-5">
                  <Link to={`/productdata.name}`}>
                    <p className="text-base md:text-lg font-semibold pb-3">
                      {data.name}
                    </p>
                  </Link>
                  <p className="text-sm md:text-base text-gray-500 pb-2">
                    {data.category[0].name}
                  </p>
                  <p className="text-sm md:text-base pb-2">
                    $
                    <span className="line-through pr-2 text-red-500">
                      {data.originalPrice}
                    </span>
                    {data.discountPrice}
                  </p>
                  <p className="text-sm sm:text-base pb-2">
                    Quantity: {data.qty}
                  </p>
                  <p className="text-sm md:text-base">${data.discountPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#fff]  p-5 pb-2 pt-8 border-t-2 border-t-[#000000] border-opacity-30 mt-8">
          <div className="flex justify-between">
            <p className="text-[16px] font-[400] text-[#000000]">Sub Total:</p>
            <p className="text-[18px] ">${subTotalPrice}</p>
          </div>
          <br />
          <div className="flex justify-between">
            <p className="text-[16px] font-[400] text-[#000000]">Shipping:</p>
            <p className="text-[18px] ">${shipping.toFixed(2)}</p>
          </div>
          <br />
          <div className="flex justify-between  pb-3">
            <p className="text-[16px] font-[400] text-[#000000]">Discount:</p>
            <p className="text-[18px] ">
              -{" "}
              {discountPercentenge
                ? "$" + discountPercentenge.toString()
                : null}
            </p>
          </div>

          {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form> */}
        </div>
        <div className="bg-beige flex justify-between items-center px-6 py-2">
          <p className="text-xl">Total</p>
          <p className="text-[18px]  text-end pt-3">${totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;