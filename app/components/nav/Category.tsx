import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import queryString from 'query-string'


interface props{
    label: string,
    icon: IconType,
    selected?: boolean
}

export default function Category({icon:Icon,label,selected}:props){

    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(()=>{
        if(label === 'All'){
            router.push('/')
        }else{
            let currentQuery = {}
            if(params){
                currentQuery = queryString.parse(params.toString())
            }

            const updatedQuery:any = {
                ...currentQuery,
                category:label
            } 

            const url = queryString.stringify(
                {
                    url: '/',
                    query: updatedQuery
                },
                {
                    skipNull: true
                }
            )
            router.push(url)
        }
    },[label,params,router])

    return(
        <div onClick={handleClick} className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${selected? 'border-b-slate-800 text-slate-800':'border-transparent text-slate-500'}`}>
            <Icon size={20}/>
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}