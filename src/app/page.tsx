import { ModeToggle } from "@/components/mode-toggle";
import { getCurrent } from "@/features/auth/actions";
import LogoutButton from "@/features/auth/components/logout-button";
import { AuthError } from "@supabase/supabase-js";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "GoDigital - Dashboard Administrateur",
  description: "",
};

export default async function Page() {
  const user = await getCurrent();
  if (user instanceof AuthError) return;
  if (!user) {
    redirect("/sign-in");
  }
  if (user) {
    redirect("/dashboard/votes");
  }
  return (
    <main className="p-8">
      <div className="flex items-centers gap-4 p-2">
        <ModeToggle />
        <LogoutButton />
      </div>
      <h1 className="font-bold text-xl">Dashboard, Bienvenue</h1>
    </main>
  );
}
