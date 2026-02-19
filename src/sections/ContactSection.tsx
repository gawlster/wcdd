import { useScroll } from "@/contexts/ScrollContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Button } from "@/shared-components/Button"
import { Text } from "@/shared-components/Text"
import {
    faArrowRight,
    faCheckCircle,
    faExclamationCircle,
    faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"

type InputState = {
    fieldName: string
    value: string
    error: string | undefined
    disabled: boolean
}
const getDefaultInputState = (fieldName: string) => {
    return {
        fieldName,
        value: "",
        error: undefined,
        disabled: false,
    } as InputState
}

const defaultSubmissionError =
    "Something went wrong. Try again later or contact us for assistance."
export function ContactSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { register } = useScroll()
    useEffect(() => {
        register("contact", ref)
    }, [register])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSendMessage, setDidSendMessage] = useState(false)
    const [name, setName] = useState(getDefaultInputState("Name"))
    const [email, setEmail] = useState(getDefaultInputState("Email"))
    const [phone, setPhone] = useState(getDefaultInputState("Phone"))
    const [message, setMessage] = useState(getDefaultInputState("Message"))
    const [submissionError, setSubmissionError] = useState("")
    const handleInputChange = useCallback(
        (setter: Dispatch<SetStateAction<InputState>>) => (t: string) => {
            setter((v) => ({ ...v, value: t, error: undefined }))
        },
        []
    )
    const handleFormSubmit = useCallback(async () => {
        setIsSubmitting(true)
        let hasError = false
        const states = [
            [name, setName],
            [email, setEmail],
            [phone, setPhone],
            [message, setMessage],
        ] as const
        for (const [val, setVal] of states) {
            if (val.error) {
                hasError = true
            }
            if (!val.value) {
                setVal((v) => ({ ...v, error: `${val.fieldName} is required` }))
                hasError = true
            }
            // ...other validation checks
        }
        if (hasError) {
            setIsSubmitting(false)
            return
        }
        try {
            const res = await fetch("/api/submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    states.reduce((acc, [val]) => {
                        acc[val.fieldName.toLowerCase()] = val.value
                        return acc
                    }, {} as Record<string, string>)
                ),
            })
            if (!res.ok) throw new Error()
        } catch {
            setSubmissionError(defaultSubmissionError)
            setIsSubmitting(false)
            return
        }
        for (const setter of [setName, setEmail, setPhone, setMessage]) {
            setter((v) => ({ ...v, disabled: true }))
        }
        setDidSendMessage(true)
    }, [email, message, name, phone])
    const isMobile = useIsMobile()
    return (
        <div
            ref={ref}
            style={{
                paddingBlock: "100px",
                backgroundColor: "var(--color-brand-gray-light)",
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: "24px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <div
                    style={{
                        width: isMobile ? "36px" : "48px",
                        height: "1px",
                        backgroundColor: "var(--color-brand-orange)",
                    }}
                />
                <Text
                    size="sm"
                    style={{
                        color: "var(--color-brand-orange)",
                        letterSpacing: "3px",
                        fontWeight: 400,
                    }}
                >
                    GET IN TOUCH
                </Text>
                <div
                    style={{
                        width: isMobile ? "36px" : "48px",
                        height: "1px",
                        backgroundColor: "var(--color-brand-orange)",
                    }}
                />
            </div>
            <Text
                size="xxl"
                style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: "300",
                    textAlign: "center",
                }}
            >
                Request a Quote
            </Text>
            <Text
                size="lg"
                style={{
                    fontWeight: "300",
                    textAlign: "center",
                    color: "var(--color-faded-text)",
                }}
            >
                {
                    "Ready to give your vehicle the care it deserves? Reach out and we'll get you scheduled"
                }
            </Text>
            <div
                style={{
                    width: "100%",
                    maxWidth: "850px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "32px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        gap: "24px",
                        flexDirection: isMobile ? "column" : "row",
                    }}
                >
                    <Input
                        value={name.value}
                        setValue={handleInputChange(setName)}
                        error={name.error}
                        label="Name"
                        placeholder="Your name"
                        disabled={name.disabled || isSubmitting}
                    />
                    <Input
                        value={email.value}
                        setValue={handleInputChange(setEmail)}
                        error={email.error}
                        label="Email"
                        placeholder="you@example.com"
                        disabled={email.disabled || isSubmitting}
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <Input
                        value={phone.value}
                        setValue={handleInputChange(setPhone)}
                        error={phone.error}
                        label="Phone"
                        placeholder="(555) 123-4567"
                        disabled={phone.disabled || isSubmitting}
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <Input
                        value={message.value}
                        setValue={handleInputChange(setMessage)}
                        error={message.error}
                        label="Message"
                        placeholder="Tell us about your vehicle and what services you're interested in..."
                        isMultiline
                        disabled={message.disabled || isSubmitting}
                    />
                </div>
                {didSendMessage && (
                    <div
                        style={{
                            border: "1px solid var(--color-brand-green)",
                            backgroundColor: "var(--color-darker-brand-green)",
                            display: "flex",
                            gap: "12px",
                            paddingInline: "12px",
                            paddingBlock: "20px",
                            borderRadius: "8px",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{
                                color: "var(--color-brand-green)",
                            }}
                        />
                        <div
                            style={{
                                color: "var(--color-brand-white)",
                            }}
                        >
                            Thank you for choosing West Coast Diamond Detail. We
                            are very excited to work with you. Your message was
                            sent successfully. One of our team members will
                            reach out shortly to finalize an appointment.
                        </div>
                    </div>
                )}
                {submissionError && (
                    <div
                        style={{
                            border: "1px solid var(--color-brand-red)",
                            backgroundColor: "var(--color-darker-brand-red)",
                            display: "flex",
                            gap: "12px",
                            paddingInline: "12px",
                            paddingBlock: "20px",
                            borderRadius: "8px",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faXmarkCircle}
                            style={{
                                color: "var(--color-brand-red)",
                            }}
                        />
                        <div
                            style={{
                                color: "var(--color-brand-white)",
                            }}
                        >
                            {submissionError}
                        </div>
                    </div>
                )}
                <div
                    style={{
                        marginBlock: "16px",
                    }}
                >
                    <Button
                        text="SEND MESSAGE"
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        onClick={handleFormSubmit}
                        disabled={didSendMessage || isSubmitting}
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        background: "var(--color-more-faded-text)",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                        gap: "28px 40px",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            size="sm"
                            style={{
                                color: "var(--color-brand-orange)",
                                letterSpacing: "0.6px",
                                fontWeight: 300,
                            }}
                        >
                            PHONE
                        </Text>
                        <Text
                            size="lg"
                            style={{
                                fontWeight: 300,
                            }}
                        >
                            (403) 835-1526
                        </Text>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            size="sm"
                            style={{
                                color: "var(--color-brand-orange)",
                                letterSpacing: "0.6px",
                                fontWeight: 300,
                            }}
                        >
                            EMAIL
                        </Text>
                        <Text
                            size="lg"
                            style={{
                                fontWeight: 300,
                            }}
                        >
                            westcoastdiamonddetail@gmail.com
                        </Text>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            size="sm"
                            style={{
                                color: "var(--color-brand-orange)",
                                letterSpacing: "0.6px",
                                fontWeight: 300,
                            }}
                        >
                            HOURS
                        </Text>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                size="lg"
                                style={{
                                    fontWeight: 300,
                                }}
                            >
                                24 / 7
                            </Text>
                            <Text
                                size="lg"
                                style={{
                                    fontWeight: 300,
                                    color: "var(--color-faded-text)",
                                }}
                            >
                                (By appointment)
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Input({
    label,
    value,
    setValue,
    error,
    placeholder,
    isMultiline,
    disabled,
}: {
    label: string
    value: string
    setValue: (s: string) => void
    error: string | undefined
    placeholder: string
    isMultiline?: boolean
    disabled: boolean
}) {
    const isMobile = useIsMobile()
    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(e.target.value)
        },
        [setValue]
    )
    return (
        <div
            className="custom-input"
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
            }}
        >
            <Text size="md" style={{}}>
                <div
                    style={{
                        color: !!error ? "var(--color-brand-red)" : undefined,
                        fontWeight: !!error ? 600 : undefined,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    {label}
                </div>
                {!!error && <ErrorTooltip error={error} />}
            </Text>
            {isMultiline ? (
                <textarea
                    value={value}
                    onChange={handleInput}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        paddingInline: "12px",
                        paddingBlock: "20px",
                        color: disabled
                            ? "var(--color-less-faded-text)"
                            : "var(--color-brand-white)",
                        fontSize: isMobile ? "14px" : "16px",
                        fontFamily: "var(--font-dm-sans)",
                        resize: "vertical",
                    }}
                    rows={4}
                />
            ) : (
                <input
                    value={value}
                    onChange={handleInput}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        paddingInline: "12px",
                        paddingBlock: "20px",
                        color: disabled
                            ? "var(--color-less-faded-text)"
                            : "var(--color-brand-white)",
                        fontSize: isMobile ? "14px" : "16px",
                        fontFamily: "var(--font-dm-sans)",
                    }}
                />
            )}
            <div
                className="bottom-border"
                style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: !!error
                        ? "var(--color-brand-red)"
                        : "var(--color-more-faded-text)",
                    position: "relative",
                }}
            >
                <div
                    className="bottom-border-transition"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: !!error
                            ? "var(--color-brand-red)"
                            : "var(--color-brand-orange)",
                    }}
                />
            </div>
        </div>
    )
}

function ErrorTooltip({ error }: { error: string }) {
    const iconRef = useRef<SVGSVGElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 })
    return (
        <>
            <div
                onMouseEnter={() => {
                    setIsHovering(true)
                    const rect = iconRef.current?.getBoundingClientRect()
                    setIconPosition({
                        top: (rect?.top || 0) + (rect?.height || 0),
                        left: (rect?.left || 0) + (rect?.width || 0) + 8,
                    })
                }}
                onMouseLeave={() => {
                    setIsHovering(false)
                }}
            >
                <FontAwesomeIcon ref={iconRef} icon={faExclamationCircle} />
            </div>
            {isHovering && (
                <div
                    style={{
                        position: "fixed",
                        top: `${iconPosition.top}px`,
                        left: `${iconPosition.left}px`,
                        paddingInline: "12px",
                        paddingBlock: "8px",
                        border: "1px solid var(--color-brand-red)",
                        background: "var(--color-darker-brand-red)",
                        color: "var(--color-brand-white)",
                        borderRadius: "4px",
                        fontFamily: "var(--font-dm-sans)",
                    }}
                >
                    {error}
                </div>
            )}
        </>
    )
}
