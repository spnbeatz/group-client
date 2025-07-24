import { FavoriteBorder, ModeCommentOutlined, ShareOutlined } from "@mui/icons-material"
import { Tooltip } from "@heroui/tooltip"
import { ReactionPicker } from "./ReactionPicker"
import { ReactionProps } from "@/types"
import { useEffect, useState } from "react";
import { findReaction, addReaction } from "@/api/reactions";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getEmoji } from "@/utils/emojiMap";


export const InteractionButtons = ({
    switchVisibilityOfCommentForm,
    postId
} : {
    switchVisibilityOfCommentForm: () => void,
    postId: string
}) => {

    const { token, userData } = useSelector((state: RootState) => state.auth);

    const [ reaction, setReaction ] = useState<ReactionProps | null>(null);

    useEffect(() => {
        const fetchReaction = async () => {
            if(token && userData) {
                const react = await findReaction(token, userData._id, postId);
                setReaction(react);
            }
        }
        fetchReaction();
    },[token, userData]);

    const handleReaction = async (type: string) => {
        if(reaction){
            const result = await addReaction(token, reaction);
            if(result.status === "success") setReaction(null);
        } else {
            if(userData && token) {
                const newReaction:ReactionProps = {
                    userId: userData._id,
                    contentId: postId,
                    contentType: "post",
                    reactionType: type
                }

                const result = await addReaction(token, newReaction);
                if(result.status === "success") setReaction(newReaction);
            }

        }
    }

    const likedIcon = () => {
        if(reaction){
            return (
                <img className="w-4 h-4" src={getEmoji(reaction?.reactionType)}/>
            )
        }

    }

    const handleSetReaction = (reaction: ReactionProps) => {
        setReaction(reaction);
    }

    return (
        <div className="w-full flex flex-row justify-around items-center gap-2 ">
            <Tooltip content={<ReactionPicker contentId={postId} addReaction={handleReaction}/>} delay={500}>
                <div>
                    <Button onClick={async () => await handleReaction('like')} Icon={reaction ? likedIcon : FavoriteBorder}>Like</Button>
                </div>
                
            </Tooltip>
            <div>
                <Button Icon={ModeCommentOutlined} onClick={switchVisibilityOfCommentForm}>Comment</Button>
            </div>
            <div>
                <Button Icon={ShareOutlined}>Share</Button>
            </div>
            
        </div>
    )
}

const Button = ({
    children, Icon, onClick
} : {
    children: React.ReactNode, 
    Icon: React.ElementType, 
    onClick?: () => void}) => {
    return (
        <div className="flex flex-row justify-center items-center gap-2 p-2 w-full rounded-md cursor-pointer duration-200" onClick={onClick}>
            <p className="text-sm text-slate-600 pointer-events-none select-none">
                {children}
            </p>
            
            <Icon style={{fontSize: "15px"}} className="text-slate-600"/>
        </div>
    )
}