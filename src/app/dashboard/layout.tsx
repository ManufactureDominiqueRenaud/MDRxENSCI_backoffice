import { AppSidebar } from "@/components/sidebar/user/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrent } from "@/features/auth/actions";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrent();
  if (user instanceof AuthError) return;
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="flex h-screen w-full">
      <nav>
        <SidebarProvider>
          <AppSidebar user={user} />
        </SidebarProvider>
      </nav>
      <aside>{children}</aside>
    </main>
  );
}
