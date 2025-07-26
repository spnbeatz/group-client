import { Avatar } from "@heroui/avatar"
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchItem = ({
    item,
    clearList
}: {
    item: any,
    clearList: () => void
}) => {
    const router = useRouter();

    const [id, setId] = useState(item.id);

    const onItemClick = () => {
        clearList();
        router.push(`/user/${id}`)
    }

    return (
        <div
            className="flex-shrink-0 w-full h-11 flex flex-row justify-between items-center cursor-pointer hover:bg-slate-300 duration-200 p-2 rounded-md"
            onClick={() => onItemClick()}
        >
            <div className="flex flex-row items-center justify-start gap-2">
                <Avatar src={item.avatar} isBordered />
                <div className="flex flex-col items-start justify-center">
                    <p className="text-md font-semibold text-slate-700">{item.username}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                </div>
            </div>
        </div>
    )
}