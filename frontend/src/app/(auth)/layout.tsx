"use client"

import { Toaster } from "@/components/ui/toaster";
import React, { useEffect } from "react";


export default function Layout({
    children
}: {
    children: React.ReactNode
}){

    // const acToken = localStorage.getItem('at')
    // const isValid = acToken && jwtDecode<{ sub: string, exp: number }>(acToken).exp > Date.now() / 1000
    // console.log(isValid)
    // async function getAccessToken(){
    //     console.log('layout')
    //     const res = await fetchReq({
    //         url: '/refresh',
    //         body: null,
    //         method: 'POST'
    //     })
        
    //     localStorage.setItem('at', res.accessToken)

    // } 
    
    // useEffect(() => {
    //     if(acToken && isValid) return
    //     getAccessToken()
    // }, [])

    return (
        <>
        <div>{children}</div>
        <Toaster />
        </>
    )
}