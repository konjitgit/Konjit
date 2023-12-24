import axios from "axios";
import { server } from "../../server";
export const getAllRequests = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllVerificationRequests",
    });
    const { data } = await axios.get(`${server}/shop/get-all-requests`, {
      withCredentials: true,
    });
    console.log(data.requests)
    dispatch({
      type: "getAllVerificationSuccess",
      payload: data.requests,
    });
  } catch (error) {
    dispatch({
      type: "getAllVerificationFail",
      payload: error.response.data.message,
    });
  }
};
