import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";

export const Signup = ({ onSubmit }: { onSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader className="space-y-2">
                    <CardTitle>Signup</CardTitle>
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
                    <Button className="w-full font-semibold">Signup</Button>
                </CardFooter>
            </form>
        </Card>
    )
}