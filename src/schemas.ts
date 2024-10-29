import { z } from "zod";

export const VerificationFormSchema = z.object({
    verificationCode: z
        .string()
        .nonempty("Verification Code is Required")
        .min(26, "Verification Code must be at least 26 characters"),
});

export const SignUpFormSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Required"),
    password: z.string().min(8, "Minimum 8 characters").max(100, "Maximum 100 characters"),
})

export const SignInFormSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    
        password: z.string()
            .min(8, "Password reuirred at least 8 characters")
            .max(100, "Password must be less than 100 characters"),
});
