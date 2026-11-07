export interface User {
  id: string | number;
  username: string;
  email?: string;
  fullName?: string;
  role?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}
