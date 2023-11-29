export interface loginRequest {
  email: string | null;
  password: string | null;
}

export interface loginData {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  token?: string;
  role?: string;
}
