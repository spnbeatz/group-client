import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Send } from "@mui/icons-material";
import { EmoticonButton } from "../Buttons/EmoticonButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { IComment } from "@/types/posts";

export const CommentForm = ({
    postId,
    sendComment
}: {
    postId: string,
    sendComment: (comment: IComment) => void
}) => {

    const { token, userData } = useSelector((state: RootState) => state.auth);


    const [commentValue, setCommentValue] = useState<string>("");

    const changeCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(event.target.value);
    }

    const addEmoji = (emoji: string) => {
        const newText = commentValue + emoji;
        setCommentValue(newText);
    }

    const submitComment = async () => {
        if (postId && userData?._id && commentValue.length > 0 && token) {
            const comment: IComment = {
                userId: userData._id,
                postId: postId,
                parentCommentId: null,
                content: commentValue
            }

            console.log("Sending comment: ", comment);

            sendComment(comment);
            setCommentValue("")

        }
    }

    return (
        <div
            className="w-full flex flex-col justify-between items-center gap-4 py-2"
        >
            <div className="w-full h-10 flex flex-row justify-between items-center gap-4">
                <EmoticonButton addEmoji={addEmoji} />
                <Input
                    placeholder="Write your comment..."
                    variant="flat"
                    classNames={{
                        inputWrapper: "rounded-lg "
                    }}
                    className="h-10 focus:border-none"
                    onChange={(e) => changeCommentText(e)}
                    value={commentValue}
                />
                <Button
                    onPress={async () => await submitComment()}
                    type="button"
                    className="w-10 h-10 aspect-square flex-shrink-0 bg-white"
                >
                    <Send fontSize="medium" className="text-blue-600" />
                </Button>
            </div>
        </div>


    )
}