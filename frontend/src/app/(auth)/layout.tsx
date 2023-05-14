"use client"

import { Spinner } from "@/components/ui/Spinner"
import { fetchReq } from "@/lib/apis"
import { userAtom } from "@/lib/userAtom"
import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"

export default function ({
    children
}: {
    children: React.ReactNode
}) {
    const setUser = useSetAtom(userAtom)
    const [loading, setLoading] = useState(false)

    async function getUser() {
        setLoading(true)
        try {
            const res = await fetchReq({
                url: '/me',
                method: 'GET',
                auth: true,
                body: null
            })
            setUser(res)
        } catch (error) {
            
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (loading) return (
        <div className="text-center mt-20">
            <Spinner />
        </div>
    )

    return (
        <div>
            {children}
        </div>
    )

}