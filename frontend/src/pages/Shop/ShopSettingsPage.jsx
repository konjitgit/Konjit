import React from "react";

import ShopSettings from "../../components/Shop/ShopSettings.jsx";

import DashboardSideBar from "../../../src/components/Shop/Layout/DashBoardSideBar.jsx";
import SellerHeader from "../../components/Layout/SellerHeader";

const ShopSettingsPage = () => {
  return (
    <div>
      <SellerHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
