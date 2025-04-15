import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import users from "@/features/users/server/route";
import votes from "@/features/votes/server/route";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

const routes = app
  .use(
    "/api/*",
    cors({
      origin: "*", // ou 'http://localhost:3000' pour plus de sécurité
    })
  )
  .route("/auth", auth)
  .route("/users", users)
  .route("/votes", votes);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
