import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  mobile: z
    .string()
    .min(11, { message: "Mobile must be 11 digit" })
    .max(11, { message: "Mobile must be 11 digit" })
    .trim(),
  password: z
    .string()
    .min(5, { message: "Be at least 5 characters long" })
    .trim(),
});

export const LoginFormSchema = z.object({
  mobile: z.string().min(1, { message: "Mobile is required" }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
