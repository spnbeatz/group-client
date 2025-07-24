import { useState, Dispatch, SetStateAction } from "react"
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

import { CommentProps } from "@/types";

export const Comments = ({
    postId,
    comments,
    limit,
    setLimit,
    count,
    sendComment,
    fetchChildComments
} : {
    postId: string,
    comments: CommentProps[],
    limit: number,
    setLimit: Dispatch<SetStateAction<number>>,
    count: number,
    sendComment: (comment: CommentProps) => void,
    fetchChildComments: (parentId: string | undefined) => void
}) => {

    return (
        <div className="w-full flex flex-col justify-end items-center h-full">
            <div className="w-full flex flex-col flex-start h-full">
                {comments && comments.map((comment, index) => {
                    return (
                        <Comment 
                            comment={comment} 
                            postId={postId}
                            key={`${comment._id} ${index}`} 
                            sendComment={sendComment}
                            fetchChildComments={fetchChildComments}
                        />
                    )
                })} 
            </div>

            { count > limit && <p className="text-slate-600 text-sm text-semibold cursor-pointer hover:text-slate-400 duration-150" onClick={() => setLimit(limit + 10)}>Show more comments...</p> }
        </div>
    )
}