import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeActiveChat } from "@/state/reducers/chatSlice";

export const CloseChatButton = ({chatId}: {chatId: string}) => {

    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(removeActiveChat(chatId))} >
            <Close className="text-gray-600 font-semibold" style={{ fontSize: "16px" }} />
        </div>
    )
}