
import { useSelector, useDispatch } from "react-redux";
import { updateMinimizedChat } from "@/state/reducers/chatSlice";
import { RootState } from "@/state/store";
import { ActiveChatProps } from "@/types";
import { getAvatar } from "@/utils/chatHelpers";
import { getFormattedParticipants } from "@/utils/chatHelpers";
import { ChatName } from "./ChatName";
import { CloseChatButton } from "./Buttons/CloseChatButton";

export const ChatMinimized = ({
    chat
}: {
    chat: ActiveChatProps;
}) => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.userData);
    const labelText = getFormattedParticipants(chat.participants, userData?._id);
    const avatarUrl = getAvatar(chat.participants, userData?._id || '');

    return (
        <div className="w-64 h-12 flex flex-row justify-between items-center border-1 bg-white border-slate-300 shadow-medium px-2 rounded-md pointer-events-auto" 
            onClick={() => dispatch(updateMinimizedChat({chatId: chat.id, minimized: false}))}
        >
            <ChatName avatar={avatarUrl} label={labelText} />
            <CloseChatButton chatId={chat.id} />
        </div>
    );
};
