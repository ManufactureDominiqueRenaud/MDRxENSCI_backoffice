import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { loginSchema, signUpSchema } from "../schemas";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { HTTPException } from "hono/http-exception";
import { avatars } from "@/data/avatars";
import supabase from "@/lib/supabase";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

async function signUpNewUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {},
  });
  return { data, error };
}
async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

const app = new Hono()
  .get("current", async (c) => {
    const session = (await cookies()).get(AUTH_COOKIE);
    if (!session) return c.json({ success: false, user: null });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(session.value);

    if (user === null || error) return c.json({ success: false, user: null });

    const userToReturn = prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    return c.json({ success: true, user: userToReturn });
  })
  // Connexion
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      console.error("Error signing up:", error.message);
      return c.json({ success: false, message: "Une erreur est survenue !" });
    }

    setCookie(c, AUTH_COOKIE, data?.session?.access_token!, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      sameSite: "strict",
    });

    return c.json({ success: true, message: "Connexion réussie !" });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, password, name } = c.req.valid("json");
    const { data, error } = await signUpNewUser(email, password);

    if (error) {
      console.error("Error signing up:", error);
      if (error.code === "user_already_exists") {
        return c.json({
          success: false,
          message: "Cet email est déjà utilisé pour un compte utilisateur !",
        });
      }
      return c.json({ success: false, message: "Une erreur est survenue !" });
    }

    const user = await prisma.user.create({
      data: {
        id: data?.user?.id || "",
        email,
        name,
        avatarUrl: avatars[Math.floor(Math.random() * avatars.length)],
      },
    });

    const { data: dataSignIn, error: errorSignIn } = await signInWithEmail(
      email,
      password
    );

    if (errorSignIn) {
      return c.json({ success: false, message: "Une erreur est survenue !" });
    }

    setCookie(c, AUTH_COOKIE, dataSignIn?.session?.access_token!, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      sameSite: "strict",
    });

    return c.json({ success: true, message: "Inscription réussie !" });
  })
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE);

    return c.json({ success: true });
  });

export default app;
