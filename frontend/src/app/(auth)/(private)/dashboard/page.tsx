"use client"

import { useToast } from "@/components/ui/use-toast";
import { fetchReq } from "@/lib/apis"
import { userAtom } from "@/lib/userAtom"
import { accessToken } from "@/lib/utils";
import { useSetAtom } from "jotai"
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const setUser = useSetAtom(userAtom);
    const router = useRouter()
    const {toast } = useToast()

    async function onLogoutHandler() { 
        try {
            const res = await fetchReq({
                url: '/logout',
                method: 'POST',
                auth: true,
                body: null
            })
            accessToken.setToken("")
            setUser(null)
            router.push('/')
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

        <div className="text-center mt-10">
            <h1 className="font-semibold text-primary text-2xl mb-12">Dashboard</h1>
            <div className="text-lg text-secondary p-4 mb-8 bg-primary rounded-md">
                This is a show case for jwt authentication and do not contain anything else
            </div>
            <div>
                <button onClick={onLogoutHandler} className="border-2 border-primary text-primary 
                py-3 px-6 mt-4 rounded font-semibold hover:bg-primary hover:text-secondary 
                transition-colors">Logout</button>
            </div>
        </div>
    )
}