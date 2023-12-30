import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../features/Constant";
import { addOrUpdateCart, removeCart } from "../../features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Buttons from "../../Components/Buttons";

const Cart = () => {
  const { carts, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const buttonOnClick = () => {
    if (!user) {
      nav('/login')
    }else if (user.shippingAddress.isEmpty){
      nav("/user/shipping");
    }
     else {
      nav("/user/checkout");
    }
  };

  const total = carts.reduce((a, b) => a + b.qty * b.price, 0);

  return (
    <div className="p-4">
      {carts.length === 0 ? (
        <div className="text-center text-3xl">
          <h1>No items available to show</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl mb-7 font-bold">Your Cart Items</h1>

          <div className="md:grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-8 p-3">
              {carts.map((cart, i) => (
                <div
                  key={i}
                  className="flex shadow-xl rounded-2xl  items-start space-x-4 max-w-xl"
                >
                  <img
                    className=" w-full md:w-[300px] h-[200px] object-cover"
                    src={`${baseUrl}${cart.image}`}
                    alt="image"
                  />
                  <div className="flex-1 space-y-4 p-2">
                    <h1 className="font-semibold">{cart.name}</h1>
                    <p className="text-gray-700">Rs.{cart.price}</p>
                    <div className="flex items-center space-x-4">
                      <Typography variant="small" color="blue-gray">
                        Quantity:
                      </Typography>
                      <select
                        value={cart.qty}
                        onChange={(e) => {
                          dispatch(
                            addOrUpdateCart({
                              name: cart.name,
                              qty: e.target.value,
                              image: cart.image,
                              price: cart.price,
                              product: cart.product,
                              countInStock: cart.countInStock,
                            })
                          );
                        }}
                        className="p-2 border rounded"
                      >
                        {[...Array(cart.countInStock).keys()].map((v, i) => (
                          <option key={i} value={v + 1}>
                            {v + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => dispatch(removeCart(i))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <p className="text-gray-700">
                        Total: Rs.{cart.qty * cart.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Card className="col-span-1 md:h-[200px] p-4">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="py-2">Total Quantity</td>
                    <td className="py-2 text-center">{carts.length}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Total Price</td>
                    <td className="py-2 text-center">Rs.{total}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Status</td>
                    <td className="py-2 text-center">Cash On Delivery</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-center">
                      <Buttons
                        onClick={buttonOnClick}
                        label={"Proceed To Checkout"}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
