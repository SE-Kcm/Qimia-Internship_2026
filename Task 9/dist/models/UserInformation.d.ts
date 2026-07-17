import { z } from "zod";
export declare const UserInformationSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    birthday: z.ZodISODate;
    email: z.ZodEmail;
    password: z.ZodString;
    countryCode: z.ZodString;
    phoneNumber: z.ZodString;
    country: z.ZodString;
    address: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=UserInformation.d.ts.map