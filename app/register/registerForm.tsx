'use client'

import { useEffect, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import MyButton from "../components/MyButton"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { safeUser } from "@/types"


interface props {
    currentUser: safeUser | null
}

export default function RegisterForm({currentUser}:props){
    
    const router = useRouter()

    useEffect(()=> {
        if(currentUser){
            router.push('/')
            router.refresh()
        }
    },[])

    const [isLoading, setIsLoading] = useState(false)
    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues:{
        name:'',
        email : '',
        password : '',
    }})

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register' , data).then(()=> {
            toast.success('Account Created')

            signIn('credentials',{
                email : data.email,
                password : data.password,
                redirect : false
            }).then((callback)=>{
                if(callback?.ok){
                    router.push('/cart')
                    router.refresh()
                    toast.success('Logged In')  
                }

                if(callback?.error){
                    toast.error(callback.error)
                }
            })
        }).catch(()=> toast.error('Something went wrong')).finally(()=>setIsLoading(false))
    }

    if(currentUser){
        return <p className="text-center">Logged In. Redirecting....</p>
    }

     return(
        <>
            <Heading title="Sign Up"/>
            <MyButton outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={()=>{}}/>
            <hr className="bg-slate-300 w-full h-px"/>
            <Input id="name" lable="Name" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="email" lable="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" lable="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
            <MyButton label={isLoading? 'Loading':'Sign Up'} onClick={handleSubmit(onSubmit)} />
            <p className="text-sm">Already have an account? <Link className="underline" href={'/login'}>Log in</Link></p>
        </>
     )
}