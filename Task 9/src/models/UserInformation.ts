// import * as z from "zod";

import { z } from "zod";

export const UserInformationSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthday: z.iso.date(),
    email: z.email(),
    password: z.string(),
    countryCode: z.string(),
    phoneNumber: z.string().trim(),
    country: z.string(),
    address: z.string(),
});

type UserInformation = z.infer<typeof UserInformationSchema>;
