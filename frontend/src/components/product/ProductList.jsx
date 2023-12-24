import React from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import ProductCard from "../../Route/ProductCard";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
function ProductList() {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const sortedProducts = [...allProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
  return (
    <div className={`  my-14 bg-white pt-3`}>
      <p className="text-pink  text-center uppercase my-3">
        A BRUSH OF PERFECTION
      </p>
      <p className="text-black text-center font-bold text-2xl leading-10 md:text-3xl uppercase my-3">
        ADD A FLAVOR TO BEING YOU
      </p>
      <p className="text-[#373636] text-center text-base md:text-lg uppercase my-3">
        Lorem ipsum dolor sit amet, constecueter
      </p>
      <div className="cards w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-10 place-items-center sm:gap-x-10 gap-20 mt-10 ">
        {sortedProducts &&
          sortedProducts.slice(0, 12).map((product, index) => {
            return (
              <div className="w-fit" key={index}>
                <ProductCard data={product} />
              </div>
            );
          })}
      </div>
      <Link to="/products-page">
        <div className="flex items-center gap-3 mx-auto w-fit">
          <IoIosArrowDropdown className="text-3xl" /> <p>Shop more</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductList;
