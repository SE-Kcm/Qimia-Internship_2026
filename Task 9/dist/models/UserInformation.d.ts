import { z } from "zod";
export declare const UserInformationSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    birthday: z.ZodISODate;
    country: z.ZodString;
    city: z.ZodString;
    address: z.ZodString;
}, z.core.$strip>;
export type UserInformation = z.infer<typeof UserInformationSchema>;
//# sourceMappingURL=UserInformation.d.ts.map