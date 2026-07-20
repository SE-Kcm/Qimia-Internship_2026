import { z } from "zod";
export const AuthSchema = z
    .object({
    email: z.email("Geçerli bir e-posta adresi giriniz.").optional(),
    countryCode: z.string().optional(),
    phoneNumber: z
        .string()
        .trim()
        .regex(/^[1-9][0-9]+$/)
        .min(10, "Geçerli bir telefon numarası giriniz.")
        .optional(),
    password: z.string().min(8, "Şifre en az 8 karakterden oluşmalıdır."),
})
    .refine((data) => {
    return data.email || (data.phoneNumber && data.countryCode);
}, {
    message: "Email or phone number is required",
});
//# sourceMappingURL=AuthSchema.js.map