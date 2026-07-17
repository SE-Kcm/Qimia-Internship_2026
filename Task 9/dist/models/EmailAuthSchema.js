// import * as z from "zod";
import { z } from "zod";
export const EmailAuthSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});
//# sourceMappingURL=EmailAuthSchema.js.map