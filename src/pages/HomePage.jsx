import React from "react";
import { useSelector } from "react-redux";
import { store } from "../features/store";
import Collection from "./collections/Collection";
import ImageCarousel from "./ImageCarousel";
import NewArrivals from "./NewArrivals";
import OurServices from "./Services";
import Services from "./Services";
import TestimonialCards from "./Testimonal";
import TopSelling from "./TopSelling";

const HomePage = () => {
  return (
    <div>
      <ImageCarousel />
      <TopSelling />
      <NewArrivals />
      <Collection />
      <TestimonialCards />
      <OurServices />
    </div>
  );
};

export default HomePage;
