import { useAuthStore } from "@/store/auth";
import { PropsWithChildren } from "react";
import { Redirect } from "wouter";

export const AuthRoutes = (props: PropsWithChildren) => {
  const { children } = props;

  const auth = useAuthStore((state) => state.token);

  if (auth) return children;

  return <Redirect to="/login" />;
};
