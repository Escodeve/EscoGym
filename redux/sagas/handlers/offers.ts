import { call, put } from 'redux-saga/effects';
import {
  fetchPlansRequest,
  fetchPlansSuccess,
  fetchPlansFailure,
  createPlanRequest,
  updatePlanRequest,
  deletePlanRequest,
} from '@/redux/slices/offers';
import {
  getMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
} from '@/redux/sagas/requests/offers';

export function* fetchPlansSaga() {


  try {
    const data = yield call(getMembershipPlans);
  


yield put(fetchPlansSuccess(data.membershipPlans));
  } catch (error: any) {
    yield put(fetchPlansFailure(error.message));
  }
}

export function* createPlanSaga(action: any) { 
  try {
    yield call(createMembershipPlan, action.payload);
    yield call(fetchPlansSaga); 
  } catch (error: any) {
    yield put(fetchPlansFailure(error.message));
  }
}

export function* updatePlanSaga(action: any) { 
  try {
    const { id, payload } = action.payload;
    yield call(updateMembershipPlan, id, payload);
    yield call(fetchPlansSaga);
  } catch (error: any) {
    yield put(fetchPlansFailure(error.message));
  }
}

export function* deletePlanSaga(action: any) { 
  try {
    yield call(deleteMembershipPlan, action.payload);
    yield call(fetchPlansSaga);
  } catch (error: any) {
    yield put(fetchPlansFailure(error.message));
  }
}