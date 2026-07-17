import { z } from "zod";
export declare const AuthSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodEmail>;
    countryCode: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, z.core.$strip>;
export type AuthType = z.infer<typeof AuthSchema>;
//# sourceMappingURL=AuthSchema.d.ts.map