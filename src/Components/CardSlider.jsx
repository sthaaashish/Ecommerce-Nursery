import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { baseUrl } from "../features/Constant";
import { Rating } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addOrUpdateCart, addToWishlist } from "../features/userSlice";
import FadeIn from "./Fade";
import { ShimmerThumbnail } from "react-shimmer-effects";

const CardSlider = ({ data }) => {
  const sliderRef = useRef(null);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className=" relative overflow-hidden ">
      <Slider ref={sliderRef} {...sliderSettings}>
        {data &&
          data?.map((product, index) => {
            return (
              <>
                <FadeIn direction={"up"} delay={index * 0.2}></FadeIn>
                <div className="p-3" key={index}>
                  <div className="relative ">
                    <div className=" overflow-hidden">
                      {loading && (
                        <ShimmerThumbnail
                          height={300}
                          width={300}
                          className="m-0"
                          rounded
                        />
                      )}
                      <img
                        src={`${baseUrl}${product.product_image}`}
                        alt="Product Image"
                        onLoad={() => setLoading(false)}
                        className="rounded w-full h-[350px] md:h-[300px] object-cover object-center transition ease-in-out delay-150    hover:-translate-y-1 hover:scale-110  duration-300"
                        onClick={() => nav(`/productDetail/${product._id}`)}
                      />
                    </div>

                    <button
                      className=" absolute top-2 right-2"
                      onClick={() => {
                        dispatch(
                          addToWishlist({
                            name: product.product_name,
                            qty: 1,
                            image: product.product_image,
                            price: product.product_price,
                            product: product._id,
                            countInStock: product.countInStock,
                          })
                        );
                      }}
                    >
                      <svg
                        className="w-6 h-6 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 21 19"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className=" px-3 mt-2">
                    <h5 className="text-xl font-semibold tracking-tight">
                      {product.product_name}
                    </h5>
                    <span className="">Rs {product.product_price}</span>
                    <div className="flex items-center justify-between  ">
                      <Rating value={4} readonly />
                      <div className="bg-gray-200 rounded-full h-10 w-10">
                        <button
                          onClick={() => {
                            dispatch(
                              addOrUpdateCart({
                                name: product.product_name,
                                qty: 1,
                                image: product.product_image,
                                price: product.product_price,
                                product: product._id,
                                countInStock: product.countInStock,
                              })
                            );
                          }}
                          className="flex  mx-auto mt-2"
                        >
                          <svg
                            class="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1"
                              d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </Slider>
      <div
        className="absolute  top-1/2 transform -translate-y-1/2 z-10"
        style={{ zIndex: 10 }}
      >
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={goToPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        style={{ zIndex: 10 }}
      >
        <button
          className="bg-gray-300 hover:bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={goToNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
