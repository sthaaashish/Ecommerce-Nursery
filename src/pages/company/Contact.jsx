import { useFormik } from "formik";
import React from "react";
import Buttons from "../../Components/Buttons";
import * as Yup from "yup";
import { useSendMessagesMutation } from "../../features/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Contact = () => {
  const [sendMessage, { isLoading }] = useSendMessagesMutation();
  const { user } = useSelector((store) => store.user);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(5, "Too short")
      .max(50, "Max character is 50")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    subject: Yup.string().min(4, "Too short").max(40, "Too long").required("Required"),
    message: Yup.string().min(10, "Too short").max(500, "Too long").required("Required")
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await sendMessage({
          body: {
            fullname: values.fullname,
            email: values.email,
            subject: values.subject,
            message: values.message,
          },
          token: user.token,
        });
        toast.success(" Sent successfully");
        resetForm();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="p-12 mt-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-center md:text-left md:pl-8">
          <h1 className="text-center text-3xl">Contact Us</h1>
          <h1 className="text-2xl text-center p-6">
            If you have any questions <br /> please do not hesitate to send us a
            message
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-4 mt-4 shadow-2xl bg-gray-100 p-6 md:max-w-[600px] mx-auto">
              <input
                type="text"
                name="fullname"
                className="w-full p-3 text-sm border border-black rounded"
                placeholder="Your fullName"
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="mt-2 text-red-600">
                  {formik.errors.fullname}
                </div>
              ) : null}
              <input
                type="text"
                name="email"
                className="w-full p-3 text-sm border border-black rounded"
                placeholder="Your Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="mt-2 text-red-600">{formik.errors.email}</div>
              ) : null}
              <input
                type="text"
                name="subject"
                className="w-full p-3 text-sm border border-black rounded"
                placeholder="Subject"
                onChange={formik.handleChange}
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <div className="mt-2 text-red-600">{formik.errors.subject}</div>
              ) : null}

              <textarea
                name="message"
                placeholder="Message"
                className="w-full h-[200px] p-3 border border-black rounded"
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="mt-2 text-red-600">{formik.errors.message}</div>
              ) : null}
              <Buttons label="Submit" type="submit" disabled={isLoading} />
            </div>
          </form>
        </div>
        <div className="relative my-4 mt-10">
          <img
            src="https://images.unsplash.com/photo-1598764557991-b9f211b73b81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Contact Image"
            className="w-full h-[700px] md:absolute md:right-3 md:top-0 md:max-w-[calc(100% / 3)] rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
