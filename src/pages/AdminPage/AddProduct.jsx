// import {
//   Card,
//   Input,
//   Button,
//   Typography,
//   Textarea,
// } from "@material-tailwind/react";
// import { useNavigate } from "react-router";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Select, Option } from "@material-tailwind/react";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { useAddProductsMutation } from "../../features/ProductApi";

// const AddProduct = () => {
//   const nav = useNavigate();
//   const [productsImage, setProductsImage] = useState(null);
//   const [addProduct, { isLoading, error }] = useAddProductsMutation();
//   const { user } = useSelector((store) => store.user);

//   const valSchema = Yup.object().shape({
//     product_name: Yup.string()
//       .min(5, "too short")
//       .max(50, "max character 50")
//       .required(),
//     // product_detail: Yup.string()
//     //   .min(10, "too short")
//     //   .max(200, "max character 200")
//     //   .required(),
//     product_detail: Yup.string()
//       .min(10, "too short")
//       .max(1200, "max character 1200")
//       .required(),
//     product_price: Yup.string()
//       .min(1, "too short")
//       .max(5, "max character 5")
//       .required(),
//     // product_image: Yup.mixed()
//     //   .test(
//     //     "fileType",
//     //     "Invalid file type",
//     //     (value) =>
//     //       value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
//     //   )
//     //   .test(
//     //     "fileSize",
//     //     "File too large",
//     //     (value) => value && value.size <= 10 * 1024 * 1024
//     //   ),
//     product_collection: Yup.string().required(),
//     category: Yup.string().required(),
//     countInStock: Yup.string()
//       .min(1, "too short")
//       .max(3, "max character 3")
//       .required(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       product_name: "",
//       product_detail: "",
//       product_price: "",
//       product_image: null,
//       product_collection: "Top Selling Plants",
//       category: "plants",
//       countInStock: "",
//       preview: "",
//     },
//     onSubmit: async (val) => {
//       let formData = new FormData();

//       formData.append("product_name", val.product_name);
//       formData.append("product_detail", val.product_detail);
//       formData.append("product_price", Number(val.product_price));
//       formData.append("product_image", val.product_image);
//       formData.append("product_collection", val.product_collection);
//       formData.append("category", val.category);
//       formData.append("countInStock", Number(val.countInStock));
//       try {
//         const response = await addProduct({
//           body: formData,
//           token: user.token,
//         }).unwrap();
//         toast.success("product added successfully");
//         nav(-1);
//       } catch (err) {
//         toast.error(err.message);
//       }
//     },
//     validationSchema: valSchema,
//   });

//   const handleImage = (e) => {
//     setProductsImage(e.target.files[0]);
//     console.log(e.target.files[0]);

//     const file = e.target.files[0];
//     console.log("Selected file:", file);
//     formik.setFieldValue("property_image", file);

//     const reader = new FileReader();
//     reader.onload = () => {
//       formik.setFieldValue("preview", reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="max-w-sm mt-[15px]  mx-auto pb-4 ">
//       <div>
//         <Card className="place-self-center" color="transparent" shadow={false}>
//           <Typography variant="h4" color="blue-gray">
//             Add Product
//           </Typography>

//           <form onSubmit={formik.handleSubmit} className="mt-5 mb-2 ">
//             <div className="space-y-7 flex flex-col ">
//               <div>
//                 <Input
//                   name="product_name"
//                   id="product_name"
//                   type="text"
//                   onChange={formik.handleChange}
//                   value={formik.values.product_name}
//                   size="lg"
//                   label="Name"
//                 />
//                 {formik.errors.product_name && formik.touched.product_name ? (
//                   <h1 className="mt-2 text-red-600">
//                     {formik.errors.product_name}
//                   </h1>
//                 ) : null}
//               </div>

//               <div>
//                 <Input
//                   name="product_price"
//                   id="product_price"
//                   type="number"
//                   onChange={formik.handleChange}
//                   value={formik.values.product_price}
//                   size="lg"
//                   label="Price"
//                 />
//                 {formik.errors.product_price && formik.touched.product_price ? (
//                   <h1 className="mt-2 text-red-600">
//                     {formik.errors.product_price}
//                   </h1>
//                 ) : null}
//               </div>
//               <div className="w-72">
//                 <Select
//                   label="Select Category"
//                   name="category"
//                   onChange={(e) => formik.setFieldValue("category", e)}
//                 >
//                   <Option value="plants">plants</Option>
//                   <Option value="accessories">accessories</Option>
//                 </Select>
//               </div>
//               <div className="w-72">
//                 {formik.values.category === "plants" ? (
//                   <select
//                     label="Select collection"
//                     name="product_collection"
//                     onChange={(e) => {
//                       console.log(e.target.value);
//                       formik.setFieldValue("product_collection", e);
//                     }}
//                   >
//                     <option value="Top Selling Plants">
//                       Top Selling Plants
//                     </option>
//                     <option value="Indoor Plants">Indoor Plants</option>
//                     <option value="Outdoor Plants">Outdoor Plants</option>
//                     <option value="Flowering Plants">Flowering plants</option>
//                   </select>
//                 ) : (
//                   <select
//                     label="Select collection"
//                     name="product_collection"
//                     onChange={(e) => {
//                       console.log(e.target.value);
//                       formik.setFieldValue(
//                         "product_collection",
//                         e.target.value
//                       );
//                     }}
//                   >
//                     <option value="Pots">Pots</option>
//                     <option value="Fertilizers">Fertilizers </option>
//                   </select>
//                 )}
//               </div>

//               <div>
//                 <p>Select an Image</p>
//                 <input
//                   name="product_image"
//                   onChange={handleImage}
//                   // onChange={(e) => {
//                   //   const file = e.currentTarget.files[0];
//                   //   const reader = new FileReader();
//                   //   reader.onload = () => {
//                   //     formik.setFieldValue("product_image", file);
//                   //     formik.setFieldValue("preview", reader.result);
//                   //   };

//                   //   reader.readAsDataURL(file);
//                   // }}
//                   type="file"
//                 />
//                 {formik.errors.product_image && formik.touched.product_image ? (
//                   <h1 className="mt-2 text-red-600">
//                     {formik.errors.product_image}
//                   </h1>
//                 ) : null}
//                 <div className="border border-gray-600 h-[150px] my-1 w-full">
//                   {formik.values.preview && (
//                     <img
//                       src={formik.values.preview}
//                       alt="image"
//                       className="object-cover h-full w-full"
//                     />
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <Input
//                   name="countInStock"
//                   id="countInStock"
//                   type="number"
//                   onChange={formik.handleChange}
//                   value={formik.values.countInStock}
//                   size="lg"
//                   label="Count In Stock"
//                 />
//                 {formik.errors.countInStock && formik.touched.countInStock ? (
//                   <h1 className="mt-2 text-red-600">
//                     {formik.errors.countInStock}
//                   </h1>
//                 ) : null}
//               </div>
//               <div>
//                 <Textarea
//                   name="product_detail"
//                   id="product_detail"
//                   type="text"
//                   onChange={formik.handleChange}
//                   value={formik.values.product_detail}
//                   label="Description"
//                 />
//                 {formik.errors.product_detail &&
//                 formik.touched.product_detail ? (
//                   <h1 className="mt-2 text-red-600">
//                     {formik.errors.product_detail}
//                   </h1>
//                 ) : null}
//               </div>
//             </div>

//             {isLoading ? (
//               <Button
//                 disabled
//                 className="mt-6 relative py-2 flex justify-center"
//                 fullWidth
//               >
//                 <div className="h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin"></div>
//               </Button>
//             ) : (
//               <Button type="submit" className="mt-6" fullWidth>
//                 Submit
//               </Button>
//             )}
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddProductsMutation } from "../../features/ProductApi";
import Buttons from "../../Components/Buttons"

const AddProduct = () => {
  const nav = useNavigate();
  const [productsImage, setProductsImage] = useState(null);
  const [addProduct, { isLoading, error }] = useAddProductsMutation();
  const { user } = useSelector((store) => store.user);

  const valSchema = Yup.object().shape({
    product_name: Yup.string()
      .min(5, "too short")
      .max(50, "max character 50")
      .required(),
    product_detail: Yup.string()
      .min(10, "too short")
      .max(1200, "max character 1200")
      .required(),
    product_price: Yup.string()
      .min(1, "too short")
      .max(5, "max character 5")
      .required(),
    // product_image: Yup.mixed()
    // .test(
    //   "fileType",
    //   "Invalid file type",
    //   (value) =>
    //     value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    // )
    // .test(
    //   "fileSize",
    //   "File too large",
    //   (value) => value && value.size <= 10 * 1024 * 1024
    // ),
    product_collection: Yup.string().required(),
    category: Yup.string().required(),
    countInStock: Yup.string()
      .min(1, "too short")
      .max(3, "max character 3")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_detail: "",
      product_price: "",
      product_image: null,
      product_collection: "Top Selling Plants",
      category: "plants",
      countInStock: "",
      preview: "",
    },
    onSubmit: async (val) => {
      let formData = new FormData();

      formData.append("product_name", val.product_name);
      formData.append("product_detail", val.product_detail);
      formData.append("product_price", Number(val.product_price));
      formData.append("product_image", val.product_image);
      formData.append("product_collection", val.product_collection);
      formData.append("category", val.category);
      formData.append("countInStock", Number(val.countInStock));
      try {
        const response = await addProduct({
          body: formData,
          token: user.token,
        }).unwrap();
        toast.success("product added successfully");
        nav(-1);
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    },
    validationSchema: valSchema,
  });

  const handleImage = (e) => {
    setProductsImage(e.target.files[0]);
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    console.log("Selected file:", file);
    formik.setFieldValue("property_image", file);

    const reader = new FileReader();
    reader.onload = () => {
      formik.setFieldValue("preview", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-sm mt-[15px]  mx-auto pb-4 p-10 ">
      <div >
        <form onSubmit={formik.handleSubmit} className="mt-5 mb-2">
          <div className="space-y-7 flex flex-col ">
            <div className="">
              <label
                htmlFor="product_name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                name="product_name"
                id="product_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.product_name}
              />
              {formik.errors.product_name && formik.touched.product_name && (
                <div className="mt-2 text-red-600">
                  {formik.errors.product_name}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="product_price"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="product_price"
                id="product_price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.product_price}
              />
              {formik.errors.product_price && formik.touched.product_price && (
                <div className="mt-2 text-red-600">
                  {formik.errors.product_price}
                </div>
              )}
            </div>

            <div className="w-72">
              <label
                htmlFor="category"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Select Category
              </label>
              <select
                name="category"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  formik.setFieldValue("category", e.target.value)
                }
              >
                <option value="plants">plants</option>
                <option value="accessories">accessories</option>
              </select>
            </div>

            <div className="w-72">
            <label
                htmlFor="collection"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Select Collection
              </label>
              {formik.values.category === "plants" ? (
                <select
                  name="product_collection"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    formik.setFieldValue("product_collection", e.target.value)
                  }
                >
                  <option value="Top Selling Plants">Top Selling Plants</option>
                  <option value="Indoor Plants">Indoor Plants</option>
                  <option value="Outdoor Plants">Outdoor Plants</option>
                  <option value="Flowering Plants">Flowering plants</option>
                </select>
              ) : (
                <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  name="product_collection"
                  onChange={(e) =>
                    formik.setFieldValue("product_collection", e.target.value)
                  }
                >
                  <option value="Pots">Pots</option>
                  <option value="Fertilizers">Fertilizers </option>
                </select>
              )}
            </div>

            <div>
              <label
                htmlFor="product_image"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Select an Image
              </label>
              <input
                name="product_image"
                onChange={handleImage}
                type="file"
              />
              {formik.errors.product_image && formik.touched.product_image && (
                <div className="mt-2 text-red-600">
                  {formik.errors.product_image}
                </div>
              )}
              <div className="border border-gray-600 h-[150px] my-1 w-full">
                {formik.values.preview && (
                  <img
                    src={formik.values.preview}
                    alt="image"
                    className="object-cover h-full w-full"
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="countInStock"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Count In Stock
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="countInStock"
                id="countInStock"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.countInStock}
              />
              {formik.errors.countInStock && formik.touched.countInStock && (
                <div className="mt-2 text-red-600">
                  {formik.errors.countInStock}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="product_detail"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Description
              </label>
              <textarea
                className="appearance-none h-[200px] block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="product_detail"
                id="product_detail"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.product_detail}
              />
              {formik.errors.product_detail &&
                formik.touched.product_detail && (
                  <div className="mt-2 text-red-600">
                    {formik.errors.product_detail}
                  </div>
                )}
            </div>
          </div>

          {/* {isLoading ? (
            <button
              disabled
              className="mt-6 relative py-2 flex justify-center"
              type="submit"
              fullWidth
            >
              <div className="h-7 w-7 border-2 rounded-full border-t-gray-900 animate-spin"></div>
            </button>
          ) : (
            <button type="submit" className="mt-6" fullWidth>
              Submit
            </button>
          )} */}
          <Buttons label={"Submit"} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
