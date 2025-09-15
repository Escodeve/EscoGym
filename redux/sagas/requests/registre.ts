import axios from 'axios';
import { AccessLogsResponse } from '@/@Types/registre';

const BASE_URL = 'https://gym-access-worker.gym-access.workers.dev/api/v1/accessLogs';

export const getAccessLogs = async (params?: { page?: number; pageSize?: number; name?: string; checkInDate?: string }) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token manquant');

  const { data } = await axios.get<AccessLogsResponse>(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return data;
};
