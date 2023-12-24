import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../../Route/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
function SuggestedProducts({ data }) {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const d =
      allProducts &&
      allProducts.filter((i) => i.category[0].name === data.category[0].name);
    setProducts(d);
  }, [allProducts, data.category]);
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
    <div>
      {data ? (
        <div className="p-10">
          {" "}
          <h2 className="text-2xl sm:text-3xl font-bold p-10 ">
            You may also like
          </h2>
          <div>
            <Splide options={splideOptions}>
              {products &&
                products.map((i, index) => (
                  <SplideSlide key={index}>
                    <div className="w-fit sm:pl-10">
                      <ProductCard data={i} key={index} />
                    </div>
                  </SplideSlide>
                ))}
            </Splide>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SuggestedProducts;
