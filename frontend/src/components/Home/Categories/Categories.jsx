import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div> */}
      <div className=" bg-beige bg-pattern  bg-center bg-no-repeat bg-cover mix-blend-color-burn py-10 ">
        <div
          className={`${styles.section} p-6 rounded-lg mb-12 relative`}
          id="categories"
        >
          <div className="SpHeader ">
            <div className="Categories mx-auto w-64 h-16  text-center text-pink text-lg  font-extrabold leading-10">
              CATEGORIES
            </div>
            <div className="ShopByCategory   text-center text-black   font-bodoni-moda text-xl md:text-2xl pb-14 font-extrabold leading-[84.07px] ">
              Shop by Category
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[15px] xl:grid-cols-4 xl:gap-[20px]">
            {categoriesData &&
              categoriesData.map((i) => {
                const handleSubmit = (i) => {
                  navigate(`/products?category=${i.title}`);
                };
                return (
                  <div
                    className="  flex flex-col items-center justify-between cursor-pointer overflow-hidden"
                    key={i.id}
                    onClick={() => handleSubmit(i)}
                  >
                    <div className="">
                      <img
                        src={i.image_Url}
                        className="max-w-[150px] h-[250px] rounded-[70px] object-cover shadow-lg  hover:shadow-black"
                        alt=""
                      />
                    </div>
                    <div>
                      <h5 className={`mt-4 text-[18px] leading-[1.3]`}>
                        {i.title}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
