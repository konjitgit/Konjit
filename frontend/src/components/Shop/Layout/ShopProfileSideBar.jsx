import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ShopProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const [toggle, setToogle] = useState(true);

  const toggleActive = () => {
    setToogle((prev) => !prev);
  };
  const logoutHandler = () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/shop-login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div>
      <div className="bg-pink text-center text-3xl sm:text-4xl font-medium text-white px-4 py-2  border-black  rounded-t-lg border-0 flex justify-around items-center ">
        My Shop
        {toggle ? (
          <IoIosArrowDown
            className="sm:hidden inline-block px-1 cursor-pointer"
            onClick={() => {
              toggleActive();
            }}
          />
        ) : (
          <IoIosArrowUp
            className="sm:hidden inline-block px-1 cursor-pointer"
            onClick={() => {
              toggleActive();
            }}
          />
        )}
      </div>

      <div className={`${toggle ? "block" : "hidden"} sm:block`}>
        <div className="border-[#505050] border border-t-0 py-6 px-5">
          <div className="text-left py-2 flex flex-col items-start">
            <p
              className={`${
                active === 1 ? "text-pink" : ""
              } pb-2 hover:text-pink py-2 px-2 cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Shop Details
            </p>
            {/* <Link to="/shop-profile/profile-builder" > */}
            <p
              className={`${
                active === 2 ? "text-pink" : ""
              } pb-2 hover:text-pink py-2 px-2 cursor-pointer`}
              onClick={() => setActive(2)}
            >
              Profile Builder
            </p>
            {/* </Link> */}

            <p
              className={`${
                active === 3 ? "text-pink" : ""
              } pb-2 hover:text-pink py-2 px-2 cursor-pointer`}
              onClick={() => setActive(3)}
            >
              Change Password
            </p>

            <p
              className={`${
                active === 4 ? "text-pink" : ""
              } pb-2 hover:text-pink py-2 px-2 cursor-pointer`}
              onClick={() => setActive(4)}
            >
              Social Accounts
            </p>
            <p
              className={`${
                active === 5 ? "text-pink" : ""
              } pb-2 hover:text-pink py-2 px-2 cursor-pointer`}
              onClick={() => logoutHandler()}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProfileSideBar;
