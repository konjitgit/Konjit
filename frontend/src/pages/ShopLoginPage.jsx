import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/product-create`);
    }
  }, [isLoading, isSeller, navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
