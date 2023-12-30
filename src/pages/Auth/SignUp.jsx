import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUserRegisterMutation } from "../../features/authApi";
import Loading from "../../Components/Loading";

function SignUp() {
  const nav = useNavigate();
  const [userRegister, { isLoading, data }] = useUserRegisterMutation();
  const registerSchema = Yup.object().shape({
    fullname: Yup.string().min(5).max(20).required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().min(6).max(20).required("required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (val) => {
      try {
        const response = await userRegister(val).unwrap();
        toast.success("successfully Registered");
        nav(-1);
      } catch (err) {
        toast.error(err.data.message);
      }
    },
    validationSchema: registerSchema,
  });
  
  if(isLoading){
    return<Loading/>
  }
  return (
    <section className="gradient-form h-full ">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full shadow-2xl rounded-lg bg-slate-400  space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px ">
              <div className="p-3">
                <label htmlFor="fullname" className="sr-only">
                  FullName
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="enter your fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                />
                {formik.errors.fullname && formik.touched.fullname && (
                  <h1 className="text-pink-700">{formik.errors.fullname}</h1>
                )}
              </div>
              <div className="p-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <h1 className="text-pink-700">{formik.errors.email}</h1>
                )}
              </div>
              <div className="p-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <h1 className="text-pink-700">{formik.errors.password}</h1>
                )}
              </div>
            </div>
            <div className="px-3 space-x-1">
              <input type="checkbox" />
              <label>Remeber me</label>
            </div>
            <div className="p-3">
              <button
                type="submit"
                className="group  relative w-full flex justify-center bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 hover:bg-gradient-to-br   py-2 px-4 border border-transparent text-lg text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Register
              </button>
            </div>
            <div className="flex justify-center">
              <p>Already have an account?</p>
              <button className="underline" onClick={() => nav(`/login`)}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
