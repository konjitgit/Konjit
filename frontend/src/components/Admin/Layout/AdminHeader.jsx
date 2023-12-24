import React from "react";
import Avatar from "react-avatar";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {GrAddCircle} from "react-icons/gr"
const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-white shadow-lg sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/" className="text-4xl font-thin">
          Konjit
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/product-create" className="800px:block hidden">
            <GrAddCircle
              color="#555"
              size={30}
              className="mx-5 cursor-pointer text-gray-800"
            />
          </Link>
          <Link to="/shop-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/shop-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/shop-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          {user?.avatar?.url ? (
            <img
              src={`${user?.avatar?.url}`}
              className="w-[35px] h-[35px] rounded-full"
              alt=""
            />
          ) : (
            <Avatar name={user.name} size="40" round={true} color="#A91151" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
