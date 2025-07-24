import { CommentProps } from "@/types";
import { Avatar } from "@heroui/avatar";
import { CommentDate } from "./CommentDate";
import { AnswerCommentForm } from "./AnswerCommentForm";
import { useState, useEffect } from "react";
import { getMinUserData } from "@/api/user";
import { MinUserProps } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CommentContent } from "./CommentContent";

export const ChildComment = ({
    comment,
    sendComment
} : {
    comment: CommentProps,
    sendComment: (comment: CommentProps) => void
}) => {

    const token = useSelector((state: RootState) => state.auth.token);
    const [ user, setUser ] = useState<MinUserProps | null>(null);
    const [ openForm, setOpenForm ] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            if(!token) return;

            const fetchedUser = await getMinUserData(comment.userId, token);

            if(fetchedUser) {
                setUser(fetchedUser);
            }
        }

        fetchUser();
    },[token]);

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <div className="w-full flex flex-row items-start justify-start gap-2">
                <Avatar size="sm" src={user?.avatar} className="flex-shrink-0 w-6 h-6"/>
                <div className="w-full flex flex-col justify-start items-start">
                    <p className="text-xs font-semibold text-slate-600">
                        {user?.username}
                    </p>
                    <CommentContent value={comment.content} />
                    <div className="w-full flex flex-row items-center justify-start gap-4">
                        <CommentDate date={comment.createdAt} />
                        <p className="text-xs font-semibold text-slate-500">
                            Like it!
                        </p>
                        <p className="text-xs text-slate-500" onClick={() => setOpenForm(!openForm)}>
                            Answer
                        </p>
                    </div>
                </div>
            </div>
            {user && openForm && <AnswerCommentForm parentId={comment.parentCommentId} user={user} postId={comment.postId} sendComment={sendComment}/>}
        </div>

    )
}
