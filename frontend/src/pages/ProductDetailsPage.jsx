import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import ProductDetails from "../components/Products/ProductDetails";
import { Link, useParams } from "react-router-dom";
import SuggestedProducts from "../components/Products/SuggestedProducts.jsx";
import ReviewCard from "../Route/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import Loader from "../components/Layout/Loader";
function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data = allProducts.find((i) => i.name === productName);
    setData(data);
  }, [allProducts, productName]);

  if (!data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      <div className="flex">
        {data.reviews && data.reviews.length > 0 ? (
          <div className="container p-5 m-5 w-3/4">
            <h1 className="py-8 px-7 text-4xl font-bold">Customer Reviews</h1>
            <p>
              {data &&
                data.reviews &&
                data.reviews.map((review, index) => {
                  return <ReviewCard review={review} key={index} />;
                })}
            </p>
          </div>
        ) : (
          <div className="border-2 w-[80%] my-20 mx-auto bg-beige fe-car p-20 flex flex-col items-center justify-center">
            <p className="text-2xl sm:text-3xl font-semibold">
              No reviews yet.
            </p>
            <img src="/images/reviews.svg" alt="" className="w-[300px]" />
          </div>
        )}

        {/* <div className="bg-beige flex flex-col items-center justify-center h-fit mt-36  ">
          <p className="">Write a review</p>
          {isAuthenticated ? (
            <form className="flex flex-col" onClick={reviewHandler}>
              <textarea
                name="reviews"
                id="reviews"
                cols="30"
                rows="10"
                value={review}
                onChange={(event) => setReview(event.target.value)}
              ></textarea>

              <input
                type="submit"
                value="Submit"
                className="bg-pink rounded-md "
              />
            </form>
          ) : (
            <Link to="/login">
              <input
                type="submit"
                value="Login"
                className="bg-pink rounded-md "
              />
            </Link>
          )}
        </div> */}
      </div>

      <div className="h-fit bg-beige mb-5 w-full suggestions">
        {data && <SuggestedProducts data={data} />}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
