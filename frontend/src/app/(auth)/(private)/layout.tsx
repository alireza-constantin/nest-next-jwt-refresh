"use client"

import { fetchReq } from "@/lib/apis"
import { useEffect, useState } from "react"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const [user, setUser] = useState(null)

    const at = localStorage.getItem('at')
    async function getUser(){
        const res = await fetchReq({
            url: '/me',
            method: 'GET',
            token: at!,
            body: null
        })

        setUser(res)
    }
    
    useEffect(() => {
        getUser()
    }, [])

    if (!user) {
        return (
            <div className="text-center mt-20">Not Found</div>
        )
    }

    return <div>{children}</div>
}
