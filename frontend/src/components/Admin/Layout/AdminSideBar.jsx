import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill} from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag, BsShopWindow } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const AdminSideBar = ({ active }) => {
  
  return (
    <div
      className={`w-full h-[90vh] 
      bg-white shadow-xl sticky top-5 left-0 z-10 flex flex-col items-center`}
    >
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin/dashboard"
          className={`w-full flex items-center   px-2 py-2  ${
            active === 1 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <RxDashboard size={30} color={`${active === 1 ? "white" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-orders"
          className={`w-full flex items-center px-2 py-2 ${
            active === 2 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "white" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-sellers"
          className={`w-full flex items-center px-2 py-2 ${
            active === 3 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <BsShopWindow
            size={30}
            color={`${active === 3 ? "white" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
            All Sellers
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-users"
          className={`w-full flex items-center px-2 py-2 ${
            active === 4 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "white" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
            All Users
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-products"
          className={`w-full flex items-center px-2 py-2 ${
            active === 5 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <BsHandbag size={30} color={`${active === 5 ? "white" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-requests"
          className={`w-full flex items-center px-2 py-2 ${
            active === 6 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <AiOutlineCheckCircle
            size={30}
            color={`${active === 6 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-white" : "text-[#555]"
            }`}
          >
            All Requests
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-withdraw-request"
          className={`w-full flex items-center px-2 py-2 ${
            active === 7 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <CiMoneyBill size={30} color={`${active === 7 ? "white" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
            Withdraw Request
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/user"
          className={`w-full flex items-center px-2 py-2${
            active === 8 ? "text-white bg-pink rounded" : "text-[#555]"
          }`}
        >
          <AiOutlineSetting
            size={30}
            color={`${active === 8 ? "white" : "#555"}`}
          />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
