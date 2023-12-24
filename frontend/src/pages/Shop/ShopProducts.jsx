import React, { useEffect, useState } from "react";
import SellerHeader from "../../components/Layout/SellerHeader";
import Footer from "../../components/Footer/Footer1";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import SellerProductCard from "../../Route/SellerProductCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Loader from "../../components/Layout/Loader";
function ShopProducts() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("products");
  const productsPerPage = 12;
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts =
    selectedTab === "products"
      ? allProducts.slice(indexOfFirstProduct, indexOfLastProduct)
      : [];
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };
  const splideOptions = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    autoplay: true,
    interval: 3000,
    breakpoints: {
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };
  if (!allProducts) {
    return <div><Loader /></div>;
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SellerHeader />
          <div>
            <p className="p-10 text-3xl font-semibold">Recent Products</p>
            <Splide options={splideOptions}>
              {allProducts.map((product, index) => (
                <SplideSlide key={index}>
                  <div className="w-fit">
                    <SellerProductCard data={product} />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <div className="flex items-center  bg-beige w-fit mt-10 ml-20 rounded shadow-lg">
            <p
              className={`hover:bg-pink hover:text-white py-2 px-6 cursor-pointer rounded transition duration-200 ease-in-out ${
                selectedTab === "products" ? "bg-pink text-white" : ""
              }`}
              onClick={() => handleTabClick("products")}
            >
              All Products
            </p>
            <hr className="w-[1px] h-5 bg-black p-0 m-0" />
            <p
              className={`hover:bg-pink hover:text-white py-2 px-6 cursor-pointer rounded transition duration-200 ease-in-out ${
                selectedTab === "orders" ? "bg-pink text-white" : ""
              }`}
              onClick={() => handleTabClick("orders")}
            >
              All Orders
            </p>
          </div>
          <div className="cards bg-beige grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-10 place-items-center gap-9 mt-10">
            {currentProducts &&
              currentProducts.map((product, index) => {
                return (
                  <div className="w-fit" key={index}>
                    <SellerProductCard data={product} />
                  </div>
                );
              })}
          </div>
          <div className="flex justify-center mt-5">
            {Array.from(
              { length: Math.ceil(allProducts.length / productsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-2 rounded ${
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
        </>
      )}
    </div>
  );
}

export default ShopProducts;
