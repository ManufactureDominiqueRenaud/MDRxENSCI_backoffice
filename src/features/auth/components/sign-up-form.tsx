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
import { signUpSchema } from "@/features/auth/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/features/auth/api/use-register";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LucideLoader } from "lucide-react";
import PasswordSecurityTest from "./password-security-test";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    mutate(values);
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Inscription</CardTitle>
          <CardDescription className="text-center">
            Inscrivez-vous à votre compte pour accéder à votre dashboard client.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom & Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          disabled={isPending}
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
                        <div>
                          <Input
                            placeholder="xxx-xxx-xxx"
                            type="password"
                            disabled={isPending}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div>
                        <div className="flex justify-between items-center w-full mb-2">
                          <FormMessage />
                        </div>
                        <PasswordSecurityTest password={field.value} />
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
                  "Je m'inscris"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator />
        <CardContent className="mt-6">
          <div className="flex justify-center gap-2 text-xs text-primary">
            <span>Déjà membre ?</span>
            <Link
              href="/sign-in"
              title="Je n'ai pas de compte"
              className="hover:underline cursor-pointer">
              Je me connecte maintenant !
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
