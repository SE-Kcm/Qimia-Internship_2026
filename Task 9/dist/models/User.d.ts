import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodOptional<z.ZodEmail>;
    password: z.ZodString;
    countryCode: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
//# sourceMappingURL=User.d.ts.map