import { z } from "zod";

export const AuthSchema = z
    .object({
        email: z.email().optional(),
        countryCode: z.string().optional(),
        phoneNumber: z.string().trim().optional(),
        password: z.string().min(8),
    })
    .refine(
        (data) => {
            return data.email || (data.phoneNumber && data.countryCode);
        },
        {
            message: "Email or phone number is required",
        },
    );

export type AuthType = z.infer<typeof AuthSchema>;
