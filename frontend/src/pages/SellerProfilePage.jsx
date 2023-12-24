import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import SellerProfile from "../components/Shop/SellerProfile";
function SellerProfilePage() {
  return (
    <div >
      <SellerProfile isOwner={true} />
    </div>
  );
}

export default SellerProfilePage;
