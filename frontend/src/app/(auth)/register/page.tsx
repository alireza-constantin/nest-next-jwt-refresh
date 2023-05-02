import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Register({ searchParams }: { searchParams: { tab: string } }) {

    const tabDefault = searchParams.tab ?
        searchParams.tab === "login" ? "login" : "signup"
        : undefined

    console.log(tabDefault)

    return (
        <div className="w-[450px] mx-auto mt-20">
            <Tabs defaultValue={tabDefault || "login"}
                className="w-[450px]">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="login">Login</TabsTrigger>
                    <TabsTrigger className="w-full" value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginCard />
                </TabsContent>
                <TabsContent value="signup">
                    <SignupCard />
                </TabsContent>
            </Tabs>

        </div>
    )
}

const LoginCard = () => {
    return (
        <Card >
            <CardHeader className="space-y-2">
                <CardTitle>Login</CardTitle>
                <CardDescription>Please enter your email and password</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input />
                </div>
                <div className="space-y-1.5">
                    <Label>Password</Label>
                    <Input />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full font-semibold">Login</Button>
            </CardFooter>
        </Card>
    )
}

const SignupCard = () => {
    return (
        <Card>
            <CardHeader className="space-y-2">
                <CardTitle>Signup</CardTitle>
                <CardDescription>Please enter your email and password</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input />
                </div>
                <div className="space-y-1.5">
                    <Label>Password</Label>
                    <Input />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full font-semibold">Signup</Button>
            </CardFooter>
        </Card>
    )
}