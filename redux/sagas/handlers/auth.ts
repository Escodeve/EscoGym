import { call, put } from "redux-saga/effects";
import { loginApi } from "../requests/auth";
import { loginRequest, loginSuccess, loginFailure } from "../../slices/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "@/@Types/auth";

// Type for the login payload
interface LoginPayload {
  email: string;
  password: string;
}

export function* handleLogin(
  action: PayloadAction<LoginPayload>
): Generator<unknown, void, LoginResponse> {
  try {
    const { email, password } = action.payload;

    // Call the API
    const data: LoginResponse = yield call(loginApi, email, password);

     localStorage.setItem("token", data.token);

    // Dispatch loginSuccess with the whole data object
    yield put(loginSuccess(data));
    
  } catch (error: unknown) {
    // Ensure we pass a string message to loginFailure
    yield put(loginFailure(error instanceof Error ? error.message : "Unknown error"));
  }
}
