import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../features/Constant";
import { addOrUpdateCart, removeCart, removeWishList } from "../../features/userSlice";

const WishList = () => {
  const { wishList } = useSelector((store) => store.user);
const dispatch=useDispatch();
  return (
    <div>
      <h1 className="text-2xl mb-7 font-bold">Your wishlist Items</h1>
      {wishList.length === 0 && (
        <div>
          <h1 className="text-center">No Items to show</h1>
        </div>
      )}
      <div>
        

        <div className="grid grid-cols-3 gap-5 items-start ">
          <div className="col-span-2">
            {wishList.map((items, i) => {
              return (
                <div key={i} className="grid grid-cols-3 gap-5  mb-5 max-w-xl">
                  <img
                    className="w-full h-full"
                    src={`${baseUrl}${items.image}`}
                    alt=""
                  />

                  <div className="info flex flex-col justify-between">
                    <h1>{items.name}</h1>
                    <p>Rs.{items.price}</p>
                  </div>
                  <div className="totals flex flex-col justify-between items-end">
                    <button onClick={() => dispatch(removeWishList(i))}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={()=>dispatch(addOrUpdateCart({
                           name: items.name,
                           qty:1,
                           image: items.image,
                           price: items.price,
                           product: items.product,
                           countInStock: items.countInStock,
                    }))}>Add to cart</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
