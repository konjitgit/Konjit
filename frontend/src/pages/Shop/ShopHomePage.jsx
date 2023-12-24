import React from "react";
import Footer from "../../components/Footer/Footer1";
import SellerHeader from "../../components/Layout/SellerHeader";
import ShopHome from "../../components/Shop/ShopHome.jsx";
import { useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";

function ShopHomePage() {
  const { seller, isLoading } = useSelector((state) => state.seller);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SellerHeader />
          <ShopHome />
          <Footer />
        </>
      )}
    </div>
  );
}

export default ShopHomePage;
