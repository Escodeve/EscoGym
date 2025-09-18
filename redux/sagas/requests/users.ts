import { UsersResponse } from "@/redux/slices/users";
import { AccessLog, Membership, User } from "@/@Types/users";
import axios from "axios";

const api = axios.create({
  baseURL: "https://gym-access-worker.gym-access.workers.dev/api/v1/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch users
export async function fetchUsersApi(page: number, pageSize: number): Promise<UsersResponse> {
  const response = await api.get<UsersResponse>("/users", {
    params: { page, pageSize },
  });
  return response.data;
}

// Create a new user
export async function createUserApi(user: Partial<User>): Promise<User> {
  const response = await api.post<User>("admin/auth/register", user);
  return response.data;
}

// Edit an existing user
export async function editUserApi(id: number, user: Partial<User>): Promise<User> {
  const response = await api.patch<User>(`/users/${id}`, user);
  return response.data;
}

// Delete a user
export async function deleteUserApi(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}
export async function fetchUserByIdApi(id: number): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

// Get membership by user ID


export async function fetchUserMembershipApi(id: number): Promise<Membership> {
  const response = await api.get<Membership>(`/users/memberships/${id}`);
  return response.data;
}

// Get access logs by user ID


export async function fetchUserAccessLogsApi(id: number): Promise<AccessLog[]> {
  const response = await api.get<AccessLog[]>(`/users/accesslogs/${id}`);
  return response.data;
}
