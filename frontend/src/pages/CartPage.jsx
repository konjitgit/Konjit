import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import CartSingle from "../components/cart/CartSingle";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
function CartPage() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  return (
    <div className="bg-beige">
      <Header />

      <div className=" relative top-20">
        <h1 className="font-semibold text-4xl text-center m-10 py-10 ">CART</h1>
        <div className="w-10/12 flex flex-col gap-10 m-auto">
          <div className="header flex justify-between">
            <p className="w-4/12"></p>
            <div className="flex md:justify-evenly justify-center w-8/12">
              <p className="hidden md:block">Quantity</p>
              <p className="">Price</p>
              <p className="hidden md:block">Total</p>
            </div>
          </div>
          <hr className="h-0.5 bg-black" />
          <div className="main hidden md:flex gap-4 flex-col">
            {cart &&
              cart.map((i, index) => {
                console.log(index);
                return (
                  <SingleItem
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                );
              })}
          </div>
          <div className="md:hidden w-full">
            {cart &&
              cart.map((i, index) => {
                console.log(index);
                return (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                );
              })}
          </div>
          <hr className="h-0.5  bg-black" />
        </div>

        <div className="m-auto  w-fit flex flex-col gap-3 py-10 my-10">
          <p className="text-3xl text-center">Subtotal 200.00ETB</p>
          <p className="text-center">
            Shipping, taxes, and discount codes calculated at checkout
          </p>
          <Link to="/">
            <h1 className="h-[45px] flex items-center justify-center w-full bg-pink rounded-[5px] text-white text-[20px] font-[600]">
              Checkout
            </h1>
          </Link>
          <p className="text-center">Continue Shopping</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const SingleItem = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;
  console.log(data.qty);

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
      console.log("stockkkkk");
    } else {
      setValue(value + 1, () => {
        const updateCartData = { ...data, qty: value + 1 };
        quantityChangeHandler(updateCartData);
      });
    }
  };

  const decrement = (data) => {
    const updatedValue = value === 1 ? 1 : value - 1;
    setValue(updatedValue, () => {
      const updateCartData = { ...data, qty: updatedValue };
      quantityChangeHandler(updateCartData);
    });
  };
  return (
    <div className="flex gap-8 items-center">
      <div className="flex items-center gap-4 w-4/12">
        <img
          src={data.images[0].url}
          alt="pictu"
          className="md:w-[176px] md:h-[256px] w-[103px] h-[151px] "
        />
        <div className="flex gap-1 flex-col pr-5">
          <p className="md:text-xl text-lg font-semibold">{data.name}</p>
          <p className="md:text-lg text-md font-medium">{data.category[0].name}</p>
          <p>{data.rating} Stars</p>
        </div>
      </div>

      <div className="flex justify-evenly w-8/12 ">
        <div className="flex flex-col gap-3 items-center ">
          <div className="addMinus flex gap-4 ">
            <div
              className=" border-black border-2 rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => increment(data)}
            >
              <HiPlus size={18} />
            </div>
            <span>{value}</span>
            <div
              className=" border-gray-800 border-2 rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} />
            </div>
          </div>
          {data.stock > 0 ? <p className="">In Stock</p> : <p>Out of Stock</p>}
        </div>
        <div className=" w-[115px] ">
          <p className="text-center text-lg">$ {data.discountPrice}</p>
          <hr className="h-0.5 bg-black my-2 " />
          <button
            className="font-medium w-full text-xl"
            onClick={() => removeFromCartHandler(data)}
          >
            Remove
          </button>
        </div>
        <div>
          <p className="text-xl">$ {totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
