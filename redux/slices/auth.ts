import { UserAdmin } from "@/@Types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  user: UserAdmin | null;
  token: string | null;
  error: string | null;
  users: UserAdmin[];
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginRequest: (state, _action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      const { token, ...userData } = action.payload;
      state.user = userData;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.users = [];
    },

    // ✅ New: Get Users
    getUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} = authSlice.actions;

export default authSlice.reducer;
