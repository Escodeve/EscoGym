// store/usersSlice.ts
import { AccessLog, Membership, User } from "@/@Types/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersResponse {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    users: User[];
}

interface UsersState {
    loading: boolean;
    error: string | null;
    data: UsersResponse | null;
    selectedUser: User | null;
    membership: Membership | null;
    accessLogs: AccessLog[] | null;
}

const initialState: UsersState = {
    loading: false,
    error: null,
    data: null,
    selectedUser: null,
    membership: null,
    accessLogs: null,

};


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUsersRequest: (state, _action: PayloadAction<{ page: number; pageSize: number }>) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<UsersResponse>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create a new user
        createUser: (state, action) => {
            if (state.data) {
                state.data.users.push(action.payload);
                state.data.total += 1;
            }
        },

        editUserRequest: (state, _action) => {
            state.loading = true;
            state.error = null;
        },
        editUser: (state, action: PayloadAction<User>) => {
            if (state.data) {
                const index = state.data.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.data.users[index] = action.payload;
                }
            }
        },

        // Delete a user by id
        deleteUser: (state, action) => {
            if (state.data) {
                state.data.users = state.data.users.filter(user => user.id !== action.payload);
                state.data.total -= 1;
            }
        },
        fetchUserByIdRequest: (state, _action: PayloadAction<number>) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserByIdSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.selectedUser = action.payload;
        },
        fetchUserByIdFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // --- Fetch membership ---
        fetchUserMembershipRequest: (state, _action) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserMembershipSuccess: (state, action) => {
            state.loading = false;
            state.membership = action.payload;
        },
        fetchUserMembershipFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // --- Fetch access logs ---
        fetchUserAccessLogsRequest: (state, _action: PayloadAction<number>) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserAccessLogsSuccess: (state, action: PayloadAction<AccessLog[]>) => {
            state.loading = false;
            state.accessLogs = action.payload;
        },
        fetchUserAccessLogsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    createUser,
    editUser,
    editUserRequest,
    deleteUser,
    fetchUserByIdRequest,
    fetchUserByIdSuccess,
    fetchUserByIdFailure,
    fetchUserMembershipRequest,
    fetchUserMembershipSuccess,
    fetchUserMembershipFailure,
    fetchUserAccessLogsRequest,
    fetchUserAccessLogsSuccess,
    fetchUserAccessLogsFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
