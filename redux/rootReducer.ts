import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import offersReducer from "./slices/offers";
import registreReducer from "./slices/registre";
import usersReducer from "./slices/users";

const rootReducer = combineReducers({
  auth: authReducer,
  offers : offersReducer,
  registre:registreReducer,
  users: usersReducer,
});

export default rootReducer;
