import React, { useState } from "react";

import ShopProfile from "../../components/Shop/ShopProfile";

import ShopProfileSideBar from "../../components/Shop/Layout/ShopProfileSideBar.jsx";
import SellerHeader from "../../components/Layout/SellerHeader";
import { useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";

const ShopProfilePage = () => {
  const { isLoading } = useSelector((state) => state.seller);
  const [active, setActive] = useState(1);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SellerHeader />
          <div
            className={`mx-auto  flex  flex-col item-center sm:flex-row sm:gap-8 py-10 sm:px-4 h-screen mb-8 overflow-y-auto  `}
          >
            <div className="sm:w-[25%] w-[90%]  sticky mx-auto 800px:mt-0 mt-[18%] max-w-[250px] mb-3  ">
              {/* <ProfileSideBar active={active} setActive={setActive} /> */}
              <ShopProfileSideBar active={active} setActive={setActive} />
            </div>
            <div className=" sticky 800px:mt-0 md:w-[70%] lg:w-[50%] w-[90%] mt-[18%] mx-auto">
              <ShopProfile active={active} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopProfilePage;
