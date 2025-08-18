import { z } from "zod";
export const signUpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  username: z
    .string({ required_error: "First name is required" })
    .min(2, { message: "First name must be at least 2 characters long" }),
  phone: z
    .string({ required_error: "Phone number is required" }).min(5, { message: "Phone number must be at least 6 characters long" }),

});