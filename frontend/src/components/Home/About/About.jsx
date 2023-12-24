import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const About = () => {
  return (
    <div>
      {/* second part of the about page */}

      <div
        className={` Info  bg-gradient-to-b from-orange-50 via-rose-100 to-rose-100  py-4 `}
      >
        {/* <div className="Rectangle2 w-96 h-96 bg-pattern bg-gradient-to-br from-orange-50 via-rose-100 to-rose-100 " /> */}
        <div className="OpenTxt pt-8 ">
          <div className="WhyWeAreBetter text-center text-black text-2xl md:text-3xl font-black leading-10 pb-3">
            Why we are better{" "}
          </div>
          <div className="Products  text-center text-black text-base font-extrabold leading-relaxed">
            Beauty is in the eye of the beholder, But with our cosmetics, you
            can make it bolder. <br /> Create the look you've always wanted,
            With our wide selection of products
          </div>
        </div>

        <div className="flex flex-col md:flex-row  items-center my-10 justify-evenly ">
          <div className="Price mb-5 ">
            <img className="1281 w-24 h-20 mx-auto" src="/images/price.png" />
            <div
              className="Price 
     text-center text-black text-2xl font-extrabold leading-10"
            >
              Price
            </div>
            <div
              className=" 
     text-center text-black text-lg font-normal leading-relaxed"
            >
              Our prices are competitive, and we
              <br /> offer regular discounts and
              <br /> promotions.
            </div>
          </div>

          <div
            className="Variety mb-5 md:mb-0
  "
          >
            <img
              className="1281 w-24 h-20 mx-auto "
              src="/images/variety.png"
            />
            <div
              className="Variety 
      text-center text-black text-2xl font-extrabold leading-10"
            >
              Variety
            </div>
            <div className="  text-center text-black text-lg font-normal leading-relaxed">
              We offer a wide variety of products <br />
              to choose from, so you're sure to <br />
              find what you're looking for.
            </div>
          </div>

          <div className="Payment mb-5 md:mb-0 ">
            <img className="1281 w-24 h-16 mx-auto" src="/images/payment.png" />
            <div className="Payment   text-center text-black text-2xl font-black leading-10">
              Payment
            </div>
            <div className="text-center text-black text-lg font-normal leading-relaxed">
              We offer secure payment processing, <br />
              so you can be sure that your personal <br />
              information is safe.
            </div>
          </div>
        </div>
      </div>

      <div
        className={` flex flex-col  justify-evenly overflow-hidden min-[820px]:flex-row my-20`}
      >
        {/* only visible on smaller screens */}
        <div className="min-[820px]:hidden block ">
          <div className="text-pink text-2xl font-black text-center mb-5 leading-10">
            About us
          </div>

          <div className=" text-center text-black pb-5 max-w-[500px] text-2xl font-extrabold leading-8 ">
            Wide selection, Affordable price, <br />
            Convenient shopping
          </div>
        </div>

        <div className="grid grid-rows-1">
          <div className="Rectangle1 md:w-56  md:h-52 w-[220px] h-[180px] bg-orange-800 bg-opacity-50 bg-pattern bg-auto  col-start-1 col-span-2 row-start-1 row-span-2 " />

          <div className="col-start-2 col-span-2 row-start-2 row-span-2 z-10">
            <img
              className="w-[280px] md:max-w-[320px] h-auto z-10  "
              src="/images/home-about.jpg"
            />
          </div>
          <div className="Rectangle2 w-[220px] h-[190px] md:w-[224px] md:h-[208px]  bg-orange-800 bg-opacity-50 bg-pattern-small col-start-3 col-span-2 row-start-3 row-span-2 " />
        </div>
        <div className=" p-4 flex flex-col min-w-[350px]">
          {/* only visible on larger screens */}
          <div className="hidden min-[820px]:block ">
            <div className="text-pink text-2xl font-black text-center mb-5 leading-10">
              About us
            </div>

            <div className=" text-center text-black pb-5 max-w-[500px] text-2xl font-extrabold leading-8 ">
              Wide selection, Affordable price, <br />
              Convenient shopping
            </div>
          </div>
          <div className="max-w-[500px]  text-black text-lg md:text-xl font-normal leading-8">
            Our mission is to make cosmetics more accessible and affordable for
            everyone. We believe that everyone deserves to feel beautiful, and
            we want to help you find the products you need to look and feel your
            best.
          </div>

          <Link to="/about" className="inline-block">
            <div className={`${styles.button} mt-5 bg-pink  `}>
              <span className="text-[#fff]  text-[18px]">Explore</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
