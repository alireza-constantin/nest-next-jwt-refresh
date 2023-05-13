"use client"

import { Spinner } from "@/components/ui/Spinner"
import { fetchReq } from "@/lib/apis"
import { useEffect, useState } from "react"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    async function getUser(){
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

    console.log(user)
    
    useEffect(() => {
        getUser()
    }, [])

    if(loading) {
        return <div className="text-center mt-20 text-lg"><Spinner /></div>
    }

    if (!user && !loading) {
        return (
            <div className="text-center mt-20 text-lg">Sorry you do not have access to this page, 
            please login or register.</div>
        )
    }

    return <div>{children}</div>
}
