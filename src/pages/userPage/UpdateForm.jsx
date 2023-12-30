import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Buttons from "../../Components/Buttons";
import { useUserUpdateMutation } from "../../features/authApi";
import { store } from "../../features/store";
import { updateUser } from "../../features/userSlice";

const UpdateForm = () => {
  const userSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("Required"),
    fullname: Yup.string().min(5).max(20).required("Required"),
  });
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();   
  const [userUpdates, { isLoading, error, isError, isSuccess }] = useUserUpdateMutation();

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      fullname: user?.fullname,
    },
    onSubmit: async (val) => {
      try {
        const response = await userUpdates({
          email: val.email,
          fullname: val.fullname,
          token: user.token,
        }).unwrap();

        dispatch(
          updateUser({
            email: val.email,
            fullname: val.fullname,
          })
        );
        toast.success("successfully updated");
      } catch (err) {
        console.log(err)
        toast.error(err.data.message);
      }
    },
    validationSchema: userSchema,
  });

 
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Profile
      </Typography>
      <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 ">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            size="lg"
            label="Email"
          />

          {formik.errors.email && formik.touched.email && (
            <h1 className="text-pink-700">{formik.errors.email}</h1>
          )}

          <Input
            name="fullname"
            onChange={formik.handleChange}
            value={formik.values.fullname}
            type="text"
            size="lg"
            label="Username"
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <h1 className="text-pink-700">{formik.errors.fullname}</h1>
          )}
        </div>

     <Buttons label={"Update"} isLoading={isLoading}/>
      </form>
    </Card>
  );
};

export default UpdateForm;
