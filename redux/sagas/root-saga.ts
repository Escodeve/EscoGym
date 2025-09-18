import { takeLatest } from "redux-saga/effects";
import { loginRequest } from "../slices/auth";
import { handleLogin } from "./handlers/auth";
import { createPlanRequest,
  updatePlanRequest,
  deletePlanRequest,fetchPlansRequest} from "../slices/offers";
  import { 
    createPlanSaga,
    updatePlanSaga,
    deletePlanSaga,
    fetchPlansSaga
  } from "./handlers/offers";
  // Access Logs
import { fetchLogsRequest } from "../slices/registre";
import { fetchLogsSaga } from "./handlers/registre";
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
  yield takeLatest(loginRequest.type, handleLogin);
   // Offers
   yield takeLatest(fetchPlansRequest.type, fetchPlansSaga);
   yield takeLatest(createPlanRequest.type, createPlanSaga);
   yield takeLatest(updatePlanRequest.type, updatePlanSaga);
   yield takeLatest(deletePlanRequest.type, deletePlanSaga);
 
   // Access Logs
   yield takeLatest(fetchLogsRequest.type, fetchLogsSaga);

    // Users
  yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
  yield takeLatest(createUser.type, handleCreateUser);
  yield takeLatest(editUserRequest.type, handleEditUser);

  yield takeLatest(deleteUser.type, handleDeleteUser);
  yield takeLatest(fetchUserByIdRequest.type, handleFetchUserById);
  yield takeLatest(fetchUserMembershipRequest.type, handleFetchUserMembership);
  yield takeLatest(fetchUserAccessLogsRequest.type, handleFetchUserAccessLogs);
}
