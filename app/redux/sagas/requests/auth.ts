import { LoginResponse } from "@/app/@Types/auth";
import axios from "axios";




export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  
    const { data } = await axios.post<LoginResponse>(
      "https://gym-access-worker.gym-access.workers.dev/api/v1/auth/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    return data; 

};
