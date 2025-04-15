import { z } from "zod";

export const UpdateVotesSchema = z.object({
  slugs: z.array(z.string()).min(1).max(3),
});

export const CreateVoteSchema = z.object({
  email: z.string().email(),
  slugs: z.array(z.string()).min(1).max(3),
});

export const ConfirmVoteSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

