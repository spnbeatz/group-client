import { List } from "../List"
import { Panel, PanelIcon, PanelLabel } from "../Panel"
import { Podcasts } from "@mui/icons-material"
import { TransmissionListItem } from "./TransmissionListItem"
import { Divider } from "@heroui/divider"


const transmissions = [
    {
        name: "Transmission about boat.",
        user: {
            username: "MarineMan99",
            avatar: "https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg",
            group: "Mariners"
        },
        video: "https://videos.pexels.com/video-files/30403326/13029864_1920_1080_30fps.mp4"
    },
    {
        name: "Hello world",
        user: {
            username: "MarineMan99",
            avatar: "https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg",
            group: "Mariners"
        },
        video: "https://videos.pexels.com/video-files/30403326/13029864_1920_1080_30fps.mp4"
    },
]

export const Transmissions = () => {
    return (
        <Panel>
            <PanelLabel 
                label="Transmissions"
                startContent={<PanelIcon Component={Podcasts}/>}
            />
            <List>
                {transmissions.map((transmission, index) => {
                    return (
                        <div className="flex flex-col w-full items-center" key={transmission.name + index}>
                            <TransmissionListItem  transmission={transmission} isPlaying={index === 0}/>
                            {index !== transmissions.length - 1 && <Divider className="bg-indigo-300"/>}
                        </div>
                        
                    )
                })}
            </List>
        </Panel>
    )
}