import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { productData } from "../static/data";
import ProductCard from "../Route/ProductCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import ProductFilter from "../components/Filter/ProductFilter.js";
import { categories } from "../components/Dropdown/categories";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
function ProductPage() {
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryData = searchParams.get("category");
  const itemData = searchParams.get("item");
  const subItemData = searchParams.get("subItem");

  const categoryName = categories.find(
    (category) => category.slug.replace(/-/g, " ") === categoryData
  )?.name;
  const itemName = itemData;
  const subItemName = subItemData;
  const formattedString = (
    <>
      <Link to={`/products?category=${categoryData}`}>{categoryData} / </Link>
      <Link to={`/products?category=${categoryData}&item=${itemData}`}>
        {itemData} /
      </Link>
      <Link
        to={`/products?category=${categoryData}&item=${itemData}&subItem=${subItemData}`}
      >
        {subItemData}
      </Link>
    </>
  );
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const handleFilterChange = useCallback((filteredData) => {
    setFilteredData(filteredData);
  }, []);

  useEffect(() => {
    const filteredData = allProducts.filter(
      (product) =>
        product.category[0].name === categoryName &&
        (!itemName ||
          product.category[0].items.some(
            (item) =>
              item.title === itemName &&
              (!subItemName || item.subItems.includes(subItemName))
          ))
    );

    setData(filteredData);
    setFilteredData(filteredData);
    console.log(filteredData.length);
  }, [categoryName, itemName, subItemName, allProducts]);

  const title = (categoryData, itemData, subItemData) => {
    if (subItemData) {
      return <h1>{subItemData}</h1>;
    } else if (itemData) {
      return <h1>{itemData}</h1>;
    } else if (categoryData) {
      return <h1>{categoryData}</h1>;
    }
  };
  const productsPerPage = 32;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  if (!filteredData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />

      <div className="relative top-20">
        <div className="text-xl w-fit m-10 ">
          <p>
            <Link to="/">Home</Link>/ {formattedString}
          </p>
        </div>

        <div>
          <div className="sm:text-center">
            <h1 className="px-3 mx-7 sm:mx-0 font-semibold text-3xl">
              {title(categoryData, itemData, subItemData)}
            </h1>
            <p className="p-3 mx-7 sm:mx-0 text-gray-400">
              {filteredData.length} Results
            </p>
          </div>
          <div className="pt-4 ml-4">
            <ProductFilter
              filterData={data}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="cards bg-beige  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-10 place-items-center sm:gap-x-10 gap-20 mt-10 ">
          {filteredData &&
            filteredData.map((product, index) => {
              return (
                <div className="w-fit" key={index}>
                  <ProductCard data={product} />
                </div>
              );
            })}
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
        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;
