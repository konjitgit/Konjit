export const addToWishlist = (data) => async (dispatch, getState) => {
  const item = getState().cart.cart.find((i) => i._id === data._id);
  if (item) {
    dispatch({
      type: "addToWishlist",
      payload: { ...item, qty: item.qty + 1 },
    });
  } else {
    dispatch({ type: "addToWishlist", payload: data });
  }
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};

export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromWishlist",
    payload: data._id,
  });
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};
