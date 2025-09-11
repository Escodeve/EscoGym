// Type for the API response
 export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  CNIE: string;
  gender: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


export interface LoginResponse {
  token: string;
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  CNIE: string;
  gender: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Type for the login payload
export interface LoginPayload {
  email: string;
  password: string;
}
