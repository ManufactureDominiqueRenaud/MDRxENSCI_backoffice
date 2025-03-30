import { getCurrent } from "@/features/auth/actions";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { AuthError } from "@supabase/supabase-js";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "GoDigital - S'inscrire",
  description: "",
};

export default async function Page() {
  const user = await getCurrent();
  if (user instanceof AuthError) return;
  if (user) {
    redirect("/dashboard/votes");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            title="Go Digital"
            className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center">
              <Image
                src={"/favicon/android-chrome-512x512.png"}
                alt="Logo Prysm"
                width={48}
                height={48}
              />
            </div>
            Go Digital
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block m-4 rounded-2xl overflow-hidden">
        <Image
          src="/placeholder-auth.jpeg"
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
