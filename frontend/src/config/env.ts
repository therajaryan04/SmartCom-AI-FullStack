export const env = {
  API_BASE_URL:
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    "http://localhost:8080",
  APP_NAME: (import.meta.env.VITE_APP_NAME as string | undefined) ?? "SmartCom AI",
  APP_VERSION:
    (import.meta.env.VITE_APP_VERSION as string | undefined) ?? "1.0",
  ENABLE_AI:
    (import.meta.env.VITE_ENABLE_AI as string | undefined) !== "false",
};

export const TOKEN_STORAGE_KEY = "smartcom_token";
export const USER_STORAGE_KEY = "smartcom_user";
