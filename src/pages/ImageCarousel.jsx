import { Carousel, Button, Typography } from "@material-tailwind/react";
import React from "react";
import plant from "../assets/plant.png";
import succculents from "../assets/coverSucculents.jpg";
import FadeIn from "../Components/Fade";
import { useNavigate } from "react-router";

const ImageCarousel = () => {
  const nav=useNavigate();
  return (
    <Carousel className="rounded-xl ">


      {/* -------Carousel1----- */}
      <div className="relative  ">
        <div className="flex flex-row-reverse ">
          <div className="flex-1">
            <img
              src={succculents}
              alt="image"
              className="h-[400px]  md:h-[600px] w-full  md:object-cover object-center "
            />
          </div>{" "}
        </div>

        <div className="w-[200px] top-1/3 md:w-[700px] absolute md:justify-center md:text-center ml-8 text-green-800 md:top-1/2">
          <FadeIn direction={"down"} delay={0.4}>
            <h1 className="font-Poppins md:text-5xl">
              Bring Nature Indoors with Our Plant Collection
            </h1>
          </FadeIn>

          <FadeIn direction={"right"} delay={0.4}>
            <p className="">
              Embark on a journey of tranquility and harmony as you bring nature
              indoors with our diverse plant collection
            </p>
          </FadeIn>
          <div className="flex justify-start md:justify-center">
          <FadeIn direction={"up"} delay={0.4}>
            <button onClick={()=>nav(`/plants`)} className=" px-5  bg-teal-700 rounded-full text-white py-1 hover:bg-teal-600">
              Shop Now
            </button>
          </FadeIn>
          </div>
         
        </div>
      </div>

{/* -----------Carousel2------------- */}
      <div className="relative  ">
        <div className="flex flex-row-reverse ">
          <div className="flex-1">
            <img
              src={plant}
              alt="image"
              className="h-[400px]  md:h-[600px] w-full  md:object-cover object-center "
            />
          </div>{" "}
        </div>

        <div className="absolute justify-center mx-auto text-green-800 p-4 right-0 top-1/2 md:right-1/4   ">
          <h1 className="animate-typing overflow-hidden whitespace-nowrap font-Poppins  p-2 md:text-5xl">
            Bringing Life Inside
          </h1>
          {/* <FadeIn direction={"up"} delay={0.4} padding={0} fullWidth> */}
          <p className=" text-black text-sm whitespace-normal max-w-[300px] md:w-full md:whitespace-nowrap font-Lato ml-2">
            Elevate your space with our lush indoor plant offerings, curated for
            your green sanctuary
          </p>
        </div>
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
