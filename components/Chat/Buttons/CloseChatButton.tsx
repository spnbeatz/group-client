import { Close } from "@mui/icons-material";
import { useChat } from "@/context/ChatContext";

export const CloseChatButton = ({chatId}: {chatId: string}) => {

    const { closeChat } = useChat();

    return (
        <div onClick={() => closeChat(chatId)}>
            <Close className="text-gray-600 font-semibold" style={{ fontSize: "16px" }} />
        </div>
    )
}