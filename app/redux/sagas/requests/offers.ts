import axios from 'axios';
import { MembershipPlanCreate, MembershipPlanUpdate } from './types';

const BASE_URL = 'https://gym-access-worker.gym-access.workers.dev/api/v1/membershipplans';

export const getMembershipPlans = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const createMembershipPlan = async (payload: MembershipPlanCreate) => {
  const { data } = await axios.post(BASE_URL, payload);
  return data;
};

export const updateMembershipPlan = async (id: number, payload: MembershipPlanUpdate) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, payload);
  return data;
};

export const deleteMembershipPlan = async (id: number) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};
