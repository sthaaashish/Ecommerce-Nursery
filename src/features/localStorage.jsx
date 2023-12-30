
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const setCart = (carts) => {
  localStorage.setItem("carts", JSON.stringify(carts));
};
export const setWishList=(wishList)=>{
  localStorage.setItem("wishList",JSON.stringify(wishList))
}
export const clearCart = () => {
  localStorage.removeItem("carts");
};
export const clearWishList=()=>{
  localStorage.removeItem("wishList")
}
export const clearLocal = () => {
  localStorage.clear();
};
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user === null ? null : JSON.parse(user);
};
export const getCart = () => {
    const carts = localStorage.getItem('carts');
    return carts === null ? [] : JSON.parse(carts);
  }
  export const getWishList=()=>{
    const wishList=localStorage.getItem('wishList');
    return wishList===null ? []:JSON.parse(wishList)
  }