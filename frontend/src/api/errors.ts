import type { AxiosError } from "axios";

export interface ApiErrorShape {
  message: string;
  status?: number;
  code?: string;
}

export function normalizeApiError(err: unknown): ApiErrorShape {
  const ax = err as AxiosError<{ message?: string; error?: string }>;
  if (ax?.isAxiosError) {
    const status = ax.response?.status;
    const data = ax.response?.data;
    const message =
      data?.message ||
      data?.error ||
      ax.message ||
      "Unexpected network error";
    return { message, status, code: ax.code };
  }
  if (err instanceof Error) return { message: err.message };
  return { message: "Unknown error" };
}
