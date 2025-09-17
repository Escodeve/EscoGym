import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import usersReducer from "./slices/users";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
