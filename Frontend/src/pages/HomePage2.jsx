import React from "react";
import Hero from "../components/Hero";
import FeaturedPodcasts from "../components/FeaturedPodcasts";
import PopularCreators from "../components/PopularCreators";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
const HomePage2 = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar2/>
      <Hero />
      <FeaturedPodcasts />
      <PopularCreators />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage2;
