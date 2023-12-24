import React from "react";
import ItemContainer from "./ItemContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menu";



const Footer = () => {
  return (
    <footer className="bg-beige text-white py-2">
      <div className=" container1 flex flex-col md:flex-row  items-center justify-center ">
        <div className=" hidden intro px-10  md:flex md:justify-evenly flex-col p-5 w-1/2 sm:w-11/12 sm:text-center md:text-left">
          <h1 className=" lg:text-3xl text-2xl text-black font-bold">KONJIT</h1>
          <p className=" text-black pt-4 w-full md:w-1/2 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <p className=" text-black font-bold pt-3 md:pt-2">Be Bold</p>
        </div>
        <ItemContainer/>
      </div>
      <div className=" container1 grid grid-cols-1 px-11 place-items-center sm:grid-cols-3 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm">
        <SocialIcons Icons={Icons} />
        <span className=" text-gray-600 ">
          &copy;2023 Konjit. All rights reserved.
        </span>
        <span className=" text-gray-600 ">Terms . Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
