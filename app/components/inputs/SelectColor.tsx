'use client'

import { ImageType } from "@/app/admin/add-products/AddProductsForm"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import SelectImage from "./SelectImage"
import MyButton from "../MyButton"

interface props{    
    item: ImageType ,
    addImageToState: (value:ImageType) => void
    removeImageFromState: (value:ImageType) => void
    isProductCreated: boolean
}


export default function SelectColor({addImageToState, isProductCreated, item, removeImageFromState}:props){
    
    const [ isSelected, setIsSelected] = useState(false)
    const [ file, setFile ] = useState<File|null>(null)

    useEffect(() => {
        if(isProductCreated){
            setIsSelected(false)
            setFile(null)
        }
    },[isProductCreated])

    const handleFileChange = useCallback((value:File) => {
        setFile(value)
        addImageToState({...item, image: value})
    },[])

    const handleCheck = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setIsSelected(event.target.checked)
        if(!event.target.checked){
            setFile(null)
            removeImageFromState(item)
        }
    },[])



    return(
        <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
            <div className="flex flex-row gap-2 items-center h-[60px]">
                <input id={item.color} type="checkbox" checked={isSelected} onChange={handleCheck} className="cursor-pointer "/>
                <label htmlFor={item.color} className="font-medium cursor-pointer">
                    {item.color}
                </label>
            </div>
            <>
                {isSelected && !file &&  (
                    <div className="col-span-2 text-center">
                        <SelectImage item={item} handleFileChange={handleFileChange} />
                    </div>
                )}

                {file && (
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file?.name}</p>
                        <div className="w-[70px]">
                            <MyButton label="Cancel" small outline onClick={() => {
                                setFile(null)
                                removeImageFromState(item)
                            }}/>
                        </div>
                    </div>
                )}
            </>
        </div>
    )
} 