import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import users from "@/features/users/server/route";
import votes from "@/features/votes/server/route";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

const routes = app
  .use(
    "*",
    cors({
      origin: (origin) => {
        return [
          "http://localhost:3000",
          "http://localhost:3001",
          "https://mdr-x-ensci-front-ix813qo0t.vercel.app",
          "ensci.dominiquerenaud.com",
          "https://mdr-x-ensci-front-manufacture-dominique-renauds-projects.vercel.app/fr",
        ].includes(origin ?? "")
          ? origin
          : "";
      },
      allowMethods: ["POST", "GET", "OPTIONS"],
      allowHeaders: ["Content-Type"],
    })
  )
  .route("/auth", auth)
  .route("/users", users)
  .route("/votes", votes);

export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);

export type AppType = typeof routes;
