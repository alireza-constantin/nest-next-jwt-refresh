"use client"

import { userAtom } from "@/lib/userAtom"
import { useAtomValue } from "jotai"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const user = useAtomValue(userAtom)

    if (!user) {
        return (
            <div className="text-center mt-20 text-lg">Sorry you do not have access to this page, 
            please login or register.</div>
        )
    }

    return <div>{children}</div>
}
