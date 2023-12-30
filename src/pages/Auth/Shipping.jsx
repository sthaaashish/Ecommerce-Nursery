import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { replace, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useUserUpdateMutation } from "../../features/authApi";
import { updateUser } from "../../features/userSlice";
import Loading from "../../Components/Loading";

const Shipping = () => {
  const addressSchema = Yup.object().shape({
    address: Yup.string().required("Required"),
    city: Yup.string().min(5).max(20).required("Required"),
  });

  const nav = useNavigate();
  const dispatch = useDispatch();
  const [update_user, { isLoading, isError, error, isSuccess }] =
    useUserUpdateMutation();
  const { user } = useSelector((store) => store.user);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
    },
    onSubmit: async (val) => {
      try {
        const response = await update_user({
          token: user.token,
          body: {
            shippingAddress: {
              address: val.address,
              city: val.city,
              isEmpty: false,
            },
          },
        }).unwrap();

        dispatch(
          updateUser({
            shippingAddress: {
              address: val.address,
              city: val.city,
              isEmpty: false,
            },
          })
        );

        nav("/user/checkout", { replace: true });
        toast.success("successfull");
      } catch (err) {
        toast.error(err.message);
      }
    },
    validationSchema: addressSchema,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card
      color="transparent"
      shadow={false}
      className="mx-auto max-w-xl mt-24 space-y-9"
    >
      <Typography variant="h4" color="blue-gray">
        Address Form
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <Input
            name="address"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.address}
            size="lg"
            label="Address"
          />

          {formik.errors.address && formik.touched.address && (
            <h1 className="text-pink-700">{formik.errors.address}</h1>
          )}

          <Input
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            type="text"
            size="lg"
            label="City"
          />
          {formik.errors.city && formik.touched.city && (
            <h1 className="text-pink-700">{formik.errors.city}</h1>
          )}
        </div>

        {isLoading ? (
          <Button type="submit" className="mt-6" fullWidth>
            <div className="h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto "></div>
          </Button>
        ) : (
          <Button type="submit" className="mt-6" fullWidth>
            Submit
          </Button>
        )}
      </form>
    </Card>
  );
};

export default Shipping;
