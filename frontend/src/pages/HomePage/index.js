import React from "react";
import Banner from "../../components/Home/banner";
import Cards from "../../components/Home/cards";
import ThirdSec from "../../components/Home/thirdsec";
import FourthSec from "../../components/Home/fourthsec";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Banner />
      <Cards />
      <ThirdSec />
      <FourthSec />
      {/* <Footer /> */}
    </>
  );
}
