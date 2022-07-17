import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const ProductReducer = createSlice({
  name: "Product",
  initialState,
  reducers: {
    defaultAction: (state, { payload }) => {
      console.log("ProductReducer state and payload", state, payload);
    }
  }
});

const { reducer, actions } = ProductReducer;
export const { defaultAction } = actions;
export default reducer;
