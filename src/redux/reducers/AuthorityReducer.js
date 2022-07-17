import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const AuthorityReducer = createSlice({
  name: "Authority",
  initialState,
  reducers: {
    defaultAction: (state, { payload }) => {
      console.log("AuthorityReducer state and payload", state, payload);
    }
  }
});

const { reducer, actions } = AuthorityReducer;
export const { defaultAction } = actions;
export default reducer;
