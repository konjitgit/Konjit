import React from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineDelete,
} from "react-icons/ai";
import { toast } from "react-toastify";
import Rating from "./Rating";
import { deleteProduct } from "../redux/actions/product";

const SellerProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted successfully")
    window.location.reload();
  };
  console.log(data._id);
  return (
    <div className="flex ml-10 mt-10 w-[195px] h-[260px] flex-col bg-white shadow-md">
      <div className=" relative overflow-hidden h-[180px] w-full mb-[10px] group ">
        <img
          src={data.images[0].url}
          alt="item"
          className="object-center object-cover w-full h-full"
        />
        {data.images[0].url && data.images[0].url && data.images[0].url ? (
          <img
            className="object-center object-cover w-full h-full "
            src={data.images[0].url}
            alt=""
          />
        ) : (
          <span>Image Not Found</span>
        )}
      </div>
      <div className="flex flex-col pl-2">
        <div className="text-[#7A7878] text-[12px]">
          {data.category[0].name}
        </div>
        <div className="text-[15px] font-bold">{data.name}</div>
        <Rating props={data.rating} />
        <div className="flex  justify-between items-center mt-[5px]">
          <div className="text-[13px] mt-[5px]">$ {data.discountPrice}</div>

          <AiOutlineDelete
            size={20}
            className="mr-3 cursor-pointer hover:text-red-700"
            title="Delete Product"
            onClick={() => handleDelete(data._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;
