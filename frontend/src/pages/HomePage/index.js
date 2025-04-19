/** @format */

import React from "react";
import Banner from "../../components/Home/banner";
import Header from "../../layout/header";
import CategoryCards from "../../components/Home/category";
import WhyChooseUs from "../../components/Home/why-chose-us";
import FeaturedEvents from "../../components/Home/feature-event";
import StatsCounter from "../../components/Home/stats-counter";
import Footer from "../../layout/footer";

export default function HomePage() {
  return (
    <>
    
      <Header />  
      <Banner />
      <CategoryCards />
      <WhyChooseUs />
      <FeaturedEvents />
      <StatsCounter/>
      <Footer />
    </>
  );
}
