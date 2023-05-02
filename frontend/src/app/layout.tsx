import Link from 'next/link'
import './globals.css'


export const metadata = {
  title: 'nest next auth jwt template',
  description: 'Simple jsonwebtoken authentication for nestjs and nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div>
            <nav className='border-b-[1px] border-b-gray-300
           py-4 text-primary'>
              <div className='max-w-6xl flex justify-end gap-6 px-4'>
                {[['Home', '/'], 
                ['Register', 'register'], 
                ['Dashboard', 'dashboard']]
                  .map(([title, url]) => <Link className='hover:text-slate-600' 
                  href={url}>{title}</Link>)
                }
              </div>
            </nav>
          </div>
        </header>
        <div>{children}</div></body>
    </html>
  )
}
