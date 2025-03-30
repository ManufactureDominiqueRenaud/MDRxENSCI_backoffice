import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { GetUsersByIdsSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import prisma from "@/lib/prisma";

const app = new Hono()
  //*------------------*//
  //ALL GET REQUESTS API
  //*------------------*//
  //Get all users of the database
  .get("getAll", sessionMiddleware, async (c) => {
    const result = await prisma.user.findMany();
    return c.json({ data: result });
  })
  //
  //Get one user by id
  .get("getById/:userId", sessionMiddleware, async (c) => {
    const { userId } = c.req.param();
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return c.json({ data: result });
  })
  //
  //Get all users by ids
  .post(
    "getByIds",
    sessionMiddleware,
    zValidator("json", GetUsersByIdsSchema),
    async (c) => {
      const { userIds } = c.req.valid("json");
      const result = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });
      return c.json({ data: result });
    }
  );

export default app;
