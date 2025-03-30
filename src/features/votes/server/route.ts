import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UpdateVotesSchema } from "../schemas";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

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
  .post("updateVotes", zValidator("json", UpdateVotesSchema), async (c) => {
    const { projectIds } = c.req.valid("json");
    const result: {
      projectId: number;
      previousScore: number;
      newScore: number;
    }[] = [];

    for (const [index, projectId] of projectIds.entries()) {
      const projectInDB = await prisma.project.findUnique({
        where: { projectId: projectId },
      });
      console.log(`ProjectId: ${projectId}, Index: ${index}`);
      if (!projectInDB) {
        const addedInDB: Project = await prisma.project.create({
          data: {
            id: projectId.toString(),
            projectId: projectId,
            votes: 3 - index,
          },
        });
        result.push({
          projectId: projectId,
          previousScore: 0,
          newScore: addedInDB.votes,
        });
      } else {
        const previousScore = projectInDB.votes;
        const newScore = projectInDB.votes + (3 - index);
        result.push({
          projectId: projectId,
          previousScore: previousScore,
          newScore: newScore,
        });
        await prisma.project.update({
          where: { projectId: projectId },
          data: {
            votes: newScore,
          },
        });
      }
    }

    return c.json({ data: result });
  });

export default app;
