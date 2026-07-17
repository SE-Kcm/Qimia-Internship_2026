//import * as z from "zod";
import { z } from "zod";

export const PhoneAuthSchema = z.object({
    countryCode: z.string(),
    phoneNumber: z.string().trim(),
    password: z.string().min(8),
});

export type PhoneAuth = z.infer<typeof PhoneAuthSchema>;
