import { Panel } from "../Panel";
import { Avatar } from "@heroui/avatar";
import { Place } from "@mui/icons-material";
import { ActionButtons } from "./UserPanel/ActionButtons";
import { Counts } from "./UserPanel/Counts";
import { Description } from "./UserPanel/Description";
import { Details } from "./UserPanel/Details";
import { useChatQuery } from "@/queries/useChat";
import { createChat } from "@/api/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Participant } from "@/types/chat";



export const UserPanel = ({user, id} : {user: any, id:string | string[] | undefined}) => {

    const { token, userData } = useSelector((state: RootState) => state.auth);

    const { openChat } = useChatQuery();

    const newChat = async (participants: Participant[]) => {
        try {
            const createdChat = await createChat(participants, token);
            if(createdChat) {
                console.log("utworzono czat: ", createdChat);
                openChat(createdChat.chatId);
            } else {
                console.log("nie udało się utworzyć czatu!");
            }
        } catch (error) {
            console.log("Błąd podczas próby stworzenia czatu!");
        }
    }

    const handleCreateChat = () => {
        console.log(id, userData, "creating chat attempt")
        if(userData && id){

            const userSender = {
                username: userData.username,
                id: userData._id,
                avatar: userData.avatar
            }

            const userReceiver = {
                username: user.username,
                id: user._id,
                avatar: user.avatar
            }
            newChat([userReceiver, userSender]);
        }
        
    }

    return (
        <Panel>
            <div className='w-full flex flex-col md:flex-row items-center justify-between gap-6'>
                <Avatar src={user?.avatar} className='w-full h-full md:w-40 md:h-48 flex-shrink-0 rounded-sm'/>
                <div className='flex flex-col items-start, justify-between w-full h-48'>
                    <div className="w-full flex flex-row items-center justify-between gap-4">
                        
                        <Details details={user} />
                        
                    </div>
                    
                    <div className='flex flex-row justify-start items-center gap-1'>
                            <Place className=' text-red-500' style={{fontSize: "11px"}}/>
                            <p className='text-[10px] text-slate-500'>Poznań</p>
                    </div>
                    <Description />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        
                        <Counts counts={{followers: 1221, followings: 122, posts: 12}} />
                        <ActionButtons onMessage={handleCreateChat}/>
                    </div>
                    
                    
                </div>
                
            </div>

    </Panel>
    )
}