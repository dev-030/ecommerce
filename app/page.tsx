import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function Home() {



  const session = await getServerSession(authOptions)

  console.log(session?.user)

  return (
    <div>

      <h1>This is the main server page.</h1>

      <h2>email : {session?.user?.email}</h2>


    <Link href={'/login'}>Login</Link>
    </div>
  )
}
