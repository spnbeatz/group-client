"use client"

import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useTheme } from "next-themes";


interface ButtonProps {
    onClick: () => void,
    size: "sm" | "md" | "lg",
    style?: Object
}

export const CloseButton: React.FC<ButtonProps> = ({onClick, size="md", style}) => {
    const { theme } = useTheme();
    const getSize = (value: string) => {
        switch(value){
            case "sm":
                return "15px"
            case "md":
                return "25px"
            case "lg":
                return "35px"
            default:
                return "25px"
        }
    }

    return (
        <div 
            className="rounded-full flex justify-center items-center overflow-hidden hover:scale-125 duration-200"
            onClick={onClick}
            style={{width: getSize(size), height: getSize(size), ...style}}
        >
            <CloseIcon 
                style={{
                    width: '80%',
                    height: '80%'
                }}
            />
        </div>
    )
}