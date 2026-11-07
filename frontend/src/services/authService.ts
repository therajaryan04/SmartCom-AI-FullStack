import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { LoginRequest, LoginResponse, User } from "@/types/Auth";

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>(
      endpoints.auth.login,
      payload,
    );
    return data;
  },
  async me(): Promise<User> {
    const { data } = await apiClient.get<User>(endpoints.auth.me);
    return data;
  },
};
