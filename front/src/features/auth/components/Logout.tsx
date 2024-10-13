import { useLocation } from "wouter";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/auth";

export const Logout = () => {
  const [, navigate] = useLocation();
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
