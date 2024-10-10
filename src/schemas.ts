import { z } from "zod";

export const VerificationFormSchema = z.object({
    verificationCode: z
        .string()
        .nonempty("Verification Code is Required")
        .min(26, "Verification Code must be at least 26 characters"),
});
