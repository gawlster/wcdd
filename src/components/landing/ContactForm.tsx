"use client"

import {
    useEffect,
    useRef,
    useState,
    useTransition,
    type FormEvent,
} from "react"
import {
    faArrowRight,
    faCheck,
    faGem,
    faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { submitContact } from "@/actions/contact"
import { diamondBurst } from "@/components/motion/diamondBurst"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { SegmentedControl } from "@/components/ui/SegmentedControl"
import { Select } from "@/components/ui/Select"
import { site } from "@/content/site"
import { ContactMethod } from "@/generated/prisma/enums"
import {
    contactMethodLabels,
    contactSchema,
    getFieldErrors,
    packageOptions,
    type ContactField,
    type ContactFieldErrors,
    type ContactInput,
} from "@/lib/contact-schema"

const emptyValues: ContactInput = {
    name: "",
    email: "",
    phone: "",
    packageId: "",
    preferredContact: ContactMethod.email,
    message: "",
}

const contactMethodOptions = Object.values(ContactMethod).map((value) => ({
    value,
    label: contactMethodLabels[value],
}))

export function ContactForm() {
    const [values, setValues] = useState(emptyValues)
    const [honeypot, setHoneypot] = useState("")
    const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
    const [submitError, setSubmitError] = useState<string>()
    const [didSend, setDidSend] = useState(false)
    const [showThanks, setShowThanks] = useState(false)
    const [isPending, startTransition] = useTransition()
    const disabled = didSend || isPending
    const submitRef = useRef<HTMLButtonElement>(null)

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
            const result = await submitContact(parsed.data, honeypot)
            if (result.ok) {
                setDidSend(true)
                if (submitRef.current) diamondBurst(submitRef.current)
                setTimeout(() => setShowThanks(true), 1000)
            } else {
                setFieldErrors(result.fieldErrors ?? {})
                setSubmitError(result.error)
            }
        })
    }

    return (
        <div data-sent={showThanks || undefined} className="w-full">
            {/* Collapses to nothing once the thank-you takes over */}
            <div
                inert={showThanks}
                className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo ${showThanks ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]"}`}
            >
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className={`flex min-h-0 w-full flex-col items-center justify-center gap-8 ${showThanks ? "overflow-hidden" : ""}`}
                >
                    {/* Spam honeypot: invisible and unreachable for people; bots that fill every field trip it.
                        Named so browsers won't autofill it for a real visitor. */}
                    <div aria-hidden className="sr-only">
                        <label>
                            Leave this field blank
                            <input
                                name="leave_blank"
                                tabIndex={-1}
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                        </label>
                    </div>
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
                    <div className="flex w-full flex-col justify-center gap-6 md:flex-row">
                        <Input
                            {...fieldProps("phone")}
                            label="Phone"
                            placeholder="(555) 123-4567"
                            type="tel"
                            autoComplete="tel"
                        />
                        <SegmentedControl
                            label="Preferred contact method"
                            name="preferredContact"
                            value={values.preferredContact}
                            onChange={(preferredContact) =>
                                setValues((v) => ({ ...v, preferredContact }))
                            }
                            options={contactMethodOptions}
                            disabled={disabled}
                        />
                    </div>
                    <Select
                        {...fieldProps("packageId")}
                        label="Package"
                        placeholder="Which package are you interested in?"
                        options={packageOptions}
                    />
                    <Input
                        {...fieldProps("message")}
                        label="Message"
                        placeholder="Tell us about your vehicle and what services you're interested in..."
                        multiline
                    />
                    {submitError && <ErrorNotice>{submitError}</ErrorNotice>}
                    <Button
                        ref={submitRef}
                        type="submit"
                        disabled={disabled}
                        className="my-4 min-w-56"
                    >
                        {didSend ? (
                            <>
                                SENT
                                <FontAwesomeIcon icon={faCheck} />
                            </>
                        ) : isPending ? (
                            <>
                                SENDING
                                <span
                                    aria-hidden
                                    className="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
                                />
                            </>
                        ) : (
                            <>
                                SEND MESSAGE
                                <FontAwesomeIcon icon={faArrowRight} />
                            </>
                        )}
                    </Button>
                </form>
            </div>
            {showThanks && <ThankYou />}
        </div>
    )
}

function ThankYou() {
    const ref = useRef<HTMLDivElement>(null)

    // Move focus here (the submit button just vanished), and bring it into view once the form has
    // finished collapsing, in case that left it off-screen
    useEffect(() => {
        const card = ref.current
        if (!card) return
        card.focus({ preventScroll: true })
        const timer = setTimeout(() => {
            const { top, bottom } = card.getBoundingClientRect()
            if (top < 0 || bottom > window.innerHeight) {
                card.scrollIntoView({ block: "center" })
            }
        }, 750)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            ref={ref}
            role="status"
            tabIndex={-1}
            className="flex flex-col items-center gap-5 py-6 text-center transition-[opacity,translate] delay-150 duration-1000 ease-out-expo outline-none starting:translate-y-6 starting:opacity-0"
        >
            <span className="flex size-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-2xl text-accent shadow-[0_0_40px_-8px_var(--color-accent)]">
                <FontAwesomeIcon icon={faGem} />
            </span>
            <h3 className="font-serif type-2xl font-light">Request received</h3>
            <p className="max-w-140 type-lg font-light text-muted-light">
                Thank you for choosing {site.name}. We are very excited to work
                with you. One of our team members will reach out shortly to
                finalize an appointment.
            </p>
        </div>
    )
}

function ErrorNotice({ children }: { children: React.ReactNode }) {
    return (
        <div
            role="alert"
            className="flex gap-3 rounded-lg border border-danger bg-danger-bg px-3 py-5 text-fg"
        >
            <FontAwesomeIcon
                icon={faXmarkCircle}
                className="mt-0.5 text-danger"
            />
            <p>{children}</p>
        </div>
    )
}
