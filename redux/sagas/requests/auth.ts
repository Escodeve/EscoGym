import { LoginResponse } from "@/@Types/auth";
import axios from "axios";

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(
    "https://gym-access-worker.gym-access.workers.dev/api/v1/auth/login",
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );

  // ✅ Sauvegarde du token dans localStorage
  // Vérifie le nom exact de la clé dans la réponse (data.token ou data.accessToken ?)
  if (data && (data as any).token) {
    localStorage.setItem("token", (data as any).token);
  } else if (data && (data as any).accessToken) {
    localStorage.setItem("token", (data as any).accessToken);
  }

  console.log("✅ Token stocké :", localStorage.getItem("token"));

  return data;
};
