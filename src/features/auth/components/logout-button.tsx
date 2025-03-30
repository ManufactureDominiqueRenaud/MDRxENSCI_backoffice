"use client";

import { Button } from "@/components/ui/button";
import { LucideLoader, LucideLogOut } from "lucide-react";
import { useLogout } from "../api/use-logout";

function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <Button variant={"outline"} disabled={isPending} onClick={handleLogout}>
      {isPending ? (
        <LucideLoader size={24} className="animate-spin" />
      ) : (
        <LucideLogOut size={24} />
      )}
    </Button>
  );
}

export default LogoutButton;
