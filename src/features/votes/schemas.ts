import { z } from "zod";

export const UpdateVotesSchema = z.object({
  projectIds: z.array(z.number()).length(3),
});
