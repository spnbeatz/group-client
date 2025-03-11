
import { getAvatar } from "@/utils/chatHelpers";
import { useAuthContext } from "@/context/AuthContext";
import { ActiveChatProps } from "@/types";
import { getFormattedParticipants } from "@/utils/chatHelpers";
import { ChatName } from "./ChatName";
import { MinimizeChatButton } from "./Buttons/MinimizeChatButton";
import { CloseChatButton } from "./Buttons/CloseChatButton";

export const ChatLabel = ({
    chat,
}: {
    chat: ActiveChatProps;
}) => {
    const { userData } = useAuthContext();

    const labelText = getFormattedParticipants(chat.participants, userData?.id);
    const avatarUrl = getAvatar(chat.participants, userData?.id || '');

    return (
        <div className="w-full flex flex-row justify-between items-center p-3 bg-white">
            <ChatName avatar={avatarUrl} label={labelText} />
            <div className="flex flex-row justify-center items-center gap-2">
                <MinimizeChatButton chatId={chat.id} minimize={true} />
                <CloseChatButton chatId={chat.id} />
            </div>
        </div>
    );
};
