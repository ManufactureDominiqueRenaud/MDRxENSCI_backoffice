import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ConfirmVoteSchema, DeleteVoteSchema, UpdateVotesSchema } from "../schemas";
import prisma from "@/lib/prisma";
import { CreateVoteSchema } from "../schemas";
import { customAlphabet } from "nanoid";
import { Resend } from "resend";
import { SendCodeEmailEN, SendCodeEmailFR } from "@/emails/send-code";

const generate6DigitCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const generateToken = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  24
);

const resend = new Resend("re_j3JRyDbz_3Q4fJheg6G4TLNpcTXBKRHWw");
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
    const { email, slugs, images, locale } = c.req.valid("json");

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

    try {
      if (locale === "fr") {
        await resend.emails.send({
          from: "MDR x ENSCi <noreply@ensci.dominiquerenaud.com>",
          to: [vote.email],
          subject: `[Code : ${vote.code}] | Confirmez votre vote MDRxESNCi !`,
          react: SendCodeEmailFR({
            validationCode: vote.code,
            email: vote.email,
            imageProject1: images[0]
              ? images[0]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject2: images[1]
              ? images[1]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject3: images[2]
              ? images[2]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
          }),
        });
      } else {
        await resend.emails.send({
          from: "MDR x ENSCi <noreply@ensci.dominiquerenaud.com>",
          to: [vote.email],
          subject: `[Code : ${vote.code}] | Confirm your vote MDRxESNCi !`,
          react: SendCodeEmailEN({
            validationCode: vote.code,
            email: vote.email,
            imageProject1: images[0]
              ? images[0]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject2: images[1]
              ? images[1]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject3: images[2]
              ? images[2]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
          }),
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

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
  })
  //*------------------*//
  //DELETE PENDING VOTE API
  //*------------------*//
  .post("deleteVote", zValidator("json", DeleteVoteSchema), async (c) => {
    const { email } = c.req.valid("json");

    const vote = await prisma.vote.findUnique({
      where: { email },
    });

    if (!vote) {
      return c.json(
        { error: "Aucun vote lié à cet email, merci de recommencer" },
        400
      );
    }

    await prisma.vote.delete({
      where: { email },
    });

    return c.json({ message: "Vote supprimé avec succès." });
  })
  .post("resendCode", zValidator("json", CreateVoteSchema), async (c) => {
    const { email, images, locale } = c.req.valid("json");

    const vote = await prisma.vote.findUnique({
      where: { email },
    });
    if (!vote) {
      return c.json(
        { error: "Aucun vote lié à cet email, merci de recommencer" },
        400
      );
    }

    try {
      if (locale === "fr") {
        await resend.emails.send({
          from: "MDR x ENSCi <noreply@ensci.dominiquerenaud.com>",
          to: [vote.email],
          subject: `[Code : ${vote.code}] | Confirmez votre vote MDRxESNCi !`,
          react: SendCodeEmailFR({
            validationCode: vote.code,
            email: vote.email,
            imageProject1: images[0]
              ? images[0]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject2: images[1]
              ? images[1]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject3: images[2]
              ? images[2]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
          }),
        });
      } else {
        await resend.emails.send({
          from: "MDR x ENSCi <noreply@ensci.dominiquerenaud.com>",
          to: [vote.email],
          subject: `[Code : ${vote.code}] | Confirm your vote MDRxESNCi !`,
          react: SendCodeEmailEN({
            validationCode: vote.code,
            email: vote.email,
            imageProject1: images[0]
              ? images[0]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject2: images[1]
              ? images[1]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
            imageProject3: images[2]
              ? images[2]
              : "https://ensci.dominiquerenaud.com/_next/image?url=https%3A%2F%2Ftekpzijxcpujrulsvtci.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsupabase%2Ffiles%2F2025_PO_040.jpg-4d5fabfdfe2385ee0c966235d1128868.jpg&w=1920&q=75",
          }),
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return c.json({ data: vote });
  });


export default app;
