import { useChat } from "@/context/ChatContext";
import { HorizontalRule } from "@mui/icons-material";

export const MinimizeChatButton = ({chatId, minimize}: {chatId: string, minimize: boolean}) => {

    const { minimizeChat } = useChat();

    return (
        <div onClick={() => minimizeChat(chatId, minimize)}>
            <HorizontalRule className="text-gray-600 font-bold" style={{ fontSize: "16px" }} />
        </div>
    )
}