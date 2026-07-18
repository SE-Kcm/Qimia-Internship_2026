// import * as z from "zod";

import { z } from "zod";

export const UserInformationSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthday: z.iso.date(),
    // email: z.email(),
    // countryCode: z.string(),
    // phoneNumber: z.string().trim(),
    country: z.string(),
    city: z.string(),
    address: z.string(),
});

export type UserInformation = z.infer<typeof UserInformationSchema>;
