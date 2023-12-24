import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";

function SellerHeader() {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [hoveredItem, setHoveredItem] = useState(null);
  console.log(seller);
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div>
      <nav className="flex justify-between px-10 py-5 items-center bg-white ">
        <Link to="/">
          <p className="text-4xl font-thin">Konjit</p>
        </Link>
        <Link to={`/shop-profile`}>
          <div>
            {seller?.avatar?.url ? (
              <img
                src={`${seller?.avatar?.url}`}
                className="w-[35px] h-[35px] rounded-full"
                alt=""
              />
            ) : (
              <Avatar
                name={seller.name}
                size="40"
                round={true}
                color="#A91151"
              />
            )}
          </div>
        </Link>
      </nav>
      <div>
        <div id="dropNav" className="dropDown w-full shadow-xl bg-beige z-10">
          
          <ul className="items-center justify-evenly flex">
            <li
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={handleMouseLeave}
              className={`relative z-20 ${
                hoveredItem === "home" ? "hovered" : ""
              }`}
            >
              <Link
                to={`/`}
                className="name text-xs md:text-base lg:text-lg"
              >
                Home
                <span className="underline"></span>
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("sell")}
              onMouseLeave={handleMouseLeave}
              className={`relative z-20 ${
                hoveredItem === "sell" ? "hovered" : ""
              }`}
            >
              <Link
                to={`/product-create`}
                className="name text-xs md:text-base lg:text-lg"
              >
                Sell
                <span className="underline"></span>
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
              className={`relative z-20 ${
                hoveredItem === "products" ? "hovered" : ""
              }`}
            >
              <Link
                to={`/shop-products`}
                className="name text-xs md:text-base lg:text-lg"
              >
                Products
                <span className="underline"></span>
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("inbox")}
              onMouseLeave={handleMouseLeave}
              className={`relative z-20 ${
                hoveredItem === "inbox" ? "hovered" : ""
              }`}
            >
              <Link
                to={`/shop-message`}
                className="name text-xs md:text-base lg:text-lg"
              >
                Inbox
                <span className="underline"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SellerHeader;
