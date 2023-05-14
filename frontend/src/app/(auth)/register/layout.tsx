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
                <div className="text-center  text-primary">
                    user: <span className="font-semibold">{user.email}</span>
                </div>
                <div className="text-lg text-secondary p-4 mt-4 bg-primary rounded-md">
                    you already logged in.
                    you can go to <Link href='/dashboard' className="font-semibold"> dashboard </Link>
                    page if you want
                </div>
            </div>
        )
    }

    return (
        <>
            <div>{children}</div>
            <Toaster />
        </>
    )
}