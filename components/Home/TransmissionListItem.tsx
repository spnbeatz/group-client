"use client"

import ReactPlayer from "react-player";

export const TransmissionListItem = (
    {
        transmission,
        isPlaying
    }: {
        transmission: any,
        isPlaying: boolean
    }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center duration-200 rounded-sm cursor-pointer">
            {isPlaying ? 
                <div className="rounded-md overflow-hidden flex flex-col items-center justify-center">
                    <video 
                        className="w-full h-full object-cover"
                        src={transmission.video} 
                        controls  
                        autoPlay 
                        loop
                    />
                    <div className={`flex w-full p-2 flex-col items-start justify-center rounded-sm`}>
                        <p className="text-sm font-semibold">{transmission.name}</p>
                        <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-xs font-semibold">{transmission.user.username}</p>
                            <p className="text-xs">from</p>
                            <p className="text-xs font-semibold">{transmission.user.group}</p>
                        </div>
                    </div>
                </div>
            :
                <div className="flex flex-row items-center justify-start w-full gap-2 p-2 rounded-sm">
                    
                        <div className="rounded-lg bg-black overflow-hidden flex justify-center items-center w-16 h-12">
                            <ReactPlayer
                                url={transmission.video}
                                style={{
                                    borderRadius: "10px"
                                }}
                                width={"64px"}
                                height={"64px"}
                            />
                        </div>
                    
                    <div className={`flex w-full p-2 flex-col items-start justify-center rounded-lg rounded-t-none `}>
                        <p className="text-sm font-semibold">{transmission.name}</p>
                        <div className="flex flex-row items-center justify-start gap-1">
                            <p className="text-xs font-semibold">{transmission.user.username}</p>
                            <p className="text-xs">from</p>
                            <p className="text-xs font-semibold">{transmission.user.group}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}