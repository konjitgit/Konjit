import { Link, useNavigate } from "react-router-dom";
import { categories } from "./categories";
import { useEffect, useRef, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import Cart from "../cart/cart";
import Avatar from "react-avatar";
const Category = ({ name, items, images, navigate }) => {
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const useMouseEvents = () => {
    const handleMouseEnter = () => {
      setHover(true);
    };

    const handleMouseLeave = () => {
      setHover(false);
    };
    const toggleVisibility = () => {
      setVisible(!visible);
    };
    return { handleMouseEnter, handleMouseLeave, toggleVisibility };
  };
  const { handleMouseEnter, handleMouseLeave, toggleVisibility } =
    useMouseEvents();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`, { replace: true });
    setSelectedCategory(category);
  };
  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setVisible(!visible)}
      className="relative z-20 "
    >
      <Link
        to={`/products?category=${name}`}
        className={`${
          hover
            ? selectedCategory === name
              ? "hovered active"
              : "hovered"
            : selectedCategory === name
            ? "active"
            : ""
        } name sm:text-xs  md:text-base lg:text-lg`}
        onMouseEnter={toggleVisibility}
        onMouseLeave={toggleVisibility}
        onClick={handleCategoryClick}
      >
        {name}
        <span className="underline"></span>
      </Link>
      <div
        className={`${
          visible ? "visible" : "hidden"
        }flex absolute z-20 top-full left-0 right-0`}
      >
        {items.map((item) => (
          <ul key={item.title}>
            <li className="pb-2">
              <Link
                to={`/products?category=${name}&item=${item.title}`}
                className="text-center sm:text-sm md:text-base lg:text-lg font-bold cursor-pointer "
              >
                {item.title}
              </Link>
            </li>
            {item.subItems.map((subItem) => (
              <li key={subItem}>
                <Link
                  to={`/products?category=${name}&item=${item.title}&subItem=${subItem}`}
                  className="sm:text-xs md:text-sm lg:text-base"
                >
                  {subItem}
                </Link>
              </li>
            ))}
          </ul>
        ))}

        <ul className=" flex-col gap-6 hidden md:flex">
          {images.map((image) => (
            <li>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: 309, height: 160 }}
                className="opacity-60 rounded-2xl object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const Dropdown = ({ props }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [subItemOpen, setSubItemOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [subItemData, setSubItemData] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
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
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setCategoryOpen(false);
    setItemOpen(false);
    setSubItemOpen(false);
    setSelectedCategory(null);
    setSelectedItem(null);
    setCategoryName(null);
    setItemName(null);
    setSubItemData(null);
  };

  const handleCategoryClick = (category) => {
    setCategoryOpen(true);
    setItemOpen(false);
    setSubItemOpen(false);
    setSelectedCategory(category);
    setSelectedItem(null);
    setCategoryName(category.name);
    setItemName(null);
    setSubItemData(null);
  };

  const handleItemClick = (item) => {
    setItemOpen(true);
    setSubItemOpen(false);
    setSelectedItem(item);
    setItemName(item.title);
    setSubItemData(null);
  };
  const handleSubItemClick = (subItem) => {
    setSubItemData(subItem);
    // setSubItemOpen(true);
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="shadow-md sm:relative top-0 left-0 right-0 sm:top-20 z-20 fixed">
      <div id="dropNav" className="dropDown bg-white sm:bg-beige p-3 z-10 s">
        <div className="sm:hidden flex justify-between ">
          <div className="flex items-center gap-4">
            <button className=" focus:outline-none" onClick={toggleMenu}>
              <CiMenuBurger className="cursor-pointer  text-[25px] " />
            </button>
            <div className="" ref={searchRef}>
              <AiOutlineSearch
                className="text-gray-700 cursor-pointer text-[25px]"
                onClick={handleSearchClick}
              />
              {isSearchOpen && (
                <div className="absolute top-0 right-0 left-0 bg-white p-4 shadow-md z-20">
                  <input
                    type="text"
                    placeholder="Search Product..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="h-[40px] w-full px-2 border-b-2 pl-10 border-black text-[16px] "
                  />
                  {searchData && searchData.length !== 0 ? (
                    <div className="max-h-[60vh] overflow-y-scroll">
                      {searchData.map((i, index) => (
                        <Link
                          to={`/product/${i.name}`}
                          onClick={() =>
                            (window.location.href = `/product/${i.name}`)
                          }
                          key={index}
                        >
                          <div className="flex  py-3 gap-4 items-center">
                            <img
                              src={`${i.images[0].url}`}
                              alt=""
                              className="w-[50px] h-[60px] mr-[10px] ml-4"
                            />
                            <h1 className="text-lg">{i.name}</h1>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <Link to="/">
            <p className=" text-3xl font-bold ">Konjit</p>{" "}
          </Link>
          <div className="flex gap-4 items-center">
            {/* <div className="relative ">
              <AiOutlineShoppingCart
                onClick={() => setOpenCart(true)}
                color="#444"
                title="Add to cart"
                className="cursor-pointer  text-[25px] "
              />
              <span className="border-red-100 w-3 h-3 text-[9px]  text-center bg-pink text-white rounded-full absolute top-0 right-0">
                {cart && cart.length}
              </span>
            </div> */}
            <div className=" relative">
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
                  <RxAvatar
                    size={30}
                    color="#444"
                    title="Add to cart"
                    className="cursor-pointer text-[25px]"
                  />
                )}
              </Link>
            </div>
            <div className="relative ">
              <Link to={`/wishlist`}>
                <AiOutlineHeart
                  color="#444"
                  title="Add to cart"
                  className="cursor-pointer  text-[25px] "
                />
              </Link>
              <span className="border-red-100 w-3 h-3 text-[9px] text-center bg-pink text-white rounded-full absolute top-0 right-0">
                {wishlist && wishlist.length}
              </span>
            </div>
          </div>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>
        <ul className="items-center 620px:justify-evenly hidden sm:flex ">
          {categories.map((category) => (
            <Category
              key={category.name}
              name={category.name}
              items={category.items}
              images={category.images}
              navigate={navigate}
            />
          ))}
        </ul>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50  ">
          <div className="menu fixed top-0 left-0 h-screen w-3/4 bg-beige z-20 transition-all transform duration-300 ease-in-out">
            <div className="flex absolute top-2 right-2">
              <button className=" focus:outline-none" onClick={toggleMenu}>
                <ion-icon name="close-outline" size="large"></ion-icon>
              </button>
            </div>
            {categoryOpen && (
              <button
                className="absolute top-2 left-2 focus:outline-none"
                onClick={() => {
                  setCategoryOpen(false);
                }}
              >
                <ion-icon name="chevron-back-outline" size="large"></ion-icon>
              </button>
            )}
            {itemOpen && (
              <button
                className="absolute top-2 left-2 focus:outline-none"
                onClick={() => {
                  setItemOpen(false);
                }}
              >
                <ion-icon name="chevron-back-outline" size="large"></ion-icon>
              </button>
            )}
            {subItemOpen && (
              <button
                className="absolute top-2 left-2 focus:outline-none"
                onClick={() => {
                  setSubItemOpen(false);
                }}
              >
                <ion-icon name="chevron-back-outline" size="large"></ion-icon>
              </button>
            )}

            {!categoryOpen && (
              <ul className="flex flex-col gap-9 p-4  justify-center h-full">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <Link
                      to={`/products?category=${category.name}`}
                      className="text-xl cursor-pointer"
                    >
                      <p className="flex justify-between ">
                        {category.name}{" "}
                        <span className="font-bold pr-10">&gt;</span>{" "}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {categoryOpen && !itemOpen && (
              <ul className="flex flex-col gap-10 p-4 justify-start mt-10 h-full ">
                <h1 className="text-2xl font-bold text-center pt-10 mb-5">
                  {selectedCategory.name}
                </h1>
                {selectedCategory.items.map((item) => (
                  <li key={item.title} onClick={() => handleItemClick(item)}>
                    <Link
                      to={`/products?category=${selectedCategory.name}&item=${item.title}`}
                      className="text-xl cursor-pointer"
                    >
                      <p className="flex justify-between ">
                        {item.title}{" "}
                        <span className="font-bold pr-10">&gt;</span>{" "}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {itemOpen && !subItemOpen && (
              <ul className="flex flex-col gap-7  justify-start mt-10 h-full p-4 overflow-y-scroll">
                <h1 className="text-2xl font-bold text-center  pt-10 mb-5">
                  {selectedItem.title}
                </h1>
                {selectedItem.subItems.map((subItem) => (
                  <li key={subItem} onClick={() => handleSubItemClick(subItem)}>
                    <Link
                      to={`/products?category=${selectedCategory.name}&item=${selectedItem.title}&subItem=${subItem}`}
                      className="text-xl  cursor-pointer"
                    >
                      {subItem}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
