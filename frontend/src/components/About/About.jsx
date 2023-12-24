import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const About = () => {
  return (
    <div className="relative top-16 bg-beige bg-pattern bg-center bg-no-repeat bg-cover mix-blend-color-burn">
      {/* first part of the page */}

      <div className="mx-auto  w-fit flex flex-col gap-10  md:flex-row py-20  ">
        <div className="md:hidden block">
          <div className=" text-pink text-2xl font-black text-center mb-5">
            About us
          </div>

          <div className="text-center mb-5 max-w-[390px] ">
            <span className="text-black text-3xl font-black">
              Helping you feel{" "}
            </span>
            <span className="text-pink text-3xl font-black">confident </span>
            <span className="text-black text-3xl font-black">and</span>
            <span className="text-pink text-3xl font-black"> </span>
            <span className="text-black text-3xl font-black">beautiful</span>
          </div>
        </div>
        <div className="grid  grid-rows-1 ">
          <div className=" col-start-2 col-span-2 row-start-1 row-span-2">
            <img
              className="max-w-[400px] h-[400px]"
              src="/images/about-img1.jpg"
            />
          </div>
          <div className="col-start-1 col-span-2 row-start-2 row-span-2">
            <img
              className=" max-w-[278px] h-[350px]  "
              src="/images/about-img2.jpg"
            />
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <div className="hidden md:block ">
            <div className=" text-pink text-2xl font-black text-center mb-5">
              About us
            </div>

            <div className=" text-center mb-5 max-w-[500px] ">
              <span className="text-black text-3xl font-black">
                Helping you feel{" "}
              </span>
              <span className="text-pink text-3xl font-black">confident </span>
              <span className="text-black text-3xl font-black">and</span>
              <span className="text-pink text-3xl font-black"> </span>
              <span className="text-black text-3xl font-black">beautiful</span>
            </div>
          </div>

          <div className=" max-w-[500px]   text-black text-lg md:text-xl font-normal leading-9 ">
            We started our ecommerce marketplace in 2018 with a simple idea: to
            make beauty shopping easier, faster, and more fun. We curate the
            best products from around the world, offer free shipping and
            returns, and provide personalized recommendations based on your
            preferences and needs. Our goal is to help you find your perfect
            beauty match, whether it's a lipstick, a moisturizer, or a
            fragrance.
          </div>

          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-7 bg-pink`}>
              <span className="text-[#fff]  text-[18px]">Shop Now</span>
            </div>
          </Link>
        </div>
      </div>

      {/* second part of the page */}

      <div className="mx-auto  w-fit flex flex-col gap-10  md:flex-row py-20 ">
        <div className="p-4 ">
          <div className="">
            <div className=" text-pink text-2xl font-black text-center mb-5">
              Features of our product
            </div>

            <div className=" text-center mb-5 max-w-[500px] ">
              <span className="text-black text-3xl font-black">
                Lorem ipsum dolor sit amet consecteturl
              </span>
            </div>
          </div>
          <div className="md:hidden block py-5">
            <div className=" grid  grid-rows-1 ">
              <div className="col-start-1 col-span-2 row-start-1 row-span-2">
                <img
                  className="max-w-[400px]  h-[400px]"
                  src="/images/about-person1.jpg"
                />
              </div>
              <div className="col-start-2 col-span-2 row-start-2 row-span-2">
                <img
                  className=" max-w-[278px] h-[300px]  "
                  src="/images/about-person2.jpg"
                />
              </div>
            </div>
          </div>
          <div className=" max-w-[450px]   text-black text-lg md:text-xl font-normal leading-9 ">
            <ul className="list-disc">
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </li>

              <li>
                {" "}
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </li>
              <li>
                {" "}
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi
              </li>

              <li>
                {" "}
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </li>
            </ul>
          </div>

          <Link
            to="/products"
            className="inline-block flex flex-col md:inline-flex"
          >
            <div className={`${styles.button} mt-7 bg-pink`}>
              <span className="text-[#fff]  text-[18px]">Shop Now</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:block ">
          <div className=" grid  grid-rows-1 ">
            <div className="col-start-1 col-span-2 row-start-1 row-span-2">
              <img
                className="max-w-[400px]  h-[400px]"
                src="/images/about-person1.jpg"
              />
            </div>
            <div className="col-start-2 col-span-2 row-start-2 row-span-2">
              <img
                className=" max-w-[278px] h-[300px]  "
                src="/images/about-person2.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Thrid part of the page */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 py-10 mx-auto w-fit pb-20">
        <div className="vision  ">
          <img className="mx-auto " src="/images/vision.png" />
          <div className="Price flex flex-col">
            <div className=" w-[120px] border-2 border-pink mx-auto" />
            <div className="Vision text-center text-black text-xl font-extrabold leading-loose">
              Vision
            </div>
            <div className="text-center text-black  font-normal leading-7">
              To be the leading online retailer <br />
              for Cosmetic products in
              <br /> Ethiopia
            </div>
          </div>
        </div>

        <div className="mission md:col-start-1 ">
          <img className="mx-auto " src="/images/mission.png" />
          <div className=" flex flex-col">
            <div className=" w-[120px] border-2 border-pink mx-auto" />
            <div className="text-center text-black text-xl font-extrabold leading-loose">
              Mission
            </div>
            <div className="text-center text-black  font-normal leading-7">
              We strive to offer our customers the best <br />
              possible shopping experience, with a wide <br />
              selection of products, competitive prices, and <br />
              excellent rewards
            </div>
          </div>
        </div>

        <div className="values md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-2">
          <img className=" mx-auto" src="/images/values.png" />
          <div className="mt-3 flex flex-col">
            <div className=" w-[120px] border-2 border-pink mx-auto" />
            <div className="text-center text-black text-xl font-extrabold leading-loose">
              Mission
            </div>
            <div className=" text-black  font-normal leading-7 max-w-[350px]">
              <ul className="list-disc">
                <li>Customer satisfaction is our top priority.</li>
                <li>
                  We are committed to providing our customers with the best
                  possible products and services.
                </li>
                <li>
                  We value honesty, integrity, and transparency in all of our
                  dealings.
                </li>
                <li>
                  We are a team-oriented company that is passionate about our
                  work.
                </li>
                <li>We are committed to giving back to the community.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
