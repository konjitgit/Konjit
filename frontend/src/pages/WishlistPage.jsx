import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/actions/wishlist";
import { addToCart } from "../redux/actions/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import SingleItem from "../components/SingleItem";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import ProductCard from "../Route/ProductCard";
import { SplideSlide, Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
function WishlistPage() {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const dispatch = useDispatch();
  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
  };
  const suggestProducts = (products, wishlist) => {
    const uniqueCategories = Array.from(
      new Set(wishlist.map((item) => item.category[0].name))
    );
    const randomize = () => Math.random() - 0.5;
    const filteredProducts = products
      .filter((product) => uniqueCategories.includes(product.category[0].name))
      .sort(randomize);

    return filteredProducts.slice(0, 6);
  };

  useEffect(() => {
    const generateRandomSuggestions = () => {
      const suggestions = suggestProducts(allProducts, wishlist);
      setSuggestedProducts(suggestions);
    };

    generateRandomSuggestions();
  }, [wishlist, allProducts]);
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
      <Header />
      <section className="m-auto relative top-16">
        <h1 className="font-medium text-4xl text-center my-10 py-10 w-full ">
          WISH LIST
        </h1>
      </section>
      <div className="flex justify-between w-full mx-auto ">
        <div className="w-11/12 mx-auto md:mx-0  md:ml-10">
          <div className="bg-beige text-xl py-3 pl-3 ">Your Products</div>
          <div className="main ">
            {wishlist &&
              wishlist.map((i, index) => {
                return (
                  <SingleItem
                    key={index}
                    data={i}
                    addToCartHandler={addToCartHandler}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                  />
                );
              })}
          </div>
        </div>
        <div className="bg-beige  h-[900px] w-3/12 p-5 md:block hidden ">
          <p className="text-2xl mb-4">You may also like</p>
          <div className=" h-[800px] overflow-y-scroll">
            {suggestedProducts.map((product, index) => (
              <ProductCard data={product} />
            ))}
          </div>
        </div>
      </div>

      <hr className="h-0.5  mb-7 md:hidden" />
      <div className="bg-beige w-full h-[450px] p-5 md:hidden block">
        <p className="text-2xl">You may also like</p>

        <Splide options={splideOptions}>
          {suggestedProducts &&
            suggestedProducts.map((i, index) => (
              <SplideSlide key={index}>
                <div className="pl-10 ml-10">
                  <ProductCard data={i} key={index} />
                </div>
              </SplideSlide>
            ))}
        </Splide>
      </div>
      <Footer />
    </div>
  );
}

const SingleItem = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discount_price * value;
  console.log(data.qty);

  return (
    <div className="flex gap-8 items-center my-5 ">
      <div className="flex items-center gap-4  w-[235px] sm:w-4/12">
        <img
          src={data.images[0].url}
          alt="pictu"
          className="md:w-[176px] md:h-[256px] w-[103px] h-[151px] "
        />
        <div className="flex gap-1 flex-col pr-5">
          <p className="md:text-lg text-lg font-semibold">{data.name}</p>
          <p className="md:text-lg text-md ">{data.category[0].name}</p>
          <p>{data.rating}</p>
        </div>
      </div>

      <div className="flex justify-between items-center w-[225px] sm:justify-evenly  sm:w-8/12  ">
        <div className=" w-[115px] ">
          <p className="text-center text-base lg:text-lg">
            ETB {data.discountPrice}
          </p>
          <hr className="h-0.5 w-[65%] mx-auto lg:w-full bg-black my-2 " />
          <button
            className="font-medium w-full text-base md:text-lg lg:text-xl"
            onClick={() => removeFromWishlistHandler(data)}
          >
            Remove
          </button>
        </div>
        {/* <button
          className=" w-fit h-fit px-5 py-1 border-2 border-pink md:block hidden"
          onClick={() => addToCartHandler(data)}
        >
          ADD TO BAG
        </button> */}
        {/* <AiOutlineShoppingCart
          // size={25}
          onClick={() => addToCartHandler(data)}
          color="#444"
          title="Add to cart"
          className="md:hidden block text-2xl"
        /> */}
      </div>
    </div>
  );
};

export default WishlistPage;
