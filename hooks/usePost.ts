"use client"

import { useState, useEffect } from "react"
import { CommentProps } from "@/types"
import socket from "@/services/postSocket"
import { useCommentsQuery, useChildCommentsQuery } from "@/queries/usePosts"
import { getChildComments } from "@/api/comments";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";

interface CommentsData {
    comments: CommentProps[];
    count: number;
}

export const usePost = (postId: string, limit: number, isWindowed: boolean) => {
    const [ comments, setComments ] = useState<CommentProps[]>([]);
    const [ count, setCount ] = useState<number>(0);
    const token = useSelector((state: RootState) => state.auth.token);

    const { data, isSuccess, isError, error } = useCommentsQuery(postId, limit);

    useEffect(() => {
        if (isSuccess && data?.comments) {
            setComments(data.comments);
            setCount(data.count);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if(isWindowed) {
            socket.connect();
            socket.emit("joinPost", postId);
    
            socket.on("receiveComment", (newComment: CommentProps) => {
                setComments((prevComments) => addComment(prevComments, newComment));
            });
            
            return () => {
            socket.emit("leavePost", postId);
            socket.off("receiveComment");
            };
        }

    },[isWindowed]);

    useEffect(() => {
        console.log("comments all: ", comments)
    }, [comments])

    const sendComment = (comment: CommentProps) => {
        console.log("sending comment to websocket", comment);
        if (socket?.connected) {
            socket.emit("sendComment", comment);
        } else {
            console.warn("Socket not connected.");
        }
    };

    const addComment = (comments: CommentProps[], newComment: CommentProps): CommentProps[] => {
        if(newComment.parentCommentId) {
            return comments.map((comment) => {
                if(newComment.parentCommentId === comment._id){
                    return {
                        ...comment,
                        childComments: comment.childComments ? [newComment, ...comment.childComments] : [newComment]
                    }
                } else return comment
            })
        
        } else {
            const commentExists = comments.some(comment => comment._id === newComment._id);
    
            if (commentExists) {
                return comments.map(comment =>
                    comment._id === newComment._id ? newComment : comment
                );
            }
        
            return [newComment, ...comments];
        }

    };

    const fetchChildComments = async (parentId: string | undefined) => {
        if(parentId) {
            const data = await getChildComments(token, parentId);
            console.log("child comments elo: ", data);
            if(data){
                setComments((prevComments) => {
                    return prevComments.map((comment) => {
                        if(data.parentId === comment._id){
                            return {
                                ...comment,
                                childComments: data.comments
                            }
                        } else return comment
                    })
                })
            }
        }


    }

    if (isError) {
        console.error("Error fetching comments:", error);
    }

    return { comments, count, sendComment, fetchChildComments }
}    