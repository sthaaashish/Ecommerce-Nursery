import { Card, Rating, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Buttons from "../Components/Buttons";
import Loading from "../Components/Loading";
import ProductReview from "../Components/ProductReview";
import { baseUrl } from "../features/Constant";
import { useGetProductsByIdQuery } from "../features/ProductApi";
import { addOrUpdateCart } from "../features/userSlice";
import NewArrivals from "./NewArrivals";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductsByIdQuery(id);
  const nav = useNavigate();
  const dispatch = useDispatch();

 

  const formik = useFormik({
    initialValues: {
      qty: 1,
    },
  });
  if (isLoading) {
    return <Loading />;
  }
const buttonClick=()=>{
    dispatch(
      addOrUpdateCart({
        name: product.product_name,
        qty: formik.values.qty,
        image: product.product_image,
        price: product.product_price,
        product: product._id,
        countInStock: product.countInStock,
      })
    );
    nav("/user/cart");
}
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 md:ml-10">
        <div className="lg:w-4/5  flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={`${baseUrl}${product.product_image}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.product_name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <Rating value={4} readonly />
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Qty</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rs {product.product_price}
              </span>
              <div className="flex ml-auto">
              <Buttons
                onClick={buttonClick}
                label={"Add to Cart"}
              />
              </div>
              
           
              <button
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
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <ProductReview product={product} />
      </div>
      {/* For recommendations */}
      <NewArrivals title={"You might also like"} />
    </section>
  );
};

export default ProductDetail;
