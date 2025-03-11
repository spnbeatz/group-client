import React from "react";

export const Bubble = ({
    index,
    length,
    message,
    isOwner
}:{
    index: number,
    length: number,
    message: string,
    isOwner: boolean
}) => {

    const getStyles = () => {
        if (length === 1) return "";
    
        const isFirst = index === 0;
        const isLast = index === length - 1;
        const isMiddle = index !== 0 && index !== length - 1
    
        if (isFirst) {
            return isOwner ? "rounded-br-md":"rounded-bl-md";
        }
        if (isLast) {
            return isOwner ? "rounded-tr-md" : "rounded-tl-md";
        }

        if (isMiddle) {
            return isOwner ? "rounded-br-md rounded-tr-md" : "rounded-bl-md rounded-tl-md"
        }
    
        return "";
    };
    

    return (

        <div className={`bg-[#687b9f] w-auto max-w-40 break-words text-right p-2 rounded-2xl text-white text-xs ${getStyles()} ${isOwner ? "self-end" : "self-start"}`}>
            <p>{message}</p>
        </div> 

    )
}