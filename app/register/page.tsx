"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTheme } from "@/lib/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage(): React.ReactElement {
  const router = useRouter();
  const { register, isAuthenticated, isLoading, registerError } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  const getThemeIcon = () => {
    if (!mounted) return null;
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      );
    }
    return theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  };

  const getThemeLabel = () => {
    if (!mounted) return "System";
    if (theme === "system") return "System";
    return theme === "dark" ? "Dark" : "Light";
  };

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (registerError) {
      const errorMessage =
        registerError instanceof Error
          ? registerError.message
          : "Registration failed";
      toast.error(errorMessage);
    }
  }, [registerError]);

  async function onSubmit(values: RegisterInput): Promise<void> {
    try {
      await register(values.name, values.email, values.password);
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-12 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={`Switch to ${getThemeLabel()} mode`}
          aria-label={`Switch to ${getThemeLabel()} mode`}
          className="transition-all duration-300 active:scale-95"
        >
          {mounted ? getThemeIcon() : <Sun className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col items-center gap-3 animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-950 dark:bg-slate-50 transition-transform active:scale-95 shadow-lg">
            <svg
              className="w-10 h-10 text-white dark:text-slate-950"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">TaskFlow</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage Efficiently</p>
          </div>
        </div>
        <Card className="w-full animate-in fade-in-0 zoom-in-95 duration-500 slide-in-from-bottom-4">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-base">
            Fill in the details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in-0 duration-500">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  const error = form.formState.errors.name;
                  return (
                    <FormItem>
                      <FormLabel className="font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          type="text"
                          disabled={isLoading}
                          aria-invalid={!!error}
                          aria-describedby={error ? "name-error" : undefined}
                          className={`transition-all ${error ? "border-red-500" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="name-error" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  const error = form.formState.errors.email;
                  return (
                    <FormItem>
                      <FormLabel className="font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          disabled={isLoading}
                          aria-invalid={!!error}
                          aria-describedby={error ? "email-error" : undefined}
                          className={`transition-all ${error ? "border-red-500" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="email-error" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const error = form.formState.errors.password;
                  return (
                    <FormItem>
                      <FormLabel className="font-medium">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          disabled={isLoading}
                          aria-invalid={!!error}
                          aria-describedby={error ? "password-error" : undefined}
                          className={`transition-all ${error ? "border-red-500" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="password-error" />
                    </FormItem>
                  );
                }}
              />

              <Button
                type="submit"
                className="w-full font-medium transition-all active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white dark:border-slate-950 border-t-transparent rounded-full animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="font-semibold text-slate-950 dark:text-slate-50 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
