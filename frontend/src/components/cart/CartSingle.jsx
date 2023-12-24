import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
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
    <div className="p-4">
      <div className="flex flex-nowrap items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={data.images[0].url}
            alt="picture"
            className="w-[80px] h-[130px] md:w-[106px] md:h-[186px]"
          />
          <div className="p-2 flex-1 mr-5">
            <Link to={`/product/${data.name}`}>
              <p className="text-base sm:text-lg md:text-xl font-semibold pb-3">
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
            <div className="addMinus flex items-center gap-4">
              <div
                className="border-black border-2 rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center justify-center cursor-pointer"
                onClick={() => increment(data)}
              >
                <HiPlus size={18} />
              </div>
              <span className="text-sm md:text-base">{value}</span>
              <div
                className="border-gray-800 border-2 rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] flex items-center justify-center cursor-pointer"
                onClick={() => decrement(data)}
              >
                <HiOutlineMinus size={16} />
              </div>
            </div>
            {/* <button
              className="font-medium block sm:hidden bg-pink text-white rounded-md px-3 py-1 mt-5 text-base lg:text-xl"
              onClick={() => removeFromCartHandler(data)}
            >
              Remove
            </button> */}
          </div>
        </div>
        <div className="w-fit ml-10">
          <div className="w-[90px] md:w-[115px]">
            <p className="text-center text-sm md:text-base">${totalPrice}</p>
            <hr className="h-0.5 w-[70%] lg:w-[80%] mx-auto bg-black my-2" />
            <button
              className="font-medium w-full text-base lg:text-xl"
              onClick={() => removeFromCartHandler(data)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {/* <style jsx>{`
        @media only screen and (min-width: 768px) and (max-width: 975px) {
          
        }
      `}</style> */}
    </div>
  );
};

export default CartSingle;
