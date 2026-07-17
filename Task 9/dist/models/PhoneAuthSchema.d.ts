import { z } from "zod";
export declare const PhoneAuthSchema: z.ZodObject<{
    countryCode: z.ZodString;
    phoneNumber: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type PhoneAuth = z.infer<typeof PhoneAuthSchema>;
//# sourceMappingURL=PhoneAuthSchema.d.ts.map