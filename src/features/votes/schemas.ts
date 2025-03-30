import { z } from "zod";

export const GetUsersByIdsSchema = z.object({
  userIds: z.array(z.string()),
});
