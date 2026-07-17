import { z } from "zod";
export declare const EmailAuthSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type EmailAuth = z.infer<typeof EmailAuthSchema>;
//# sourceMappingURL=EmailAuthSchema.d.ts.map