import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessLog } from '@/@Types/registre';

interface AccessLogsState {
  logs: AccessLog[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: AccessLogsState = {
  logs: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
};

const accessLogsSlice = createSlice({
  name: 'accessLogs',
  initialState,
  reducers: {
    fetchLogsRequest(state, action: PayloadAction<{ page?: number; pageSize?: number; name?: string; checkInDate?: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchLogsSuccess(state, action: PayloadAction<{ logs: AccessLog[]; total: number; page: number; pageSize: number }>) {
      state.loading = false;
      state.logs = action.payload.logs;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    fetchLogsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { fetchLogsRequest, fetchLogsSuccess, fetchLogsFailure, setPage, setPageSize } = accessLogsSlice.actions;
export default accessLogsSlice.reducer;
