import { call, put } from 'redux-saga/effects';
import { fetchLogsRequest, fetchLogsSuccess, fetchLogsFailure } from '@/redux/slices/registre';
import { getAccessLogs } from '@/redux/sagas/requests/registre';

export function* fetchLogsSaga(action: any) {
  try {
    console.log('📌 fetchLogsSaga payload:', action.payload);
    yield put(fetchLogsRequest(action.payload));

    const data = yield call(getAccessLogs, action.payload);
    console.log('✅ Logs reçus:', data);

    yield put(fetchLogsSuccess({
      logs: data.logs,
      total: data.total,
      page: data.page,
      pageSize: data.pageSize,
    }));
  } catch (error: any) {
    console.error('❌ Erreur fetchLogsSaga:', error);
    yield put(fetchLogsFailure(error.message));
  }
}
