import { MinUserProps, PostProps } from "@/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
  } from "@heroui/modal";
import { forwardRef, useImperativeHandle, useEffect, useState, useRef } from "react";
import { Comments } from "../Comments/Comments";
import { PostHeader, PostContent } from "./Post";
import { Attachments } from "./Attachments";
import { InteractionCounts } from "./InteractionCounts";
import { usePost } from "@/hooks/usePost";
import { CommentForm } from "../Comments/CommentForm";

export const PostModal = forwardRef(
    (
      {
        post,
        postUser
      }: {
        post?: PostProps;
        postUser: MinUserProps
      },
      ref
    ) => {

    const [ commentsLimit, setCommentsLimit] = useState<number>(3);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const scrollRef = useRef<HTMLDivElement>(null);
    if(!post) return null;

    const { comments, count, sendComment, fetchChildComments } = usePost(post._id, commentsLimit, isOpen);

    useImperativeHandle(ref, () => ({
        handleOpen: () => {
          onOpen();
        }
    }));

    return (
        <Modal 
            isOpen={isOpen} 
            size="5xl" 
            backdrop="blur" 
            onClose={onClose} 
            className="h-[95%] overflow-y-scroll"
            radius="sm"
        >
            {post ? (
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalBody className="w-full flex flex-col justify-between items-start h-full">

                        <p className="text-lg font-bold p-4"> 
                            spnbeatz's post
                        </p>
                        <div className="flex flex-col gap-2 h-full overflow-y-scroll scrollbar-hide" ref={scrollRef}>
                            <PostHeader postUser={postUser} date={post.updatedAt} />
                            <PostContent text={post.content.text} />
                            
                            <Attachments attachments={post.content.attachments} />
                            <InteractionCounts postId={post._id} />
                            <Comments 
                                postId={post?._id}
                                comments={comments}
                                limit={commentsLimit}
                                setLimit={setCommentsLimit}
                                count={count}
                                sendComment={sendComment}
                                fetchChildComments={fetchChildComments}
                            />
                        </div>
                        <CommentForm postId={post._id} sendComment={sendComment} />

                    </ModalBody>


                    </>

                )}
                </ModalContent>
            ): (
                <div>
                    loading...
                </div>
            )}


        </Modal>
    )
});