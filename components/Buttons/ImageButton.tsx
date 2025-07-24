import { useRef } from "react";
import { Image } from "@heroui/image";
import ImageIcon from "@/assets/image.png";

export const ImageButton = ({
    fileChange
}: {
    fileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {

    const inputFileRef = useRef<HTMLInputElement>(null);

    const openFileInput = () => {
        inputFileRef.current?.click();
    }

    return (
        <div className="w-8 h-8 flex-shrink-0" onClick={() => openFileInput()}>
            <input 
                ref={inputFileRef} 
                multiple 
                type="file" 
                accept="image/*, video/*" 
                className="hidden"
                onChange={(e) => fileChange(e)}
            />
            <Image src={ImageIcon.src} className="w-full h-full rounded-md"/>
        </div>

    )
}

