import { takeLatest } from "redux-saga/effects";
import { loginRequest } from "../slices/auth";
import { handleLogin } from "./handlers/auth";

import {
  fetchUsersRequest,
  createUser,
  editUser,
  deleteUser,
  fetchUserByIdRequest,
  fetchUserMembershipRequest,
  fetchUserAccessLogsRequest,
  editUserRequest,
} from "../slices/users";

import {
  handleFetchUsers,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  handleFetchUserById,
  handleFetchUserMembership,
  handleFetchUserAccessLogs,
} from "./handlers/users";

export function* rootSaga() {
  // Login
  yield takeLatest(loginRequest.type, handleLogin);

  // Users
  yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
  yield takeLatest(createUser.type, handleCreateUser);
  yield takeLatest(editUserRequest.type, handleEditUser);

  yield takeLatest(deleteUser.type, handleDeleteUser);
  yield takeLatest(fetchUserByIdRequest.type, handleFetchUserById);
  yield takeLatest(fetchUserMembershipRequest.type, handleFetchUserMembership);
  yield takeLatest(fetchUserAccessLogsRequest.type, handleFetchUserAccessLogs);
}
