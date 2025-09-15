import axios from 'axios';
import { MembershipPlanCreate, MembershipPlanUpdate } from '@/@Types/offers';

const BASE_URL = 'https://gym-access-worker.gym-access.workers.dev/api/v1/membershipplans';

export const getMembershipPlans = async () => {
  const token = localStorage.getItem("token");
  console.log("📌 Token lu depuis localStorage:", token);

  const { data } = await axios.get(
    "https://gym-access-worker.gym-access.workers.dev/api/v1/membershipplans",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};



export const createMembershipPlan = async (payload: MembershipPlanCreate) => {
  const token = localStorage.getItem("token");
  console.log("📌 Token lu depuis localStorage:", token);

  if (!token) {
    throw new Error("Token manquant, veuillez vous reconnecter");
  }

  const { data } = await axios.post(BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const updateMembershipPlan = async (id: number, payload: MembershipPlanUpdate) => {
  const token = localStorage.getItem("token");
  console.log("📌 Token lu depuis localStorage:", token);

  if (!token) throw new Error("Token manquant, veuillez vous reconnecter");

  const { data } = await axios.put(`${BASE_URL}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

// Supprimer un plan
export const deleteMembershipPlan = async (id: number) => {
  const token = localStorage.getItem("token");
  console.log("📌 Token lu depuis localStorage:", token);

  if (!token) throw new Error("Token manquant, veuillez vous reconnecter");

  const { data } = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
