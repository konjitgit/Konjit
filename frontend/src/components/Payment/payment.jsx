import React from "react";
import OrderSummary from "../Checkout/OrderSummary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const Payment = () => {
  const notify = () => {
    toast("notifyyyy");
  };
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  return (
    <div>
      {/* <div className=" 900px:w-[550px] ">
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
           
        </div> */}
      <div className={`${styles.section} my-3`}>
        <div className="border-2 border-[#B5B5B5] rounded-lg p-2 md:p-4  sm:max-w-[550px] md:mx-2">
          <div className="flex gap-3 justify-between  border-b-[1px] border-[#B5B5B5] p-2 md:mx-4 ">
            <div className="flex gap-6 mx-0">
              <p className="text-[#505050] font-light">Contact</p>
              <p>{user.email}</p>
            </div>
            <Link to="/checkout" className="mx-0">
              <p className="underline"> Change</p>
            </Link>
          </div>

          <div className="flex gap-3 justify-between  border-b-[1px] border-[#B5B5B5] p-2 md:mx-4 ">
            <div className="flex gap-6 mx-0">
              <p className="text-[#505050] font-light">Deliver to</p>
              {/* <p>(No address)</p> */}
              <p className="text-[#505050]">
                {user.address ? `${user.address}` : `(No address)`}
              </p>
            </div>
            <Link to="/checkout" className="mx-0">
              <p className="underline"> Change</p>
            </Link>
          </div>

          <div className="flex gap-3 justify-between   p-2 md:mx-4 ">
            <div className="flex gap-6 mx-0">
              <p className="text-[#505050] font-light" onClick={notify}>
                Method
              </p>
              <div className="flex flex-col">
                <div className=" flex flex-col sm:flex-row">
                  <p className="text-[15px]">Pick up in store . </p>
                  <p className="">Hebe concept store</p>
                </div>
                <p className=" text-xs ">
                  8 Thistle Avenue, Upper Plain, WGN, Masterton
                </p>
              </div>
            </div>
            <Link to="/checkout" className="w-[25%] mx-0 ">
              <p className="underline text-black"> Change</p>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="">
            <p className="mb-2">Payment</p>
            <p className="text-[#505050] text-sm">
              All transactions are secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
