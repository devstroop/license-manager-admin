import { combineReducers } from "@reduxjs/toolkit";
import User from "./UserReducer";
import Authority from "./AuthorityReducer";
import Product from "./ProductReducer";
import License from "./LicenseReducer";
export default combineReducers({
  License,
  Product,
  Authority,
  User
});
