"use client"

import { Spinner } from "@/components/ui/Spinner"
import { fetchReq } from "@/lib/apis"
import { userAtom } from "@/lib/userAtom"
import { Provider, useSetAtom } from "jotai"
import { useEffect, useState } from "react"

export default function ({
    children
}: {
    children: React.ReactNode
}) {
    const setUser = useSetAtom(userAtom)
    const [loading, setLoading] = useState(false)
    console.log('root ')

    async function getUser() {
        setLoading(true)
        const res = await fetchReq({
            url: '/me',
            method: 'GET',
            auth: true,
            body: null
        })

        setUser(res)
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    if(loading) return <div>loading...</div>

    return (
    <div> 
        {children}
    </div>
    )
    
}