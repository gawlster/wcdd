import { FormSubmission } from "@/generated/prisma/client"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect, useState } from "react"

export default function AdminDashboard() {
    return (
        <div
            style={{
                padding: "12px",
            }}
        >
            <div
                style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "24px",
                }}
            >
                Form Submissions:
            </div>
            <SubmissionsTable />
        </div>
    )
}

function useFormSubmissions() {
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
    return {
        submissions,
        loading,
        error,
    }
}

const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "8px",
    border: "1px solid var(--color-faded-text)",
    backgroundColor: "var(--color-faded-text)",
    fontWeight: 600,
}

const tdStyle: React.CSSProperties = {
    padding: "8px",
    borderBottom: "1px solid var(--color-faded-text)",
    borderInline: "1px solid var(--color-more-faded-text)",
    verticalAlign: "top",
}
function SubmissionsTable() {
    const { submissions, loading, error } = useFormSubmissions()
    if (loading) {
        return <div>Loading submissions...</div>
    }
    if (error) {
        return <div>Error fetching for submissions</div>
    }
    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
                fontFamily: "sans-serif",
                fontSize: "14px",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <thead>
                <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Submitted At</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Responded</th>
                </tr>
            </thead>
            <tbody>
                {submissions.map((s) => (
                    <tr key={s.id}>
                        <td style={tdStyle}>{s.id}</td>
                        <td style={tdStyle}>
                            {new Date(s.createdAt).toLocaleString()}
                        </td>
                        <td style={tdStyle}>{s.name}</td>
                        <td style={tdStyle}>{s.email}</td>
                        <td style={tdStyle}>{s.phone}</td>
                        <td style={tdStyle}>{s.message}</td>
                        <td style={tdStyle}>
                            {s.hasResponded ? (
                                <FontAwesomeIcon icon={faCheckCircle} />
                            ) : (
                                <MarkAsRespondedButton
                                    id={s.id}
                                    refetch={() => window.location.reload()}
                                />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function MarkAsRespondedButton({
    id,
    refetch,
}: {
    id: number
    refetch: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const handleClick = useCallback(async () => {
        try {
            const res = await fetch(
                `/api/markFormSubmissionAsResponded/${id}`,
                {
                    method: "PUT",
                }
            )
            if (!res.ok) throw new Error()
            refetch()
        } catch {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }, [id, refetch])
    return (
        <>
            <button
                onClick={handleClick}
                disabled={isLoading}
                style={{
                    cursor: "pointer",
                }}
            >
                {isLoading ? "Loading..." : "Mark as responded"}
            </button>
            {error && (
                <div>
                    There was an error while marking this submission as
                    responded to.
                </div>
            )}
        </>
    )
}
