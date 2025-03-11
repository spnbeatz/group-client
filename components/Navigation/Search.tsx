"use client"

import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Search as SearchIcon, Close } from "@mui/icons-material"
import { useState } from "react"


export const Search = () => {

    const [ searchValue, setSearchValue ] = useState<string>("");

    return (
        <div 
            className="w-1/4"
            style={{
                position: 'absolute',
                left: "50%",
                transform: "translateX(-50%)"
            }}
        >
            <Input 
                color={"default"} 
                variant="flat"
                placeholder="Search ..." 
                className=""
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                classNames={{
                    inputWrapper: "border-black/30 border-1"
                }}
                startContent={(
                    <SearchIcon fontSize="small"/>
                )}

                endContent={searchValue.length > 0 ?
                    <div 
                        className="cursor-pointer h-full flex items-center justify-center"
                        onClick={() => setSearchValue("")}
                    >
                        <Close 
                            fontSize="small" 
                            
                        />
                    </div>
                    : null
                }
            />
        </div>
    )
}