"use client"

import { Toaster } from "@/components/ui/toaster";
import { userAtom } from "@/lib/userAtom";
import { useAtomValue } from "jotai";
import Link from 'next/link'
import React from "react";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {

    const user = useAtomValue(userAtom)

    if (user) {
        return (
            <div className="text-center mt-20 text-lg">
                <span className="text-lg font-semibold pr-1">
                    {user.email} 
                </span>
                you already logged in.
                you can go to <Link href='/dashboard' className="font-semibold"> dashboard </Link>
                page if you want</div>
        )
    }

    return (
        <>
            <div>{children}</div>
            <Toaster />
        </>
    )
}