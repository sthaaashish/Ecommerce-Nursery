import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Buttons from "../../Components/Buttons";
import { useAddOrderMutation } from "../../features/orderApi";
import { clearCartItem } from "../../features/userSlice";

const OrderPage = () => {
  const { carts, user } = useSelector((store) => store.user);
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const totals = carts.reduce((a, b) => {
    return a + b.qty * b.price;
  }, 0);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const orderAdd = async () => {
    try {
      const response = await addOrder({
        body: {
          totalPrice: totals,
          orderItems: carts,
        },
        token: user.token,
      }).unwrap();
      dispatch(clearCartItem());
      toast.success("Order placed successfully");
      nav("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const initiateESewaPayment = (order) => {
    const esewaURL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const params = {
      amt: order.amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: order.amount,
      pid: order._id,
      scd: "EPAYTEST",
      su: "http://localhost:5173/users/esewa_payment_success",
      fu: "http://localhost:5173/users/esewa_payment_failed",
    };

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", esewaURL);

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="p-10 space-y-10">
      <h1>Delivery Address</h1>
      <p className="text-gray-700">
        {user.shippingAddress.address}, {user.shippingAddress.city}
      </p>
      <p>Total Amount is {totals}</p>

      <button
        className="underline"
        onClick={() =>
          initiateESewaPayment({ amount: totals, _id: "your_order_id" })
        }
      >
        Pay with eSewa
      </button>
      <Buttons onClick={orderAdd} label={"CheckOut"} isLoading={isLoading} />
    </div>
  );
};

export default OrderPage;
