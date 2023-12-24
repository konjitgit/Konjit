import React, { useEffect, useRef, useState } from "react";
import Cart from "../cart/cart";
import { useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { BsShopWindow } from "react-icons/bs";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
const Nav = () => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const timeoutRef = useRef(null);
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchData(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleMouseEnter = () => {
    setOpenDrawer(true);
    clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDrawer(false);
    }, 1000);
  };

  return (
    <nav className=" fixed w-full z-30 hidden sm:flex justify-between px-10 py-5 items-center bg-white">
      <Link to="/" className="flex">
        <img
          src="/images/Konjit_Logo_Transparent_2.png"
          alt=""
          className="w-[95px] h-[50px]"
        />
      </Link>
      <div
        ref={searchRef}
        className="w-[35%] sm:w-[40%] md:w-[45%] lg:w-[50%] relative hidden sm:block"
      >
        <AiOutlineSearch
          onClick={handleSearchClick}
          className="absolute left-2 top-1.5 cursor-pointer text-[20px] md:text-[25px] lg:text-[30px]"
        />
        <input
          type="text"
          placeholder="Search Product..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="h-[40px] w-full px-2 border-b-2  pl-10 border-black text-[12px] sm:text-[13px] md:text-[15px] lg:text-[18px]"
        />

        {searchData && searchData.length !== 0 ? (
          <div className="absolute w-full max-h-[50vh] overflow-y-scroll bg-beige shadow-sm-2 z-[9] p-4 flex flex-col gap-2  ">
            {searchData &&
              searchData.map((i, index) => {
                return (
                  <Link
                    to={`/product/${i.name}`}
                    onClick={() =>
                      (window.location.href = `/product/${i.name}`)
                    }
                  >
                    <div className="w-full flex items-start-py-3 gap-4 items-center">
                      <img
                        src={`${i.images[0].url}`}
                        alt=""
                        className="w-[50px] h-[60px] mr-[10px] ml-4"
                      />
                      <h1 className="text-lg">{i.name}</h1>
                    </div>
                  </Link>
                );
              })}
          </div>
        ) : null}
      </div>
      <div className="flex gap-4 md:gap-6 items-center md:w-[10%]">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={isAuthenticated ? "/user" : "/login"}>
            {isAuthenticated ? (
              user?.avatar?.url ? (
                <img
                  src={`${user?.avatar?.url}`}
                  className="w-[35px] h-[35px] rounded-full"
                  alt=""
                />
              ) : (
                <Avatar
                  name={user.name}
                  size="40"
                  round={true}
                  color="#A91151"
                />
              )
            ) : (
              <RxAvatar size={30} color="#444" className="" />
            )}
          </Link>
          {!isAuthenticated && openDrawer && (
            <div className="absolute p-4 py-6 top-[45px] left-[50%] transform -translate-x-1/2 bg-white w-80 h-30 shadow-lg shadow-black  rounded-md flex flex-col items-center justify-evenly ">
              <div className="bg-pink rounded-3xl w-[90%] p-1 text-white text-base text-center mx-auto shadow-md shadow-pink">
                <Link to="/login"> Log in</Link>
              </div>
              <div className="flex items-center justify-center my-2 w-[90%]">
                <hr className="border-t border-solid border-gray-400 w-2/4" />
                <p className="mx-2">or</p>
                <hr className="border-t border-solid border-gray-400 w-2/4" />
              </div>

              <div className=" rounded-3xl w-[90%] p-1  text-base text-center mx-auto border-brown border-2 shadow-brown shadow-sm relative">
                <Link to="/sign-up"> Sign up</Link>
                <div className="absolute top-[-106px] left-1/2 transform -translate-x-1/2 bg-white w-4 h-4 rotate-45   border-t-[1px] border-l-[1px]"></div>
              </div>
            </div>
          )}
        </div>
        <div className=" relative">
          <div>
            <Link to={`/wishlist`}>
              <AiOutlineHeart
                color="#444"
                title="Add to cart"
                className="cursor-pointer "
                size={30}
              />
            </Link>
            <span className="border-red-100 w-4 h-4 text-[12px] text-center bg-pink text-white rounded-full absolute top-0 right-0">
              {wishlist && wishlist.length}
            </span>
          </div>
        </div>
        {/* <div className=" relative"> */}
        {/* <AiOutlineShoppingCart
            onClick={() => setOpenCart(true)}
            color="#444"
            title="Add to cart"
            className="cursor-pointer text-[20px] md:text-[25px] lg:text-[30px] "
          />
          <span className="border-red-100 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[6px] md:text-[9px] lg:text-[12px] text-center bg-pink text-white rounded-full absolute top-0 right-0">
            {cart && cart.length}
          </span>
        </div> */}

        <Link to={isSeller ? "/shop-products" : "/shop-login"}>
          {isSeller ? (
            <AiOutlineShop
              size={30}
              color="#444"
              title="Add to cart"
              className=""
            />
          ) : (
            <></>
          )}
        </Link>
      </div>
      {/* {openCart ? <Cart setOpenCart={setOpenCart} /> : null} */}
    </nav>
  );
};

export default Nav;
