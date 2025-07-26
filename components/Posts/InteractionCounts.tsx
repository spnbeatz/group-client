import { Tooltip } from "@heroui/tooltip"
import { CommentsCount } from "../Comments/CommentsCount"
import { LikesCount } from "../Comments/LikesCount"
import { ReactionCounts } from "@/types/reactions";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { countReactions } from "@/api/reactions";

export const InteractionCounts = ({
    postId
}: {
    postId: string
}) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [reactionCounts, setReactionCounts] = useState<ReactionCounts | null>();

    useEffect(() => {
        const getCount = async () => {
            if (token && postId) {
                const response = await countReactions(token, postId);
                if (response) {
                    console.log(response, "response reaction")
                    setReactionCounts(response);
                }
            }
        }

        getCount();
    }, [token, postId]);

    return (
        <div className="w-full flex flex-row items-center justify-start gap-4 px-4">
            <LikesCount counts={reactionCounts} />
            <CommentsCount />
            <Tooltip>
                <div>

                </div>
            </Tooltip>
        </div>
    )
}

