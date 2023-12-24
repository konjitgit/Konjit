import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Nav from "./nav";

function Header() {
  
  return (
    <div className="header ">
      <Nav />
      <Dropdown />
    </div>
  );
}

export default Header;
