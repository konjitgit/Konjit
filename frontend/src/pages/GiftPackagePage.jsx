import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";

function GiftPackagePage() {
  return (
    <div>
      <Header />
      <div>
        <div className="pt-20 h-[80vh] relative hero-gift ">
          {/* <img
            src="/images/harper-sunday-5adPowUq_h0-unsplash.jpg"
            alt=""
            className="w-full h-full  object-cover object-center -z-10"
          /> */}
          <div className="bg-pink opacity-80 absolute top-20 left-0 right-0 bottom-0 "></div>
          <div className=" absolute top-20 z-10 p-10 pl-40  flex gap-20  h-full">
            <div className=" text-white max-w-[45%] pt-16">
              <p className="text-5xl  font-bold">
                The Perfect Gift for <span className="text-whte">Any</span>{" "}
                Occasion
              </p>
              <p className="pt-8 text-lg">
                Looking for the perfect gift for a special someone? Look no
                further than our gift packages! We have a variety of packages to{" "}
                choose from, each one filled with high-quality cosmetics that
                your recipient will love.
              </p>
              <p className="pt-3 text-lg text-whit font-semibold">
                Shop our gift packages today and find the perfect one for your
                loved one<span>!</span>
              </p>
              <button
                className={`px-5 py-2 border-2 border-white mt-4 hover:bg-[#3F0519] hover:rounded transition-all transitio`}
              >
                Shop now
              </button>
            </div>
            <img
              src="/images/gift3.png"
              alt="hola"
              className="max-w-[45%] pb-10 pl-10"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <img
            src="/images/gift1.png"
            alt="hola"
            className="max-w-[25%] pb-10 pl-10 "
          />
          <div className="leading-loose">
            <p className="text-5xl font-bold">For mom</p>
            <p className="text-xl py-3">Moms deserve the absolute best!</p>
            <button className="bg-pink rounded px-3 py-2 text-white shadow">
              Shop now
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="leading-loose">
            <p className="text-5xl font-bold">For mom</p>
            <p className="text-xl py-3">Moms deserve the absolute best!</p>
            <button className="bg-pink rounded px-3 py-2 text-white shadow">
              Shop now
            </button>
          </div>
          <img
            src="/images/gift1.png"
            alt="hola"
            className="max-w-[25%] pb-10 pl-10 "
          />
        </div>
        <div className="flex justify-center items-center gap-10">
          <img
            src="/images/gift1.png"
            alt="hola"
            className="max-w-[25%] pb-10 pl-10 "
          />
          <div className="leading-loose">
            <p className="text-5xl font-bold">For mom</p>
            <p className="text-xl py-3">Moms deserve the absolute best!</p>
            <button className="bg-pink rounded px-3 py-2 text-white shadow">
              Shop now
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="leading-loose">
            <p className="text-5xl font-bold">For mom</p>
            <p className="text-xl py-3">Moms deserve the absolute best!</p>
            <button className="bg-pink rounded px-3 py-2 text-white shadow">
              Shop now
            </button>
          </div>
          <img
            src="/images/gift1.png"
            alt="hola"
            className="max-w-[25%] pb-10 pl-10 "
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default GiftPackagePage;
