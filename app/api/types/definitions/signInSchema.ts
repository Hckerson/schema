import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string(),
});
