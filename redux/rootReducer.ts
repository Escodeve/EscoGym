import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import offersReducer from "./slices/offers";
import registreReducer from "./slices/registre";

const rootReducer = combineReducers({
  auth: authReducer,
  offers : offersReducer,
  registre:registreReducer,
});

export default rootReducer;
