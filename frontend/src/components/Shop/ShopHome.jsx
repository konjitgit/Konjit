import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

function ShopHome() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);
  return (
    <div>
      <p className="text-4xl font-bold m-10 ">
        Welcome, <span className="text-pink">{seller.name}</span>
      </p>
      <div className=" flex justify-evenly ">
        <div className="bg-beige border-[6px] border-red-200 w-fit p-10 flex gap-6 rounded-md">
          <div className="w-12 h-12 bg-pink p-1 rounded-[50%] border-4 border-red-200">
            <img src="/images/vision.png" alt="" className="" />
          </div>
          <div className="font-semibold ">
            <p>Total Products</p>
            <p className="text-pink font-semibold">
              {allProducts && allProducts.length}
            </p>
          </div>
        </div>
        <div className="bg-beige border-[6px] border-red-200 w-fit p-10 flex gap-6 rounded-md">
          <div className="w-12 h-12 bg-pink p-1 rounded-[50%] border-4 border-red-200">
            <img src="/images/vision.png" alt="" />
          </div>
          <div className="font-semibold ">
            <p>Total viewers</p>
            <p className="text-pink font-semibold">345</p>
          </div>
        </div>
        <div className="bg-beige border-[6px] border-red-200 w-fit p-10 flex gap-6 rounded-md">
          <div className="w-12 h-12 bg-pink p-1 rounded-[50%] border-4 border-red-200">
            <img src="/images/vision.png" alt="" />
          </div>
          <div className="font-semibold ">
            <p>Total viewers</p>
            <p className="text-pink font-semibold">345</p>
          </div>
        </div>
        <div className="bg-beige border-[6px] border-red-200 w-fit p-10 flex gap-6 rounded-md">
          <div className="w-12 h-12 bg-pink p-1 rounded-[50%] border-4 border-red-200">
            <img src="/images/vision.png" alt="" />
          </div>
          <div className="font-semibold ">
            <p>Total viewers</p>
            <p className="text-pink font-semibold">345</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopHome;
