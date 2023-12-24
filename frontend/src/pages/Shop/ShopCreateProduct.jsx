import React from "react";
import SellerHeader from "../../components/Layout/SellerHeader";
import Footer from "../../components/Footer/Footer1";
import CreateProduct from "../../components/Shop/CreateProduct";
import Loader from "../../components/Layout/Loader";
import { useSelector } from "react-redux";
function ShopCreateProduct() {
  const {isLoading } = useSelector((state) => state.seller);
  return (
    <div>
       {isLoading ? (
        <Loader />
      ) : (
      <>
        <SellerHeader />
        <CreateProduct />
        <Footer />
      </>
      )}
    </div>
  );
}

export default ShopCreateProduct;
