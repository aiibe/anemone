import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { navigate } from "vike/client/router";

export const Logout = () => {
  const resetToken = useAuthStore((state) => state.clear);

  const handleLogout = () => {
    resetToken();
    navigate("/login");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log Out</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Log Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
