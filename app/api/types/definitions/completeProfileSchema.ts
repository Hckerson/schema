import { z } from "zod";

export const completeProfileSchema = z.object({
  bio: z.string().optional(),
  emails: z.array(
    z.string({ required_error: 'Email is required' })
      .email({ message: "Invalid email address" })
  ).min(1, { message: "At least one email is required" }),
  name: z.string({ required_error: 'Name is required' })
    .min(3, { message: "Name should be at least 3 characters" }),
  phone: z.string().optional(),
});
