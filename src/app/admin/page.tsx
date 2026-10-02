import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isAdminRequest } from "@/lib/auth"
import { getPrisma } from "@/lib/prisma"
import { LocalDateTime } from "./LocalDateTime"
import { MarkRespondedButton } from "./MarkRespondedButton"

export const metadata: Metadata = {
    title: "Admin",
    robots: { index: false, follow: false },
}

const columns = [
    "ID",
    "Submitted At",
    "Name",
    "Email",
    "Phone",
    "Message",
    "Responded",
]
const tdClass = "border-x border-b border-x-line border-b-muted p-2 align-top"

export default async function AdminPage() {
    // The proxy already enforces this; checked again in case its matcher ever drifts
    if (!(await isAdminRequest())) notFound()

    const submissions = await getPrisma().contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="p-3">
            <h1 className="text-2xl">Form Submissions</h1>
            {submissions.length === 0 ? (
                <p className="mt-4 text-muted">No submissions yet.</p>
            ) : (
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse overflow-hidden rounded-lg text-sm">
                        <thead>
                            <tr>
                                {columns.map((c) => (
                                    <th
                                        key={c}
                                        className="border border-muted bg-muted p-2 text-left font-semibold"
                                    >
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s) => (
                                <tr key={s.id}>
                                    <td className={tdClass}>{s.id}</td>
                                    <td className={tdClass}>
                                        <LocalDateTime value={s.createdAt} />
                                    </td>
                                    <td className={tdClass}>{s.name}</td>
                                    <td className={tdClass}>
                                        <a
                                            href={`mailto:${s.email}`}
                                            className="underline"
                                        >
                                            {s.email}
                                        </a>
                                    </td>
                                    <td className={tdClass}>
                                        <a
                                            href={`tel:${s.phone}`}
                                            className="underline"
                                        >
                                            {s.phone}
                                        </a>
                                    </td>
                                    <td
                                        className={`${tdClass} whitespace-pre-wrap`}
                                    >
                                        {s.message}
                                    </td>
                                    <td className={tdClass}>
                                        {s.respondedAt ? (
                                            <span className="flex items-center gap-2">
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                />
                                                <span className="sr-only">
                                                    Responded
                                                </span>
                                                <LocalDateTime
                                                    value={s.respondedAt}
                                                />
                                            </span>
                                        ) : (
                                            <MarkRespondedButton id={s.id} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
