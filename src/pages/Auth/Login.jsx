import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import {toast} from "react-toastify"
import { useUserLoginMutation } from "../../features/authApi";
import { useDispatch } from "react-redux";
import { addOrUpdateUser } from "../../features/userSlice";
import Loading from "../../Components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function Login() {
  const nav = useNavigate();
  const dispatch=useDispatch()
  const [userLogin, { isLoading, data }] = useUserLoginMutation();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().min(6).max(20).required("required"),
  });

  const { loginWithRedirect } = useAuth0();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (val) => {
      try {
        const response = await userLogin(val).unwrap();
       dispatch( addOrUpdateUser(response))
       nav(-1)
      
        toast.success("successfully logined");
      } catch (err) {
  
        toast.error(err.data.message);
      }
    },
    validationSchema: loginSchema,
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
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px ">
              <div className="p-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
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
                Sign in
              </button>
            </div>
            <div className="flex justify-center">
              <p>Don't have an account?</p>
              <button className="underline" onClick={() => nav("/signUp")}>
                Register
              </button>
            </div>
          </form>
          <button onClick={() => loginWithRedirect()} className="  flex items-center mx-auto text-center shadow-md">
            <FontAwesomeIcon icon={faGoogle} className="p-2"/>
            Log In with google account</button>;
        </div>
      </div>
    </section>
  );
}

export default Login;


// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const Login = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

// export default Login;


