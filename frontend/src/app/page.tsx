import Link from "next/link";
import { GithubIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto pt-20">
      <div className="mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">A simple jsonwebtoken Auhtentication Template that uses</h1>
        <ul className="text-left text-lg text-secondary p-4 mt-4 bg-primary rounded-md" >
          <li>next 13 app directory as frontend</li>
          <li>nestjs with passport as backend</li>
          <li>tailwind and shadcn for ui</li>
        </ul>

        <div className="mt-4">

          In order to go to 
          <Link href='/dashboard' className="font-semibold"> dashboard </Link> page and send request you need to 
          <Link href='/register?tab=login' className="font-semibold"> login </Link>
          or <Link href='/register?tab=signup' className="font-semibold">signup</Link>
        </div>

        <div className="mt-8 text-lg hover:text-slate-700 flex gap-2 underline">
          <GithubIcon /> <Link href="/" >Template Github Link</Link>
        </div>
      </div>
    </main>
  )
}
