export const metadata = {
    title: 'nest next auth jwt template',
    description: 'Simple jsonwebtoken authentication for nestjs and nextjs',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const user = true

    if (!user) {
        return (
            <div className="text-center mt-20">Not Found</div>
        )
    }

    return <div>{children}</div>
}
