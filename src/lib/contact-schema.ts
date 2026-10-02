import { z } from "zod"

// Shared by the contact form (instant feedback) and the server action (source of truth)
export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(200, "Name is too long"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .pipe(z.email("Enter a valid email address")),
    phone: z
        .string()
        .trim()
        .min(1, "Phone is required")
        .max(40, "Phone number is too long")
        .refine(
            (v) => (v.match(/\d/g) ?? []).length >= 7,
            "Enter a valid phone number"
        ),
    message: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(5000, "Message is too long"),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput
export type ContactFieldErrors = Partial<Record<ContactField, string>>

export function getFieldErrors(error: z.ZodError<ContactInput>) {
    const { fieldErrors } = z.flattenError(error)
    const result: ContactFieldErrors = {}
    for (const field of Object.keys(fieldErrors) as ContactField[]) {
        result[field] = fieldErrors[field]?.[0]
    }
    return result
}
