import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetOrderByUserQuery } from "../../features/orderApi";
import { usePostReviewMutation } from "../../features/ProductApi";
import { Button, Rating } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Buttons from "../../Components/Buttons";
const AddReview = ({ product }) => {
  const reviewSchema = Yup.object().shape({
    comment: Yup.string().required("Required"),
    rating: Yup.number().required("Required"), // Change to number validation
  });

  const [addReview, { isLoading: load }] = usePostReviewMutation();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate(); // Rename 'nav' to 'navigate' for clarity
  const {
    isLoading,
    isError,
    data: orders,
  } = useGetOrderByUserQuery(user?.token);
  const order = orders?.map((order) => {
    return order?.orderItems?.find((or) => or.product === product._id);
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    onSubmit: async (val, { resetForm }) => {
      if (!user) {
        navigate("/login"); // Redirect to login if user is not authenticated
        return;
      }

      try {
        const response = await addReview({
          id: product._id,
          token: user.token,
          body: {
            comment: val.comment,
            rating: val.rating,
            username: user.fullname,
          },
        }).unwrap();

        toast.success("Successfully added review");
      } catch (err) {
        console.log(err);
        toast.error(err.data);
      }
    },
    validationSchema: reviewSchema,
  });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      {/* {order.length > 0 && ( */}
        <div>
          <div className="flex items-center justify-center shadow-lg mb-4 max-w-lg">
            <form
              className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                  Add a new comment
                </h2>
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    placeholder="Type Your Comment"
                  ></textarea>
                  {formik.errors.comment && formik.touched.comment && (
                    <h1 className="text-pink-700">{formik.errors.comment}</h1>
                  )}
                </div>
                <div className="w-full md:w-full flex items-start px-3">
                  <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                    <Rating
                      name="rating"
                      value={parseInt(formik.values.rating)} // Convert to number
                      onChange={(v) => formik.setFieldValue("rating", v)}
                    />
                    {formik.errors.rating && formik.touched.rating && (
                      <h1 className="text-pink-700">{formik.errors.rating}</h1>
                    )}
                  </div>
                  <div className="-mr-1">
                    <Buttons label={"submit"} isLoading={load}/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default AddReview;
