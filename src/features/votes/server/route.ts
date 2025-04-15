import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ConfirmVoteSchema, UpdateVotesSchema } from "../schemas";
import prisma from "@/lib/prisma";
import { CreateVoteSchema } from "../schemas";
import { customAlphabet } from "nanoid";
import { cors } from 'hono/cors'

const generate6DigitCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const generateToken = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  24
);

const app = new Hono()

.use('/api/*', cors({
  origin: 'http://localhost:3000', // ou 'http://localhost:3000' pour plus de sécurité
}))
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
    const { slugs } = c.req.valid("json");

    const results: {
      slug: string;
      previousScore: number;
      newScore: number;
    }[] = [];

    for (const [index, slug] of slugs.entries()) {
      const weight = 3 - index;

      const existingProject = await prisma.project.findUnique({
        where: { slug },
      });

      if (!existingProject) {
        // Si tu veux autoriser la création dynamique ici :
        const createdProject = await prisma.project.create({
          data: {
            id: slug, // slug utilisé aussi comme ID (ou génère un UUID si tu préfères)
            slug,
            projectId: Math.floor(Math.random() * 1000000), // ou une autre logique
            votes: weight,
          },
        });

        results.push({
          slug,
          previousScore: 0,
          newScore: createdProject.votes,
        });
      } else {
        const updatedVotes = existingProject.votes + weight;

        await prisma.project.update({
          where: { slug },
          data: { votes: updatedVotes },
        });

        results.push({
          slug,
          previousScore: existingProject.votes,
          newScore: updatedVotes,
        });
      }
    }

    return c.json({ data: results });
  })
  //*------------------*//
  //CREATE PENDING VOTES API
  //*------------------*//
  .post("createVote", zValidator("json", CreateVoteSchema), async (c) => {
    const { email, slugs } = c.req.valid("json");

    // Vérifie que l'utilisateur n’a pas déjà voté
    const existingVote = await prisma.vote.findUnique({
      where: { email },
    });

    if (existingVote) {
      return c.json({ error: "Cet email a déjà voté." }, 400);
    }

    // Création du vote
    const vote = await prisma.vote.create({
      data: {
        id: crypto.randomUUID(),
        email,
        code: generate6DigitCode(),
        token: generateToken(),
        projectsVoted: slugs,
      },
    });

    return c.json({ data: vote });
  })
  .post("confirmVote", zValidator("json", ConfirmVoteSchema), async (c) => {
    const { email, code } = c.req.valid("json");

    const vote = await prisma.vote.findUnique({
      where: { email },
    });

    if (!vote) {
      return c.json(
        { error: "Aucun vote lié à cet email, merci de recommencer" },
        400
      );
    }
    if (vote.code !== code) {
      return c.json({ error: "Code de confirmation invalide." }, 400);
    }
    if (vote.status === "FINISHED") {
      return c.json({ error: "Vote déjà confirmé." }, 400);
    }

    const results: {
      slug: string;
      previousScore: number;
      newScore: number;
    }[] = [];

    for (const [index, slug] of vote.projectsVoted.entries()) {
      const weight = 3 - index;

      const existingProject = await prisma.project.findUnique({
        where: { slug },
      });

      if (!existingProject) {
        // Si tu veux autoriser la création dynamique ici :
        const createdProject = await prisma.project.create({
          data: {
            id: slug, // slug utilisé aussi comme ID (ou génère un UUID si tu préfères)
            slug,
            projectId: Math.floor(Math.random() * 1000000), // ou une autre logique
            votes: weight,
          },
        });

        results.push({
          slug,
          previousScore: 0,
          newScore: createdProject.votes,
        });
      } else {
        const updatedVotes = existingProject.votes + weight;

        await prisma.project.update({
          where: { slug },
          data: { votes: updatedVotes },
        });

        results.push({
          slug,
          previousScore: existingProject.votes,
          newScore: updatedVotes,
        });
      }
    }

    // Marquer le vote comme terminé
    await prisma.vote.update({
      where: { email },
      data: { status: "FINISHED" },
    });

    return c.json({
      message: "Vote confirmé avec succès.",
      updatedProjects: results,
    });
  });

export default app;
