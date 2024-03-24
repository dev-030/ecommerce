import React from "react";
import { IconType } from "react-icons";


interface props{
    icon: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean

}

export default function ActionBtn({icon:Icon,onClick,disabled}:props){


    return(
        <button onClick={onClick} disabled={disabled} className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400
        ${disabled && 'opacity-50 cursor-not-allowed'}`}>
            <Icon size={18}/>
        </button>
    )
}