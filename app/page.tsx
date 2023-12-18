import authOptions from '@/libs/authOptions'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {



  const session = await getServerSession(authOptions)


  return (
    <div>

      <h1>This is the main server page.</h1>

      <h2>email : {session?.user?.email}</h2>


    <Link href={'/login'}>Login</Link>
    </div>
  )
}
