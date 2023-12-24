import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";

const Hero = () => {
  const { isSeller } = useSelector((state) => state.seller);
  return (
    <div
      className={`mx-auto bg-red-100 relative top-12 max-h-[90vh] -z-10 min-h-[70vh] 800px:min-h-[40vh] w-full  bg-opacity-50  ${styles.noramlFlex}`}
    >
      <img
        className="heroimg mx-auto w-full bg-no-repeat object-cover min-h-[70vh] bg-opacity-50 md:bg-opacity-0 "
        src="/images/hero1.jpg"
        alt="hero"
      />

      <div
        className={`${styles.section} w-[60%] 800px:w-[60%] absolute md:ml-20 ml-10 `}
      >
        <div className="">
          <span className="text-black text-3xl md:text-5xl font-extrabold">
            Indulge in the
            <br />
            Ultimate{" "}
          </span>
          <span className="text-pink text-3xl md:text-[40px]  font-extrabold">
            beauty
          </span>
          <p className="text-black text-3xl md:text-[40px]  font-extrabold">
            {" "}
            Experience{" "}
          </p>
        </div>

        <p className="pt-5 text-base md:text-lg font-[500] text-[#000000ba] w-[90%]">
          Our wide selection of products has everything you need to create the
          perfect look.
        </p>
        <div className="flex gap-4 items-center ">
          <Link to="/products-page" className="inline-block cursor-pointer">
            <div className={`${styles.button} mt-5 `}>
              <span className="text-center text-white text-base font-medium leading-none]">
                Shop Now
              </span>
            </div>
          </Link>
          {/* <Link to={isSeller ? "/shop-home" : "/shop-create"}>
            {isSeller ? (
              <div className={`${styles.button} mt-5 sm:hidden `}>
                <span className="text-center text-white text-base font-medium leading-none]">
                  Go to shop
                </span>
              </div>
            ) : (
              <div className={`${styles.button} mt-5 sm:hidden `}>
                <span className="text-center text-white text-base font-medium leading-none]">
                 Be a seller
                </span>
              </div>
            )}
          </Link> */}
        </div>
        <p className="text-pink text-sm md:text-base font-medium leading-tight">
          Shop our cosmetics today and enchant your look.
        </p>
      </div>
    </div>
  );
};

export default Hero;
