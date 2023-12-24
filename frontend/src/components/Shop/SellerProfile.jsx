import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import axios from "axios";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import Avatar from "react-avatar";
import ProductCard from "../../Route/ProductCard";
import { RiSearchLine } from "react-icons/ri";
import Footer from "../Footer/Footer1";
import Header from "../Layout/Header";
import { MdVerified } from "react-icons/md";

function SellerProfile({ isOwner }) {
  const [data, setData] = useState({});
  const { allProducts } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);

    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);
  const totalReviewsLength =
    allProducts &&
    allProducts.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    allProducts &&
    allProducts.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };
  const handleAllProductsClick = () => {
    setSelectedCategory("");
  };
  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => {
        const searchTerm = searchQuery.trim().toLowerCase();
        const matchedCategory = selectedCategory
          ? product.category.some(
              (category) => category.name === selectedCategory
            )
          : true;
        const matchedSearch =
          searchTerm === "" || product.name.toLowerCase().includes(searchTerm);
        return matchedCategory && matchedSearch;
      })
    : searchQuery
    ? allProducts.filter((product) => {
        const searchTerm = searchQuery.trim().toLowerCase();
        const matchedSearch =
          searchTerm === "" || product.name.toLowerCase().includes(searchTerm);
        return matchedSearch;
      })
    : allProducts;
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const categoryNamesSet = new Set();

  allProducts.forEach((product) => {
    product.category.forEach((category) => {
      categoryNamesSet.add(category.name);
    });
  });

  const categoryNames = Array.from(categoryNamesSet);

  /*pagination*/
  const productsPerPage = 32;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!filteredProducts) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className="py-3 flex sm:flex-row flex-col h-fit gap-20  relative top-[62px] ">
            <div className="relative shadow-xl sm:hidden md:block w-[80%]  sm:w-[20%]  text-center mx-auto sm:mx-0 sm:text-left bg-beige border-2 rounded-lg   sm:p-10 sm:m-5 h-fit fe-car">
              {data.verify && (
                <p
                  className={`absolute top-2 right-2 text-yellow-800 px-2 py-1 rounded font-semibold bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500`}
                >
                  Verified Seller
                </p>
              )}
              <div className="w-fit py-5 mx-auto">
                <div className="w-full flex item-center justify-center">
                  {/* <img
                      src={`${data.avatar?.url}`}
                      alt=""
                      className="w-[150px] h-[150px] object-cover rounded-full"
                    /> */}
                  <Avatar
                    color="#A91151"
                    name={data.name}
                    className="w-[150px] h-[150px] object-cover rounded-full"
                  />
                </div>
                <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
                <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                  {data.description}
                </p>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Address</h5>
                <h4 className="text-[#000000a6]">{data.address}</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Phone Number</h5>
                <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Total Products</h5>
                <h4 className="text-[#000000a6]">
                  {allProducts && allProducts.length}
                </h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Shop Ratings</h5>
                <h4 className="text-[#000000b0]">{averageRating}/5</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Joined On</h5>
                <h4 className="text-[#000000b0]">
                  {data?.createdAt?.slice(0, 10)}
                </h4>
              </div>
            </div>
            <div className=" w-full md:w-[70%] mt-20 sm:mt-0">
              <div className="mt-3 gap-2 flex justify-center items-center sm:justify-between flex-col sm:flex-row ">
                <div className="w-[70%] sm:w-[40%] bg-beige flex justify-evenly items-center p-2 m-5 rounded-xl text-sm sm:text-lg">
                  <p
                    onClick={toggleDropdown}
                    className="cursor-pointer relative"
                  >
                    Categories{" "}
                    {showDropdown && (
                      <div className="bg-beige w-fit flex flex-col gap-3 p-2 m-5 rounded-md text-base sm:text-lg absolute top-3 left-[-25px] sm:left-[-20px] z-10">
                        {categoryNames.map((name, index) => (
                          <p
                            key={index}
                            onClick={() => handleCategoryClick(name)}
                          >
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                  </p>
                  <p
                    onClick={handleAllProductsClick}
                    className="cursor-pointer"
                  >
                    AllProducts
                  </p>
                  <p
                    onClick={handleInfoClick}
                    className="cursor-pointer hidden sm:block md:hidden"
                  >
                    Info
                  </p>
                </div>
                <div className="relative flex items-center justify-center w-[90%] sm:w-fit  sm:bg-white bg-beige">
                  <input
                    type="text"
                    className="border-2 w-[80%] sm:w-fit focus:border-pink border-gray-300 sm:border-gray-800 m-5 rounded-md text-sm sm:text-lg p-1 "
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <RiSearchLine className="absolute top-[28%] sm:top-[40%]  text-white rounded-r-md sm:rounded-none bg-pink sm:bg-white sm:text-gray-600 right-9 sm:right-8 cursor-pointer  text-[30px] sm:text-[20px]" />
                </div>
              </div>
              <div className=" mx-auto  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-10 place-items-center gap-9 ">
                {showInfo && (
                  <div className="col-span-3 shadow-xl w-[80%]  text-center mx-auto  bg-beige border-2 rounded-lg sm:p-10 sm:m-5 h-fit fe-car">
                    <div className="w-fit py-5 mx-auto">
                      <div className="w-full flex item-center justify-center">
                        {/* <img
                  src={`${data.avatar?.url}`}
                  alt=""
                  className="w-[150px] h-[150px] object-cover rounded-full"
                /> */}
                        <Avatar
                          name={data.name}
                          className="w-[150px] h-[150px] object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-center py-2 text-[20px]">
                        {data.name}
                      </h3>
                      <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                        {data.description}
                      </p>
                      <div className="p-3">
                        <h5 className="font-[600]">Address</h5>
                        <h4 className="text-[#000000a6]">{data.address}</h4>
                      </div>
                      <div className="p-3">
                        <h5 className="font-[600]">Phone Number</h5>
                        <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
                      </div>
                      <div className="p-3">
                        <h5 className="font-[600]">Total Products</h5>
                        <h4 className="text-[#000000a6]">
                          {allProducts && allProducts.length}
                        </h4>
                      </div>
                      <div className="p-3">
                        <h5 className="font-[600]">Shop Ratings</h5>
                        <h4 className="text-[#000000b0]">{averageRating}/5</h4>
                      </div>
                      <div className="p-3">
                        <h5 className="font-[600]">Joined On</h5>
                        <h4 className="text-[#000000b0]">
                          {data?.createdAt?.slice(0, 10)}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

                {currentProducts.map((product, index) => (
                  <div className="w-fit" key={index}>
                    <ProductCard data={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / productsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-2 rounded cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-pink text-white"
                      : "bg-beige text-gray-700"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default SellerProfile;
