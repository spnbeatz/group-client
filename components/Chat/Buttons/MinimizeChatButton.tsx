
import { HorizontalRule } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { updateMinimizedChat } from "@/state/reducers/chatSlice";

export const MinimizeChatButton = ({chatId, minimized}: {chatId: string, minimized: boolean}) => {

    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(updateMinimizedChat({chatId, minimized}))}>
            <HorizontalRule className="text-gray-600 font-bold" style={{ fontSize: "16px" }} />
        </div>
    )
}