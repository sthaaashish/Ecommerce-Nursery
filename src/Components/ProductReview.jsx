import {
  Rating,
  Typography,
  CardHeader,
  CardBody,
  Card,
} from "@material-tailwind/react";

import { useNavigate } from "react-router";
import AddReview from "../pages/userPage/AddReview";

const ProductReview = ({ product }) => {

  const nav = useNavigate();

  return (
    <div className=" mt-10 ">
      <AddReview product={product} />

      <div className="my-7">
        <hr className="h-2 " />
      </div>

      {product.reviews.length === 0 && (
        <span className="text-center">No reviews on this product yet.</span>
      )}
      {product.reviews.map((data) => {
        return (
          <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
            <div class="relative flex gap-4">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {data.username.substring(0, 1)}
                </span>
              </div>
              {/* <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"/> */}
              <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                  <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">
                    {data.username}
                  </p>
                  <a class="text-gray-500 text-xl" href="#">
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
                <p class="text-gray-400 text-sm">20 April 2023, at 14:88 PM</p>
              </div>
            </div>
            <Rating value={data.rating} readonly className="-mt-3"/>
            <p class="-mt-4 text-gray-500">{data.comment}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ProductReview;
