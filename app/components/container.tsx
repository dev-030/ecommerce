import React from "react"


interface props {
    children : React.ReactNode
}

export default function Container ({children}:props) {

    return(
        <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
            {children}
        </div>
    )
}