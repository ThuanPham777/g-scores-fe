import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Search Scores",
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}