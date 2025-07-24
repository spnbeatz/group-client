
import { CommentProps, MinUserProps } from "@/types";
import { Avatar } from "@heroui/avatar";
import { useState } from "react";
import { AnswerCommentForm } from "./AnswerCommentForm";
import { userBasicQuery } from "@/queries/useUsers";
import { ChildComment } from "./ChildComment";
import { CommentDate } from "./CommentDate";
import { CommentContent } from "./CommentContent";

export const Comment = ({
    comment,
    postId,
    sendComment,
    fetchChildComments
} : {
    comment: CommentProps,
    postId: string,
    sendComment: (comment: CommentProps) => void,
    fetchChildComments: (parentId: string | undefined) => void
}) => {
    const [ openForm, setOpenForm ] = useState<boolean>(false);
    const [ count, setCount ] = useState<number>(comment.childCount || 0);

    const { data: user, isLoading, isError, error } = userBasicQuery(comment.userId);

    return (
        <div className="w-full flex flex-row items-start justify-start gap-2 mt-2">
            <Avatar size="sm" src={user?.avatar} className="flex-shrink-0"/>
            <div className="w-full flex flex-col justify-start items-start gap-4">
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
                        <p className="text-xs text-slate-500 hover:text-slate-400 cursor-pointer select-none" onClick={() => setOpenForm(!openForm)}>
                            Answer
                        </p>
                    </div>
                    {count > 0 && comment &&
                        <div 
                            className="text-slate-500 text-sm font-semibold cursor-pointer hover:text-slate-400 duration-150"
                            onClick={() => {fetchChildComments(comment._id); setCount(0)}}
                        >Show the rest {count} answers...</div>}
                    { comment.childComments && comment.childComments.map((childComment) => {
                        return <ChildComment 
                            comment={childComment} 
                            key={childComment._id}
                            sendComment={sendComment}
                            />
                    })}
                    {user && openForm && <AnswerCommentForm parentId={comment._id} user={user} postId={postId} sendComment={sendComment}/>}
                </div>
            </div>

        </div>
    )
}


