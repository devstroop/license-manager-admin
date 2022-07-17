import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const LicenseReducer = createSlice({
  name: "License",
  initialState,
  reducers: {
    defaultAction: (state, { payload }) => {
      console.log("LicenseReducer state and payload", state, payload);
    }
  }
});

const { reducer, actions } = LicenseReducer;
export const { defaultAction } = actions;
export default reducer;
