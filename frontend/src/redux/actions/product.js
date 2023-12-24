import axios from "axios";
import { server } from "../../server";
export const addProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });
      const response = await axios.post(`${server}/products`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "productCreateSuccess",
        payload: response.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const { data } = await axios.get(`${server}/products`);

    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/products/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/products/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};
export const addReview = (reviewData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "addReviewRequest",
      });
      const response = await axios.post(
        `${server}/products/add-reviews`,
        reviewData,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "addReviewSuccess",
        payload: response.product,
      });
    } catch (error) {
      dispatch({
        type: "addReviewFail",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
