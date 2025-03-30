"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/features/auth/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth/api/use-login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LucideLoader } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous à votre compte pour accéder à votre dashboard client.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@email.fr"
                          type="email"
                          // disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="xxx-xxx-xxx"
                          type="password"
                          // disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center w-full">
                        <FormMessage />
                        <div className="w-full text-end">
                          <Link
                            href="/forgot-password"
                            title="J'ai oublié mon mot de passe"
                            className="text-xs text-primary hover:underline cursor-pointer">
                            Mot de passe oublié ?
                          </Link>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <LucideLoader className="size-4 mr-2 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  "Je me connecte"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator />
        <CardContent className="mt-6">
          <div className="flex justify-center gap-2 text-xs text-primary">
            <span>Pas encore de compte ?</span>
            <Link
              href="/sign-up"
              title="Je n'ai pas de compte"
              className="hover:underline cursor-pointer">
              Je commence maintenant !
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
