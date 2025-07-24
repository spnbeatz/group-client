import { Panel, PanelLabel } from "../Panel"
import { Avatar } from "@heroui/avatar";
import { PersonAddAlt1 } from "@mui/icons-material";

const recomendations = [
    {
        username: "ShadowPixel_42",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        username: "LunarFoxX",
        avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d"
    },
    {
        username: "EchoNomad",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        username: "ByteStormer",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    },
    {
        username: "NeonHorizon",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c"
    },
]

export const FollowRecomendations = () => {

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY; // Konwertuje ruch pionowy w poziomy
    };
    return (
        <Panel>
            <PanelLabel label="Follow recomendations"/>
            <div 
                className="overflow-x-scroll scrollbar-hide w-full h-40 relative"

            >
                <div className="flex flex-row justify-start items-center gap-2 h-full p-1">
                    {recomendations.map((recomendation) => {
                        return (
                            <div key={recomendation.username + "131231"} className="h-full relative w-32 flex-shrink-0 overflow-hidden rounded-sm flex flex-col items-center justify-between">
                                <Avatar src={recomendation.avatar} className="w-full rounded-sm h-full"/>
                                <div 
                                    className="w-full h-8 bg-white text-slate-700 text-[13px] font-semibold flex justify-start items-center"

                                >
                                    {recomendation.username}
                                </div>
                                <div className="rounded-full bg-white flex justify-start items-center absolute right-[6px] top-[6px] h-5 w-5 hover:w-[50px] shadow-md hover:scale-110 duration-200 text-[10px] gap-1 group">
                                    <PersonAddAlt1 className=" text-slate-700 ml-1" style={{fontSize: "14px"}}/>
                                    <p className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">follow</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </Panel>
    )
}