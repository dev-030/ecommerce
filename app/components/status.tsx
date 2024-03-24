import { IconType } from "react-icons";




interface StatusPage{
    text: string,
    icon: IconType,
    bg: string,
    color: string
}

export default function Status({bg,color,text,icon:Icon}:StatusPage){

    return(          
             <div className={`${bg} ${color} flex items-center gap-1`}>
                {text}
                <Icon size={15}/> 
             </div>
    )
}