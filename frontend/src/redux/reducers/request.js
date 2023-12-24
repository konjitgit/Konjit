import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  isLoading: true,
};

export const requestReducer = createReducer(initialState, {
  getAllVerificationRequests: (state) => {
    state.isLoading = true;
  },
  getAllVerificationSuccess: (state, action) => {
    // state.isSeller = true;
    state.isLoading = false;
    state.requests = action.payload;
  },
  getAllVerificationFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    // state.isSeller = false;
  },
});
