import React from "react";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/store/auth";
import { login } from "@/services/auth";

export const LoginForm = () => {
  const [, setLocation] = useLocation();

  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const resetToken = useAuthStore((state) => state.clear);

  const [logging, setLogging] = React.useState(true);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const ensureLogin = React.useCallback(
    async (username: string, password: string) => {
      setErrorMessage(null);

      if (!username || !password) {
        setErrorMessage("Please enter a username and password.");
      } else {
        const success = await login(username, password);
        if (success) {
          setToken(username, password);
          setLocation("/");
        } else {
          resetToken();
        }
      }
    },
    [resetToken, setLocation, setToken]
  );

  /**
   * Re-log the user if the token is in local storage
   */
  React.useEffect(() => {
    const checkLogin = async () => {
      if (token) {
        try {
          const [username, password] = atob(token).split(":");
          await ensureLogin(username, password);
        } catch (error) {
          console.error("Login failed:", error);
          resetToken();
        }
      }
      setLogging(false);
    };

    checkLogin();
  }, [ensureLogin, resetToken, token]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage(null);
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    await ensureLogin(username, password);
  };

  if (logging) return <p>Loading...</p>;

  if (token) return null;

  return (
    <form
      className="bg-white p-6 rounded shadow-md w-80 mx-auto"
      onSubmit={handleLogin}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div className="mb-4">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          className="mt-1"
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          className="mt-1"
          placeholder="Enter your password"
        />
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};
