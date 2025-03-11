import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export interface InputProps {
    label?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    fileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
    type?: "input" | "textarea" | "file",
    password?: boolean
}   

export const Input: React.FC<InputProps> = ({label, value, onChange, fileChange, error, type='input', password}) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [ hidden, setHidden ] = useState(true);

    const handleClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Otwarcie okna wyboru pliku
        }
      };

    useEffect(() => {
        console.log(value);
    },[value]);

    const inputType = (input: string) => {
        switch(input) {
            case "input":
                return (
                    <input
                        className='w-full pl-4 pr-10 border-2 text-xs h-10 rounded-md focus:border-slate-700'
                        name="Name"
                        type={hidden && password ? "password" : "text"}
                        value={value}
                        onChange={onChange}
                    />
                )
            case "textarea":
                return (
                    <textarea
                        name="Description"
                        value={value}
                        onChange={onChange}
                        className="resize-none w-full p-4 border-2 text-xs h-24 rounded-md"
                    />
                )
            case "file":
                return (
                    <div>
                        <input
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            name="Banner"
                            type="file"
                            accept="image/*"
                            onChange={fileChange}
                        />
                        <div className="overflow-hidden justify-center items-center flex w-full rounded-md h-24 border-zinc-600 bg-zinc-200 border-2 relative p-4" onClick={handleClick}>
                            {value ? 
                                ( 
                                    <img 
                                        src={value}
                                        className="object-cover w-full h-auto"
                                    />
                                ) : (
                                    <p style={{
                                        textAlign: 'center',
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        pointerEvents: 'none'
                                        }}
                                        className="duration-200 absolute text-xs font-semibold px-2"
                                    >{label}</p>
                                )
                            }
                        </div>
                    </div>
                )
            default:
                return (
                    <input
                        className='w-full px-4 border-2 text-xs h-10'
                        name="Name"
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                )

        }
    }

    return (
        <div className="w-full relative">
            {password && <div onClick={() => setHidden(!hidden)}>
                {hidden ? 
                    <Visibility className="password-visibility-icon" style={{width: "15px"}}/> 
                    : 
                    <VisibilityOff className="password-visibility-icon" style={{width: "15px"}}/>
                }
            </div>}

            {type != "file" && <label 
                htmlFor="Name"
                className="duration-200 absolute text-slate-500 dark:text-neutral-300 text-xs font-semibold px-2 bg-white dark:bg-black"
                style={{
                    left: '7px',
                    fontSize: '12px',
                    top: "-7px",

                    pointerEvents: 'none'
                }}
            >{label}</label>}
            {inputType(type)}
            {error && <p 
                className="text-red-600 px-2 bg-white dark:bg-black h-4" 
                style={{
                    fontSize: '10px', 
                    marginTop: '-10px',
                    position: 'absolute',
                    bottom: '-7px',
                    left: '7px'
                }}
            >{error}</p>}
        </div>
    )
}