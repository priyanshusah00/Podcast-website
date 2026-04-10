import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedPodcasts from "../components/FeaturedPodcasts";
import PopularCreators from "../components/PopularCreators";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedPodcasts />
      <PopularCreators />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
