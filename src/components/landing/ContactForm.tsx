"use client"

import { useState, useTransition, type FormEvent } from "react"
import {
    faArrowRight,
    faCheckCircle,
    faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { submitContact } from "@/actions/contact"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { site } from "@/content/site"
import {
    contactSchema,
    getFieldErrors,
    type ContactField,
    type ContactFieldErrors,
    type ContactInput,
} from "@/lib/contact-schema"

const emptyValues: ContactInput = { name: "", email: "", phone: "", message: "" }

export function ContactForm() {
    const [values, setValues] = useState(emptyValues)
    const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
    const [submitError, setSubmitError] = useState<string>()
    const [didSend, setDidSend] = useState(false)
    const [isPending, startTransition] = useTransition()
    const disabled = didSend || isPending

    const fieldProps = (field: ContactField) => ({
        name: field,
        value: values[field],
        error: fieldErrors[field],
        disabled,
        onChange: (value: string) => {
            setValues((v) => ({ ...v, [field]: value }))
            setFieldErrors((e) => ({ ...e, [field]: undefined }))
        },
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitError(undefined)
        const parsed = contactSchema.safeParse(values)
        if (!parsed.success) {
            setFieldErrors(getFieldErrors(parsed.error))
            return
        }
        startTransition(async () => {
            const result = await submitContact(parsed.data)
            if (result.ok) {
                setDidSend(true)
            } else {
                setFieldErrors(result.fieldErrors ?? {})
                setSubmitError(result.error)
            }
        })
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center justify-center gap-8"
        >
            <div className="flex w-full flex-col justify-center gap-6 md:flex-row">
                <Input
                    {...fieldProps("name")}
                    label="Name"
                    placeholder="Your name"
                    autoComplete="name"
                />
                <Input
                    {...fieldProps("email")}
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                />
            </div>
            <Input
                {...fieldProps("phone")}
                label="Phone"
                placeholder="(555) 123-4567"
                type="tel"
                autoComplete="tel"
            />
            <Input
                {...fieldProps("message")}
                label="Message"
                placeholder="Tell us about your vehicle and what services you're interested in..."
                multiline
            />
            {didSend && (
                <Notice tone="success">
                    Thank you for choosing {site.name}. We are very excited to
                    work with you. Your message was sent successfully. One of
                    our team members will reach out shortly to finalize an
                    appointment.
                </Notice>
            )}
            {submitError && <Notice tone="danger">{submitError}</Notice>}
            <Button type="submit" disabled={disabled} className="my-4">
                {isPending ? "SENDING..." : "SEND MESSAGE"}
                <FontAwesomeIcon icon={faArrowRight} />
            </Button>
        </form>
    )
}

function Notice({
    tone,
    children,
}: {
    tone: "success" | "danger"
    children: React.ReactNode
}) {
    const styles = {
        success: {
            box: "border-success bg-success-bg",
            icon: "text-success",
            glyph: faCheckCircle,
            role: "status",
        },
        danger: {
            box: "border-danger bg-danger-bg",
            icon: "text-danger",
            glyph: faXmarkCircle,
            role: "alert",
        },
    }[tone]
    return (
        <div
            role={styles.role}
            className={`flex gap-3 rounded-lg border px-3 py-5 text-fg ${styles.box}`}
        >
            <FontAwesomeIcon
                icon={styles.glyph}
                className={`mt-0.5 ${styles.icon}`}
            />
            <p>{children}</p>
        </div>
    )
}
