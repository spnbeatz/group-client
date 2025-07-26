import { Avatar } from "@heroui/avatar"
import { useState, useRef } from "react"
import { formatDate } from "@/config/dateFormat"
import { PostModal } from "./PostModal";
import { Reactions } from "../Buttons/Reactions";
import Linkify from "linkify-react";
import { userBasicQuery } from "@/queries/useUsers"
import { Attachments } from "./Attachments";
import { IPost } from "@/types/posts";
import { UserMinimal } from "@/types/user";


export const Post = ({ post }: { post: IPost }) => {

    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
    const [isWindowed, setIsWindowed] = useState<boolean>(false);
    const modalRef = useRef<any>(null);
    const { data: postUser, isLoading, isError, error } = userBasicQuery(post.user);

    const switchVisibilityOfCommentForm = () => {
        if (isWindowed) {
            setShowCommentForm(!showCommentForm);
        } else {
            setIsWindowed(true);
            setShowCommentForm(!showCommentForm)
        }

    }

    const openModal = () => {
        modalRef.current?.handleOpen();
    };

    const closeWindowedPost = () => {
        setIsWindowed(false);
        setShowCommentForm(false);
    }

    return (
        <div className="w-full">
            <PostModal ref={modalRef} post={post} postUser={postUser} />
            <div className={`w-full rounded-sm bg-white pt-6 pb-2 flex flex-col justify-center items-start gap-2 shadow-md mt-6 flex-shrink-0`}>
                <PostHeader postUser={postUser} date={post.createdAt} />
                <PostContent text={post.content.text} />

                <Attachments attachments={post.content.attachments} />
                <Reactions postId={post._id} openPostModal={openModal} />
            </div>
        </div>

    )
}

export const PostHeader = ({ postUser, date }: { postUser: UserMinimal, date: string }) => {
    return (
        <div className="flex flex-row justify-start items-center gap-2 px-4 w-full">
            <Avatar src={postUser?.avatar} size="md" />
            <div className="flex flex-col items-start justify-center">
                <p className="text-sm font-semibold text-slate-600">
                    {postUser?.username}
                </p>
                <p className="text-tiny text-slate-400">
                    {formatDate(date, "chat")}
                </p>
            </div>
        </div>
    )
}

export const PostContent = ({ text }: { text: string }) => {
    return (
        <div className="text-slate-700 px-4 text-sm">
            <Linkify options={{
                target: "_blank",
                rel: "noopener noreferrer",
                render: {
                    url: ({ attributes, content }) => {
                        // Usunięcie tagName, jeżeli istnieje, z atrybutów
                        const { tagName, ...cleanedAttributes } = attributes;

                        // Renderowanie standardowych linków
                        return (
                            <a {...cleanedAttributes} style={{ color: "blue" }}>
                                {content}
                            </a>
                        );
                    },
                },
            }}>{text}</Linkify>
        </div>
    )
}