



export default function NullData({title}:{title:string}){

    return(
        <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
            <p className="font-medium">{title}</p>
        </div>
    )
}