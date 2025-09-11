import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MembershipPlan } from './types';

interface MembershipPlansState {
  plans: MembershipPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: MembershipPlansState = {
  plans: [],
  loading: false,
  error: null,
};

const membershipPlansSlice = createSlice({
  name: 'membershipPlans',
  initialState,
  reducers: {
    fetchPlansRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlansSuccess(state, action: PayloadAction<MembershipPlan[]>) {
      state.loading = false;
      state.plans = action.payload;
    },
    fetchPlansFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createPlanRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    updatePlanRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    deletePlanRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  fetchPlansRequest,
  fetchPlansSuccess,
  fetchPlansFailure,
  createPlanRequest,
  updatePlanRequest,
  deletePlanRequest,
} = membershipPlansSlice.actions;

export default membershipPlansSlice.reducer;
