//import * as z from "zod";
import { z } from "zod";
export const PhoneAuthSchema = z.object({
    countryCode: z.string(),
    phoneNumber: z.string().trim(),
    password: z.string().min(8),
});
//# sourceMappingURL=PhoneAuthSchema.js.map