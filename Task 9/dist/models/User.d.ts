import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodOptional<z.ZodEmail>;
    password: z.ZodString;
    countryCode: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    userInformation: z.ZodOptional<z.ZodObject<{
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        birthday: z.ZodISODate;
        country: z.ZodString;
        city: z.ZodString;
        address: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
//# sourceMappingURL=User.d.ts.map