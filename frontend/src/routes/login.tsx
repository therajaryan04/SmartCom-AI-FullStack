import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { normalizeApiError } from "@/api/errors";

const schema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — SmartCom AI" },
      { name: "description", content: "Sign in to SmartCom AI to access retail analytics and AI forecasting." },
    ],
  }),
});

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/dashboard", replace: true });
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await login(values);
      toast.success("Welcome back");
      await router.invalidate();
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      const norm = normalizeApiError(err);
      toast.error(norm.message || "Sign-in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-150 -translate-x-1/2 rounded-full bg-ocean-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-ocean-highlight/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md border border-border bg-surface/60 p-8 backdrop-blur-md"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-sm bg-ocean-highlight font-mono text-lg font-bold text-ocean-deep">
            S
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              SmartCom AI · Terminal
            </p>
            <h1 className="text-lg font-bold tracking-tight">Sign in</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              email
            </label>
            <input
              id="email"
              type="text"
              autoComplete="email"
              autoFocus
              {...register("email")}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:border-ocean-highlight/60 focus:outline-none focus:ring-1 focus:ring-ocean-highlight/30"
            />
            {errors.email && (
              <p className="mt-1 font-mono text-[10px] text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:border-ocean-highlight/60 focus:outline-none focus:ring-1 focus:ring-ocean-highlight/30"
            />
            {errors.password && (
              <p className="mt-1 font-mono text-[10px] text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 bg-ocean-highlight py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-ocean-deep transition-colors hover:brightness-110 disabled:opacity-60"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {submitting ? "Authenticating…" : "Enter Terminal"}
          </button>
        </form>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Secured by Spring Boot · JWT
        </p>
      </motion.div>
    </div>
  );
}
