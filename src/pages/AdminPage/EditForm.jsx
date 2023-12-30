import React, { useState } from "react";
import { baseUrl } from "../../features/Constant";
import { useUpdateProductsMutation } from "../../features/ProductApi";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";

const EditForm = ({ data }) => {
  const [updateProduct, { isLoading, error }] = useUpdateProductsMutation();
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  const [selectedCategory,setSelectedCategory]=useState("")

  const valSchema = Yup.object().shape({
    product_name: Yup.string()
      .min(5, "too short")
      .max(50, "max character 50")
      .required(),
    product_detail: Yup.string()
      .min(10, "too short")
      .max(200, "max character 200")
      .required(),
    product_price: Yup.string()
      .min(1, "too short")
      .max(5, "max character 5")
      .required(),
    // collection: Yup.string()
    //   .required(),
    // category: Yup.string()
    //   .required(),
    countInStock: Yup.string()
      .min(1, "too short")
      .max(3, "max character 3")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      product_name: data.product_name,
      product_detail: data.product_detail,
      product_price: data.product_price.toString(),
      product_image: null,
      product_collection: data.product_collection,
      category: data.category,
      countInStock: data.countInStock,
      preview: `${baseUrl}${data.product_image}`,
    },
    onSubmit: async (val) => {
      let formData = new FormData();
      formData.append("product_name", val.product_name);
      formData.append("product_detail", val.product_detail);
      formData.append("product_price", Number(val.product_price));

      formData.append("product_collection", val.product_collection);
      formData.append("category", val.category);
      formData.append("countInStock", Number(val.countInStock));

      try {
        if (formik.values.product_image === null) {
          const response = await updateProduct({
            body: formData,
            token: user.token,
            id: data._id,
          });
          toast.success("product added successfully");
          nav(-1);
        } else {
          formData.append("product_image", val.product_image);
          formData.append("imagePath", data.product_image);

          const response = await updateProduct({
            body: formData,
            token: user.token,
            id: data._id,
          });
          toast.success("product added successfully");
          nav(-1);
        }
      } catch (err) {
        toast.error(err.message);
      }
    },
    validationSchema: valSchema,
  });
  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className="max-w-sm mt-[15px]  mx-auto pb-4 ">
      <div>
        <Card className="place-self-center" color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Edit Product
          </Typography>

          <form onSubmit={formik.handleSubmit} className="mt-5 mb-2 ">
            <div className="space-y-7 flex flex-col ">
              <div>
                <Input
                  name="product_name"
                  id="product_name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.product_name}
                  size="lg"
                  label="Name"
                />
                {formik.errors.product_name && formik.touched.product_name ? (
                  <h1 className="mt-2 text-red-600">
                    {formik.errors.product_name}
                  </h1>
                ) : null}
              </div>

              <div>
                <Input
                  name="product_price"
                  id="product_price"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.product_price}
                  size="lg"
                  label="Price"
                />
                {formik.errors.product_price && formik.touched.product_price ? (
                  <h1 className="mt-2 text-red-600">
                    {formik.errors.product_price}
                  </h1>
                ) : null}
              </div>

              <div className="w-72">
                <Select
                  label="Select Category"
                  name="category"
                   onChange={(e) => formik.setFieldValue("category", e)}
                
                  value={formik.values.category}
                >
                  <Option value="plants">plants</Option>
                  <Option value="accessories">accessories</Option>
                </Select>
              </div>

              {/* <div className="w-72">
                <select
                  label="Select collection"
                  name="product_collection"
                  value={formik.values.product_collection}
                  onChange={formik.handleChange}
                >
                  {selectedCategory === "plants" && (
                    <>
                      <option value="TopSellingPlant">TopSellingPlant</option>
                      <option value="Indoor Plants">Indoor Plants</option>
                      <option value="Outdoor Plants">Outdoor Plants</option>
                      <option value="Flowering Plants">Flowering plants</option>
                    </>
                  )}
                  {selectedCategory === "accessories" && (
                    <>
                      <option value="Pots">Pots</option>
                      <option value="Fertilizers">Fertilizers</option>
                    </>
                  )}
                </select>
              </div> */}

<div className="w-72">
                {formik.values.category==="plants" ? (
                <select
                  label="Select collection"
                  name="product_collection"
                  onChange={(e)=>{
                    console.log(e.target.value)
              formik.setFieldValue("product_collection",e)
                  }}
                > 
                             
                      <option  value="Top Selling Plants">Top Selling Plants</option>
                      <option value="Indoor Plants">Indoor Plants</option>
                      <option value="Outdoor Plants">Outdoor Plants</option>
                      <option value="Flowering Plants">Flowering plants</option>
                </select>):
                (
                  <select
                  label="Select collection"
                  name="product_collection"
                  onChange={(e)=>{
                    console.log(e.target.value)
                    formik.setFieldValue("product_collection",e.target.value)
                  }}
                > 
                             
                      <option  value="Pots">Pots</option>
                      <option value="Fertilizers">Fertilizers </option>
                      
                </select>
                )}
              </div>

              <div>
                <p>Select an Image</p>
                <input
                  name="product_image"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    formik.setFieldValue("product_image", file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener("load", () => {
                      formik.setFieldValue("preview", reader.result);
                    });
                  }}
                  type="file"
                />
                {formik.errors.product_image && formik.touched.product_image ? (
                  <h1 className="mt-2 text-red-600">
                    {formik.errors.product_image}
                  </h1>
                ) : null}
                <div className="border border-gray-600 h-[150px] my-1 w-full">
                  {formik.values.preview !== null && (
                    <img
                      src={formik.values.preview}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  )}
                </div>
              </div>

            

              <div>
                <Input
                  name="countInStock"
                  id="countInStock"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.countInStock}
                  size="lg"
                  label="Count In Stock"
                />
                {formik.errors.countInStock && formik.touched.countInStock ? (
                  <h1 className="mt-2 text-red-600">
                    {formik.errors.countInStock}
                  </h1>
                ) : null}
              </div>

              <div>
                <Textarea
                  name="product_detail"
                  id="product_detail"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.product_detail}
                  label="Description"
                />
                {formik.errors.product_detail &&
                formik.touched.product_detail ? (
                  <h1 className="mt-2 text-red-600">
                    {formik.errors.product_detail}
                  </h1>
                ) : null}
              </div>
            </div>

            {isLoading ? (
              <Button
                disabled
                className="mt-6 relative py-2 flex justify-center"
                fullWidth
              >
                <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
              </Button>
            ) : (
              <Button type="submit" className="mt-6" fullWidth>
                Submit
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditForm;
