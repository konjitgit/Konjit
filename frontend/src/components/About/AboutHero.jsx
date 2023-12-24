import React from "react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <div >
      <div className="Opening h-60 relative top-16">
        <img
          className=" w-full  h-60  object-cover"
          src="/images/home-about.jpg"
        />
        <div className="Rectangle74 w-full h-60 left-0 top-0 absolute bg-pink bg-opacity-40" ></div>
        <div className="absolute text-center -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%]">
          <div className="AboutUs  text-white text-3xl md:text-7xl font-black">
            About us
          </div>
          <div className="HomePagesAbout text-white text-xl font-semibold ">
            <Link to="/" className="hover:underline">
              {" "}
              Home
            </Link>{" "}
            - Pages -
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutHero;
