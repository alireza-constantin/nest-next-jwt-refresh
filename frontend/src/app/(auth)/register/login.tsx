import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FormEvent } from "react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Login = ({ onSubmit }: { onSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
    return (
        <Card >
            <form onSubmit={onSubmit}>
                <CardHeader className="space-y-2">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Please enter your email and password</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email" >Email</Label>
                        <Input required type="email" name="email" id="email" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="password" >Password</Label>
                        <Input required type="password" minLength={4} name="password" id="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full font-semibold">Login</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

