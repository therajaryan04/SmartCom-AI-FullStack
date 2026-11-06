import { createFileRoute, Navigate } from "@tanstack/react-router";
import { TOKEN_STORAGE_KEY } from "@/config/env";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(TOKEN_STORAGE_KEY)
      : null;

  return <Navigate to={token ? "/dashboard" : "/login"} />;
}