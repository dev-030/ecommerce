'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import toast from "react-hot-toast"



export default function Login (){

    // const session = useSession()


    const [loading,setLoading] = useState('Log in')


    const router = useRouter()
   

    interface formValues {
        email : string,
        password : string
    }


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        setLoading('Logging in')
        
        event.preventDefault()


        const data: formValues = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
          };



        signIn('credentials',{
            email : event.currentTarget.email.value,
            password : event.currentTarget.password.value,
            redirect : false
        }).then((response)=>{
            if(response?.ok){
                setLoading('Logged in')

                toast.success('Logged in')

                router.push('/')
            }
            if(response?.error){
                setLoading('Log in')

                toast.error(response.error)
            }
        }).catch(()=>{
            console.log('Something went wrong....')
            setLoading('Log in')

        })

       
      
    }

    return(
        <div>

            {/* <h2 className="text-center pt-30 bg-black text-stone-50">{session?.status}</h2> */}
        
            <h1>Hello this is the login page.</h1>

            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="email"/>
                <input name="password" type="text" placeholder="pasword"/>
                <button type="submit">{loading}</button>

                {/* {session?.status == 'unauthenticated' &&
                    <button type="submit">{loading}</button>
                } */}
            </form>
            {/* {session?.status == 'authenticated' &&
                <button onClick={()=>signOut()}>Sign out</button>
            } */}
        </div>
    )
}