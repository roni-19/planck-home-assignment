import React from "react";

type InputProps = {
    value: string
    placeholder: string
    isError: boolean
    setValue: (value: string) => void
}
export default function Input({ value, placeholder, isError, setValue }: InputProps) {
    return (
        <div>
            <input className={`h-6 p-6 rounded-[14px] ${isError ? "bg-red/5 border border-red/20" : ""}`} placeholder={placeholder} value={value}
                   onChange={e => setValue(e.target.value)}/>
            {isError && <div className="text-xs text-red px-2 mt-1">Invalid input, please try again.</div>}
        </div>
    )
}