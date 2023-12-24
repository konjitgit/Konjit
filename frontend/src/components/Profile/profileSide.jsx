import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
//import Collapsible from 'react-collapsible';

const ProfileSide = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [toggle, setToogle] = useState(false);

  const toggleActive = () => {
    setToogle((prev) => !prev);
  };

  const [isCollapsed1, setIsCollapsed1] = useState(false);

  const handleToggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };
  const [isCollapsed2, setIsCollapsed2] = useState(false);

  const handleToggleCollapse2 = () => {
    setIsCollapsed2(!isCollapsed2);
  };
  const [isCollapsed3, setIsCollapsed3] = useState(false);

  const handleToggleCollapse3 = () => {
    setIsCollapsed3(!isCollapsed3);
  };
  const [isCollapsed4, setIsCollapsed4] = useState(false);

  const handleToggleCollapse4 = () => {
    setIsCollapsed4(!isCollapsed4);
  };
  const [isCollapsed5, setIsCollapsed5] = useState(false);

  const handleToggleCollapse5 = () => {
    setIsCollapsed5(!isCollapsed5);
  };
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success("Logout Successful");
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <div className="bg-pink text-center text-3xl sm:text-4xl font-medium text-white px-4 py-2  border-black  rounded-t-lg border-0 flex justify-around items-center ">
        My Account
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
          {/* order subscription */}
          <div className="text-left py-2">
            <p className=" font-extrabold text-base flex items-center justify-between ">
              Order & Subscriptions
              {isCollapsed1 ? (
                <AiOutlineMinus
                  className="sm:hidden inline-block cursor-pointer  "
                  onClick={() => {
                    handleToggleCollapse1();
                  }}
                />
              ) : (
                <AiOutlinePlus
                  className="sm:hidden inline-block cursor-pointer"
                  onClick={() => {
                    handleToggleCollapse1();
                  }}
                />
              )}
            </p>

            <div
              className={`py-2 px-2 cursor-pointer  ${
                isCollapsed1 ? "block" : "hidden"
              } sm:block`}
            >
              <p
                className={`${
                  active === 1 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                My Orders
              </p>
              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                My Products
              </p>
              <p
                className={`${
                  active === 3 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(3)}
              >
                Subscriptions
              </p>
              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                Beauty Box Subscriptions
              </p>
            </div>
          </div>

          {/* offers and vouchers */}
          <div className="text-left py-2 ">
            <p className="font-extrabold text-base flex items-center justify-between">
              Offers & Vouchers
              {isCollapsed2 ? (
                <AiOutlineMinus
                  className="sm:hidden inline-block cursor-pointer  "
                  onClick={() => {
                    handleToggleCollapse2();
                  }}
                />
              ) : (
                <AiOutlinePlus
                  className="sm:hidden inline-block cursor-pointer"
                  onClick={() => {
                    handleToggleCollapse2();
                  }}
                />
              )}
            </p>

            <div
              className={`py-2 px-2 cursor-pointer  ${
                isCollapsed2 ? "block" : "hidden"
              } sm:block`}
            >
              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                My Offers
              </p>

              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                My Gift Cards
              </p>
            </div>
          </div>

          {/* save for later */}
          <div className="text-left py-2 r">
            <p className="font-extrabold text-base flex items-center justify-between">
              Save for Later
              {isCollapsed3 ? (
                <AiOutlineMinus
                  className="sm:hidden inline-block cursor-pointer  "
                  onClick={() => {
                    handleToggleCollapse3();
                  }}
                />
              ) : (
                <AiOutlinePlus
                  className="sm:hidden inline-block cursor-pointer"
                  onClick={() => {
                    handleToggleCollapse3();
                  }}
                />
              )}
            </p>

            <div
              className={`py-2 px-2 cursor-pointer  ${
                isCollapsed3 ? "block" : "hidden"
              } sm:block`}
            >
              <Link to="/wishlist">
                <p
                  className={`${
                    active === 2 ? "text-pink" : ""
                  } pb-2 hover:text-pink `}
                  onClick={() => setActive(1)}
                >
                  Wish Lists
                </p>
              </Link>
              <Link to="/inbox">
                <p
                  className={`${
                    active === 2 ? "text-pink" : ""
                  } pb-2 hover:text-pink `}
                  onClick={() => setActive(1)}
                >
                  Inbox
                </p>
              </Link>
            </div>
          </div>

          {/* account settings */}
          <div className="text-left py-2 ">
            <p className="font-extrabold text-base flex items-center justify-between">
              Account Settings{" "}
              {isCollapsed4 ? (
                <AiOutlineMinus
                  className="sm:hidden inline-block cursor-pointer  "
                  onClick={() => {
                    handleToggleCollapse4();
                  }}
                />
              ) : (
                <AiOutlinePlus
                  className="sm:hidden inline-block cursor-pointer"
                  onClick={() => {
                    handleToggleCollapse4();
                  }}
                />
              )}
            </p>

            <div
              className={`py-2 px-2 cursor-pointer  ${
                isCollapsed4 ? "block" : "hidden"
              } sm:block`}
            >
              <p
                className={`${
                  active === 5 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(5)}
              >
                Account Details
              </p>

              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                Preference Center
              </p>

              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                Social Accounts
              </p>

              <p
                className={`${
                  active === 6 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(6)}
              >
                Address Book(1)
              </p>

              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => setActive(1)}
              >
                Saved Payments
              </p>
              {user && user?.role === "Admin" && (
                <Link to="/admin/dashboard">
                  <span
                    className={` ${
                      active === 8 ? "text-pink" : ""
                    } pb-2 hover:text-pink `}
                  >
                    Admin Dashboard
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* contact */}
          <div className="text-left py-2 ">
            <p className="font-extrabold text-base flex items-center justify-between">
              Contact{" "}
              {isCollapsed5 ? (
                <AiOutlineMinus
                  className="sm:hidden inline-block cursor-pointer  "
                  onClick={() => {
                    handleToggleCollapse5();
                  }}
                />
              ) : (
                <AiOutlinePlus
                  className="sm:hidden inline-block cursor-pointer"
                  onClick={() => {
                    handleToggleCollapse5();
                  }}
                />
              )}
            </p>

            <div
              className={`py-2 px-2 cursor-pointer  ${
                isCollapsed5 ? "block" : "hidden"
              } sm:block`}
            >
              <Link to="/contact">
                <p
                  className={`${
                    active === 2 ? "text-pink" : ""
                  } pb-2 hover:text-pink `}
                  onClick={() => setActive(1)}
                >
                  Contact Us
                </p>
              </Link>
              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink `}
                onClick={() => {
                  setActive(1);
                  logoutHandler();
                  //jkl
                }}
              >
                Sign-out
              </p>
            </div>
          </div>

          <div className="text-left py-2 ">
            <Link to="/order-history">
              <p
                className={`${
                  active === 2 ? "text-pink" : ""
                } pb-2 hover:text-pink cursor-pointer `}
                onClick={() => setActive(1)}
              >
                Order Summary
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
