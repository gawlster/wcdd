import { FormSubmission } from "@/generated/prisma/client"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
    const [submissions, setSubmissions] = useState<FormSubmission[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/getFormSubmissions")
                if (!res.ok) throw new Error()
                const json = await res.json()
                setSubmissions(json.submissions)
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Fetch error</div>}
            {!!submissions.length && (
                <div>
                    {submissions.map((submission) => {
                        return (
                            <div
                                key={submission.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                <SubmissionField
                                    name="ID"
                                    val={`${submission.id}`}
                                />
                                <SubmissionField
                                    name="Name"
                                    val={submission.name}
                                />
                                <SubmissionField
                                    name="Email"
                                    val={submission.email}
                                />
                                <SubmissionField
                                    name="Phone"
                                    val={submission.phone}
                                />
                                <SubmissionField
                                    name="Message"
                                    val={submission.message}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

function SubmissionField({ name, val }: { name: string; val: string }) {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <div>{name}</div>
            <div>{val}</div>
        </div>
    )
}
