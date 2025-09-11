import { takeLatest } from "redux-saga/effects";
import { loginRequest } from "../slices/auth";
import { handleLogin } from "./handlers/auth";

export function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
