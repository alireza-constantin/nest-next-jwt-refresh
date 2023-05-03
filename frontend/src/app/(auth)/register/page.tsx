"use client"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchReq } from "@/lib/apis";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Signup } from "./signup";
import { Login } from './login'
import { useSearchParams } from 'next/navigation'
import { error } from "console";



export default function Register() {
    const { toast } = useToast()
    // const router = useRouter()
    const searchParam = useSearchParams().get('tab')


    async function onSignupSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.target as HTMLFormElement

        try {
            const res = await fetchReq({
                url: '/signup',
                method: 'POST',
                body: {
                    email: target.email.value,
                    password: target.password.value
                }
            })

            // do something with response data

        } catch (error: any) {
            if (error.cause satisfies ErrorResponse) {
                toast({
                    variant: 'destructive',
                    title: error.cause.message,
                    description: "Uh oh! Something went wrong.",
                })
            } else {
                console.log(error)
            }

        }
    }

    async function onLoginSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.target as HTMLFormElement

        try {
            const res = await fetchReq({
                url: '/signin',
                method: 'POST',
                body: {
                    email: target.email.value,
                    password: target.password.value
                }
            })

            // do something with response data

        } catch (error: any) {
            if (error.cause satisfies ErrorResponse) {
                toast({
                    variant: 'destructive',
                    title: error.cause.message,
                    description: "Uh oh! Something went wrong.",
                })
            } else {
                console.log(error)
            }

        }
    }


    return (
        <div className="w-[450px] mx-auto mt-20">
            <Tabs defaultValue={searchParam || "login"}
                className="w-[450px]">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="login">Login</TabsTrigger>
                    <TabsTrigger className="w-full" value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login onSubmit={onLoginSubmit} />
                </TabsContent>
                <TabsContent value="signup">
                    <Signup onSubmit={onSignupSubmit} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

