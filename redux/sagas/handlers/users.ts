import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    fetchUsersApi,
    createUserApi,
    editUserApi,
    deleteUserApi,
    fetchUserByIdApi,
    fetchUserMembershipApi,
    fetchUserAccessLogsApi,
} from "../requests/users";
import {
    fetchUsersFailure,
    fetchUsersSuccess,
    createUser,
    editUser,
    deleteUser,
    UsersResponse,
    fetchUserByIdSuccess,
    fetchUserByIdFailure,
    fetchUserMembershipSuccess,
    fetchUserMembershipFailure,
    fetchUserAccessLogsSuccess,
    fetchUserAccessLogsFailure,
} from "@/redux/slices/users";
import { AccessLog, Membership, User } from "@/@Types/users";
import { toast } from "react-toastify";

// Fetch users
export function* handleFetchUsers(
    action: PayloadAction<{ page: number; pageSize: number }>
): Generator<unknown, void, UsersResponse> {
    try {
        const { page, pageSize } = action.payload;
        const data: UsersResponse = yield call(fetchUsersApi, page, pageSize);
        yield put(fetchUsersSuccess(data));
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUsersFailure(message));
    }
}

// Create user
export function* handleCreateUser(
    action: PayloadAction<Partial<User>>
): Generator<unknown, void, User> {
    try {
        const newUser: User = yield call(createUserApi, action.payload);
        yield put(createUser(newUser));
        toast.success("Utilisateur créé avec succès !");
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUsersFailure(message));
    }
}

// Edit user
export function* handleEditUser(
    action: PayloadAction<{ id: number; data: Partial<User> }>
): Generator<unknown, void, User> {
    try {
        const updatedUser: User = yield call(editUserApi, action.payload.id, action.payload.data);
        yield put(editUser(updatedUser)); 
        toast.success('Utilisateur mis à jour avec succès !');
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUsersFailure(message));
        toast.error(message);
    }
}

// Delete user
export function* handleDeleteUser(
    action: PayloadAction<number>
): Generator<unknown, void, void> {
    try {
        yield call(deleteUserApi, action.payload);
        yield put(deleteUser(action.payload));
        toast.success("Utilisateur supprimé avec succès !");
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUsersFailure(message));
    }
}
export function* handleFetchUserById(
    action: PayloadAction<number>
): Generator<unknown, void, User> {
    try {
        const user: User = yield call(fetchUserByIdApi, action.payload);
        yield put(fetchUserByIdSuccess(user));
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUserByIdFailure(message));
    }
}

// ========================
// Fetch membership by user ID
// ========================
export function* handleFetchUserMembership(
    action: PayloadAction<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Generator<unknown, void, any> {
    try {
        const response = yield call(fetchUserMembershipApi, action.payload);
        // response has { page, pageSize, totalPages, totalCount, memberships: Membership[] }
        const membership: Membership | null = response.memberships[0] || null;
        yield put(fetchUserMembershipSuccess(membership));
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUserMembershipFailure(message));
    }
}

// ========================
// Fetch access logs by user ID
// ========================
export function* handleFetchUserAccessLogs(
    action: PayloadAction<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Generator<unknown, void, any> {
    try {
        const response = yield call(fetchUserAccessLogsApi, action.payload);
        const logs: AccessLog[] = response.accessLogs || [];
        yield put(fetchUserAccessLogsSuccess(logs));
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        yield put(fetchUserAccessLogsFailure(message));
    }
}