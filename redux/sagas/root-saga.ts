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

export function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
   // Offers
   yield takeLatest(fetchPlansRequest.type, fetchPlansSaga);
   yield takeLatest(createPlanRequest.type, createPlanSaga);
   yield takeLatest(updatePlanRequest.type, updatePlanSaga);
   yield takeLatest(deletePlanRequest.type, deletePlanSaga);
 
   // Access Logs
   yield takeLatest(fetchLogsRequest.type, fetchLogsSaga);
}
