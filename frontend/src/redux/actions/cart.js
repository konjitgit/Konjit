export const addToCart = (data) => async (dispatch, getState) => {
 const item = getState().cart.cart.find((i) => i._id === data._id);  
 if (item) {
   dispatch({ 
    type: "addToCart",
     payload: {...item, qty: item.qty + 1 }, 
    });
   } else {
      dispatch({ type: "addToCart", payload: data, });
     }
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
       return data; };

export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
