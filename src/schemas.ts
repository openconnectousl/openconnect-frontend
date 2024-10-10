import { z } from "zod";

export const SignUpFormSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Required"),
    password: z.string().min(8, "Minimum 8 characters").max(100, "Maximum 100 characters"),
})

