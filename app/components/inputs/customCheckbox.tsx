'use client'

import { FieldValues, UseFormRegister } from "react-hook-form"


interface props{
    id: string,
    label: string,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>
}


export default function CustomCheckBox({disabled, id, label, register}:props){



    return(
        <div className="w-full flex flex-row gap-2 items-center">
            <input type="checkbox" id={id} disabled={disabled} {...register(id)} placeholder="" className="cursor-pointer"/>
            <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
        </div>
    )
}