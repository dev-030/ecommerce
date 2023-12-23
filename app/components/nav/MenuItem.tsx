


interface props{
    children : React.ReactNode
    onClick : () => void
}

export default function MenuItem({children,onClick}:props){


    return(
        <div className="px-4 py-3 hover:bg-neutral-100 transition" onClick={onClick}>
            {children}
        </div>
    )
}