import React, { useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ProductCard from "../../Route/ProductCard";

function FeaturedProduct() {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [selectedOption, setSelectedOption] = useState("New Arrivals");

  const sortProducts = (option) => {
    let sortedArray = [...allProducts];
    switch (option) {
      case "Bestselling":
        sortedArray.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        break;
      case "New Arrivals":
        sortedArray.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        });
        break;
      case "Highest Rated":
        sortedArray.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedArray = [...allProducts];
        break;
    }
    return sortedArray;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const sortedProducts = sortProducts(selectedOption);

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
  return (
    <div className={` ${styles.section}  my-5 `}>
      <div>
        <p className="text-pink font-semibold text-center md:text-left">
          Featured Products
        </p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row justify-between">
        <div className="font-[900] text-3xl my-3 md:mx-0 text-center">
          <p>Beauty Essentials</p>
        </div>
        <div className="flex gap-4 flex-row md:my-3 md:mx-0 font-semibold text-[#7A7878]">
          <p
            className={`cursor-pointer hover:underline hover:text-pink ${
              selectedOption === "Bestselling" ? " text-pink" : ""
            }`}
            onClick={() => handleOptionChange("Bestselling")}
          >
            Bestsellers
          </p>{" "}
          <p
            className={`cursor-pointer hover:underline hover:text-pink${
              selectedOption === "New Arrivals" ? " text-pink" : ""
            }`}
            onClick={() => handleOptionChange("New Arrivals")}
          >
            New Arrivals
          </p>
          <p
            className={`cursor-pointer hover:underline hover:text-pink ${
              selectedOption === "Highest Rated" ? " text-pink" : ""
            }`}
            onClick={() => handleOptionChange("Highest Rated")}
          >
            Highest Rated
          </p>
        </div>
      </div>
      <Splide options={splideOptions}>
        {sortedProducts.map((product, index) => (
          <SplideSlide key={index}>
            <div className="pl-10 ml-10">
              <ProductCard data={product} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default FeaturedProduct;
