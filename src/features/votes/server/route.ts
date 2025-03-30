import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UpdateVotesSchema } from "../schemas";
import prisma from "@/lib/prisma";

const app = new Hono()
  //*------------------*//
  //ALL GET REQUESTS API
  //*------------------*//
  //Get all users of the database
  .get("getAll", async (c) => {
    const result = await prisma.project.findMany();
    return c.json({ data: result });
  })
  //
  //Get one user by id
  .get("getById/:projectId", async (c) => {
    const { projectId } = c.req.param();
    const result = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    return c.json({ data: result });
  })
  //*------------------*//
  //UPDATE REQUESTS API
  //*------------------*//
  //Update Votes
  .post(
    "updateVotes",
    zValidator("json", UpdateVotesSchema),
    async (c) => {
      const { projectIds } = c.req.valid("json");
      projectIds.forEach(async (projectId: number, index: number) => {
        const projectInDB = await prisma.project.findUnique({
          where: { projectId: projectId },
        });
        if (!projectInDB) {
          await prisma.project.create({
            data: {
              id: projectId.toString(),
              projectId: projectId,
              votes: 3 - index,
            },
          });
        } else {
          await prisma.project.update({
            where: { projectId: projectId },
            data: {
              votes: projectInDB.votes +  (3 - index),
            },
          });
        }
      })


      console.log("projectIds", projectIds);
      const result = ["1"]
      return c.json({ data: result });
    }
  );

export default app;
