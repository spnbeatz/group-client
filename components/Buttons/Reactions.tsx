import { InteractionCounts } from "../Posts/InteractionCounts";
import { InteractionButtons } from "../Buttons/InteractionButtons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { countReactions } from "@/api/reactions";
import { ReactionCounts } from "@/types/reactions";

export const Reactions = ({
    postId,
    openPostModal
}:{
    postId: string,
    openPostModal: () => void
}) => {

    const token = useSelector((state: RootState) => state.auth.token);
    const [ reactionCounts, setReactionCounts ] = useState<ReactionCounts | null>();

    useEffect(() => {
        const getCount = async () => {
            if(token && postId) {
                const response = await countReactions(token, postId);
                if(response) {
                    console.log(response, "response reaction")
                    setReactionCounts(response);
                }
            }
        }

        getCount();
    },[token, postId]);


    return (
        <div className="w-full flex-col justify-center items-center">
            <InteractionCounts postId={postId}/>
            <InteractionButtons switchVisibilityOfCommentForm={openPostModal} postId={postId}/>
        </div>
    )
}