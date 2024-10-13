import { Redirect } from "wouter";
import { LoginForm } from "../components/LoginForm";

import { useAuthStore } from "@/store/auth";

export const Login = () => {
  const auth = useAuthStore((state) => state.token);

  if (auth) return <Redirect to="/" />;

  return (
    <div id="view-login" className="">
      <LoginForm />
    </div>
  );
};
