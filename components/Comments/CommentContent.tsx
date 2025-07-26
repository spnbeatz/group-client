import { useEffect, useState } from "react";
import { Tooltip } from "@heroui/tooltip";

export const CommentContent = ({ value }: { value: string }) => {

    const [content, setContent] = useState<string[]>([]);

    useEffect(() => {
        if (value) {
            const words = value.split(' ');
            setContent(words);
        }
    }, [value]);

    const renderWords = () => {
        return content.map((word) => {
            if (word.startsWith('@')) {
                const formattedWord = word.slice(1)
                return (
                    <Tooltip content="Hello" delay={500}>
                        <span>
                            <span className="bg-blue-200 rounded-md px-0.5 text-black">{formattedWord}</span>
                            <span> </span>
                        </span>


                    </Tooltip>
                )
            } else {
                return <span>{word} </span>
            }
        })
    }



    return (
        <div className="text-md text-slate-600">
            {content.length > 0 && renderWords()}
        </div>
    )
}