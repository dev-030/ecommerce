



interface props {
    title : string 
    center?: boolean
}

export default function Heading({title,center}:props){


    return(
        <div className={`${center ? 'text-center':'text-start'}`}>
            <h1 className="font-bold text-2xl">{title}</h1>
        </div>
    )
}