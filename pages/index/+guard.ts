import { useAuthStore } from "@/store/auth";
import { redirect } from "vike/abort";

import type { PageContext } from "vike/types";

export async function guard(_pageContext: PageContext) {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw redirect("/login");
  }
}
