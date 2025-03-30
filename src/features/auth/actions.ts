"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./constants";
import supabase from "@/lib/supabase";
import prisma from "@/lib/prisma";

export const getCurrent = async () => {
  const session = (await cookies()).get(AUTH_COOKIE);

  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(session.value);

  if (user === null) return null;
  if (error) return error;

  const userToReturn = prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  return userToReturn;
};
