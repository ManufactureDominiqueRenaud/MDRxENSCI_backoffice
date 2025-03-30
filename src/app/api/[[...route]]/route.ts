import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import users from "@/features/users/server/route";
import votes from "@/features/votes/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/users", users)
  .route("/votes", votes)

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
