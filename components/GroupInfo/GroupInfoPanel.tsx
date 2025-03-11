import {Image} from "@heroui/image";
import { groupDescription } from "@/config/data";

export const GroupInfoPanel = () => {
    return (
        <div className="w-full h-1/3 bg-white gap-4 rounded-lg p-4 flex flex-row justify-start items-start">
            <div className="h-full aspect-square overflow-hidden rounded-lg flex justify-center items-center">
                <img 
                    src="https://wallpapers.com/images/hd/technology-linkedin-background-sj2amwxyouxivqod.jpg"
                    className="w-1/2 h-1/2 object-cover"
                />
            </div>
            <div className="flex flex-col justify-start items-start w-2/3">
                <p className="text-lg font-semibold text-slate-600">Group Name</p>
                <p className="text-tiny text-slate-500">
                    {groupDescription}
                </p>
            </div>

        </div>
    )
}