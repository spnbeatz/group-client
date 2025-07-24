import { Image } from "@heroui/image"
import { useState, useEffect } from "react";
import { Delete } from "@mui/icons-material";

export const SelectedFiles = ({
    files,
    removeFile
} : {
    files: File[],
    removeFile: (removeIndex: number) => void
}) => {

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const getGridTemplateColumnsClass = () => {
        if (files.length === 1) return "grid-cols-1"; // Jeden element, jedna kolumna
        if (files.length === 2) return "grid-cols-2"; // Dwa elementy, dwie kolumny
        if (files.length === 3) return "grid-cols-3"; // Trzy elementy, trzy kolumny
        return "grid-cols-3"; // Więcej niż 3 elementy, 3 kolumny
    };

    useEffect(() => {
        // Tworzenie URL dla obrazów
        const urls = files.map(file => URL.createObjectURL(file));
        setImageUrls(urls);

        // Zwolnienie URL po odmontowaniu komponentu
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);

    return (
        <div className={`w-[90%] columns-3 gap-2 space-y-2`}>
            { files && imageUrls.map((url, index) => {
                return (
                    <div className="relative w-full h-auto group rounded-xl overflow-hidden break-inside-avoid" key={url + index}>
                        <div className="absolute w-full h-full flex justify-end items-end opacity-0 p-2
                        group-hover:opacity-100 transition-opacity duration-200 bg-black/40 z-40">
                            <div className="cursor-pointer w-4 h-4 rounded-full flex justify-center items-center drop-shadow-sm" onClick={() => removeFile(index)}>
                                <Delete style={{color: "orange", fontSize: "15px"}}/>
                            </div>
                        </div>

                        <img src={url} key={url} className={`w-full h-auto object-cover rounded-lg`}/>
                    </div>
                    
                )
            })}
        </div>
    )
}