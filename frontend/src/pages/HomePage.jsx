import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Home/Hero/Hero.jsx";
import AdHero from "../components/Home/Hero/AdHero.jsx";
import About from "../components/Home/About/About.jsx";
import Categories from "../components/Home/Categories/Categories.jsx";
import Footer from "../components/Footer/Footer1";
import FeaturedProduct from "../components/product/FeaturedProduct.jsx";
import ProductList from "../components/product/ProductList.jsx";
const HomePage = () => {
  return (
    <div>
      <Header />
      {/* <Hero /> */}
      <AdHero />
      <ProductList />
      <Categories />
      {/* <About /> */}
      <FeaturedProduct />

      {/*
        <BestDeals />
        <Events />
        
        
        <Sponsored />*/}
      <Footer />
    </div>
  );
};

export default HomePage;
