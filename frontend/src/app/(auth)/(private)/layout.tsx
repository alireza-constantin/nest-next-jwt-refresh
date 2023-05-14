"use client"

import { userAtom } from "@/lib/userAtom"
import { useAtomValue } from "jotai"
import Link from "next/link"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const user = useAtomValue(userAtom)

    if (!user) {
        return (
            <div className="text-center mt-20 text-lg">Sorry you do not have access to this page, 
                please <Link href="login"> login </Link> or <Link href="register"> register.</Link></div>
        )
    }

    return <div>{children}</div>
}
