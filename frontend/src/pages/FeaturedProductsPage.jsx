import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard";

function FeaturedProductsPage() {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const sortedProducts = [...allProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
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
  const productsPerPage = 16;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div>
      <Header />
      <div className="relative top-16 pb-12">
        <div className="">
          <h3
            class="text-center text-3xl font-bold py-5 px-4 sm:py-6 md:flex justify-
            between items-center text-shadow-lg relative w-fit pl-10 mt-10"
          >
            Featured Products{" "}
            <p className="absolute text-4xl right-[-25px] bottom-2 opacity-10 text-pink font-light font-cursive -z-10">
              Featured Products
            </p>
          </h3>
          <Splide options={splideOptions}>
            {allProducts.map((product, index) => (
              <SplideSlide key={index}>
                <div className="pl-10 bg-beige fe-car">
                  <ProductCard data={product} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div>
          <h3
            class="text-center text-3xl font-bold py-5 px-4 sm:py-6 md:flex justify-
            between items-center text-shadow-lg relative w-fit pl-10 mt-10"
          >
            Latest Products
            <p className="absolute text-4xl right-[-25px] bottom-2 opacity-10 text-pink font-light font-cursive -z-10">
              Latest Products
            </p>
          </h3>
          <div className="cards w-[90%] mx-auto bg-beige  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-10 place-items-center sm:gap-x-10 gap-20 mt-10 ">
            {currentProducts.map((product, index) => (
              <div className="w-fit" key={index}>
                <ProductCard data={product} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber + 1)}
                className={`mx-1 px-3 py-2 rounded  ${
                  currentPage === pageNumber + 1
                    ? "active bg-pink text-white"
                    : "bg-beige text-gray-700"
                }`}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FeaturedProductsPage;
