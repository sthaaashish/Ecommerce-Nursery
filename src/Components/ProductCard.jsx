
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Rating,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../features/Constant";
import { useDispatch } from "react-redux";
import { addOrUpdateCart, addToWishlist } from "../features/userSlice";
import { useFormik } from "formik";
import { Image, Shimmer } from "react-shimmer";
import FadeIn from "./Fade";

const ProductCard = ({ data, handleClick,index }) => {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      qty: 1,
    },
  });
  const dispatch = useDispatch();
  return (
    <>
        <FadeIn delay={(index +1)*0.2} direction={"up"}>
      <div className=" md:w-[300px] md:h-[400px] bg-[#e3ece9] border border-gray-300 rounded-lg shadow ">
          <div >
            <div className="relative">
              <div className=" overflow-hidden">
              <img
                src={`${baseUrl}${data.product_image}`}
                alt="Product Image"
                className="rounded w-full h-48 md:h-[300px] object-cover transition ease-in-out delay-150    hover:-translate-y-1 hover:scale-110  duration-300"
               onClick={handleClick}
              />
              </div>
           
              <button
                className=" absolute top-2 right-2"
                onClick={() => {
                  dispatch(
                    addToWishlist({
                      name: data.product_name,
                      qty: formik.values.qty,
                      image: data.product_image,
                      price: data.product_price,
                      product: data._id,
                      countInStock: data.countInStock,
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
                {data.product_name}
              </h5>
              <span className="">
                Rs {data.product_price}
              </span>
              <div className="flex items-center justify-between  ">
                <Rating value={4} readonly />
                <div className="bg-gray-200 rounded-full h-10 w-10">
                  <button
                    onClick={() => {
                      dispatch(
                        addOrUpdateCart({
                          name: data.product_name,
                          qty: formik.values.qty,
                          image: data.product_image,
                          price: data.product_price,
                          product: data._id,
                          countInStock: data.countInStock,
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
      </div>
        </FadeIn>
    </>
  );
};

export default ProductCard;
