// import * as z from "zod";
import { z } from "zod";
import { UserInformationSchema } from "./UserInformation.js";
export const UserSchema = z
    .object({
    id: z.number(),
    email: z.email("Geçerli bir e-posta adresi giriniz.").optional(),
    password: z.string().min(8, "Şifre en az 8 karakterden oluşmalıdır.."),
    countryCode: z.string().optional(),
    phoneNumber: z
        .string()
        .trim()
        .regex(/^[1-9][0-9]+$/)
        .min(10, "Geçerli bir telefon numarası giriniz.")
        .optional(),
    userInformation: UserInformationSchema.optional(),
})
    .refine((data) => {
    return (data.email && data.password) || (data.countryCode && data.phoneNumber && data.password);
}, {
    message: "Email or phone number is required",
});
//# sourceMappingURL=User.js.map