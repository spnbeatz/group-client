
import { useAuthContext } from "@/context/AuthContext";
import { ActiveChatProps } from "@/types";
import { getAvatar } from "@/utils/chatHelpers";
import { getFormattedParticipants } from "@/utils/chatHelpers";
import { ChatName } from "./ChatName";
import { CloseChatButton } from "./Buttons/CloseChatButton";
import { useChat } from "@/context/ChatContext";

export const ChatMinimized = ({
    chat
}: {
    chat: ActiveChatProps;
}) => {
    const { userData } = useAuthContext();
    const { minimizeChat } = useChat();
    const labelText = getFormattedParticipants(chat.participants, userData?.id);
    const avatarUrl = getAvatar(chat.participants, userData?.id || '');

    return (
        <div className="w-64 h-12 flex flex-row justify-between items-center border-1 bg-white border-slate-300 shadow-medium px-2 rounded-md pointer-events-auto" onClick={() => minimizeChat(chat.id, false)}>
            <ChatName avatar={avatarUrl} label={labelText} />
            <CloseChatButton chatId={chat.id} />
        </div>
    );
};
