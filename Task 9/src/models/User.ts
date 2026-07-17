// import * as z from "zod";

import { z } from "zod";

export const UserSchema = z
    .object({
        id: z.number(),
        email: z.email().optional(),
        password: z.string().min(8),
        countryCode: z.string().optional(),
        phoneNumber: z.string().trim().optional(),
    })
    .refine(
        (data) => {
            return (data.email && data.password) || (data.countryCode && data.phoneNumber && data.password);
        },
        {
            message: "Email or phone number is required",
        },
    );

export type User = z.infer<typeof UserSchema>;
