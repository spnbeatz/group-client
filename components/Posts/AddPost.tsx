"use client"

import { useState } from "react";
import { Panel } from "../Panel";
import { Avatar } from "@heroui/avatar";
import { Textarea } from "@heroui/input";

import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { SelectedFiles } from "./SelectedFiles";
import { PostProps } from "@/types";
import { EmoticonButton } from "../Buttons/EmoticonButton";
import { usePostMutation } from "@/queries/usePosts";

import { ImageButton } from "../Buttons/ImageButton";

export const AddPost = ({
    insertNewPost
} : {
    insertNewPost: (newPost: PostProps) => void
}) => {
    const { createPost } = usePostMutation();
    const { userData } = useSelector((state: RootState) => state.auth);
    const [ selectedFiles, setSelectedFiles ] = useState<File[]>([]);
    const [ postTextValue, setPostTextValue ] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files; // Pobranie wszystkich plików
        if (files) {
            setSelectedFiles(Array.from(files));
          } else {
            setSelectedFiles([]);
          }
      };

      const removeFileFromList = (removeIndex: number) => {
        const updatedList = selectedFiles.filter((_, index) => index !== removeIndex);
        setSelectedFiles(updatedList);
    };

    const addEmojiToText = (emoji: string) => {
        const newText = postTextValue + emoji;
        setPostTextValue(newText);
    }

    const changePostText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostTextValue(event.target.value);
    }

    const uploadPost = async () => {
        try {
            if(userData) {
                createPost.mutate([selectedFiles, {text: postTextValue, user: userData?._id}], {
                    onSuccess: (data) => {
                        console.log("Post created successfully!");
                        if (data?.post) {
                            insertNewPost(data.post);  // Możesz dodać nowy post do listy
                        }
                    },
                    onError: (error) => {
                        console.error("Error creating post:", error);
                        // Obsługa błędów
                    },
                });
            }

        } catch (error) {
            console.error("Error during createPost mutation:", error);
        }

        setSelectedFiles([]);
        setPostTextValue("");
    }

    return (
        <Panel className="gap-4">
            <div className="flex flex-row items-center justify-between p-2 w-full gap-4">
                <Avatar src={userData?.avatar} size="md" radius="sm" className="flex-shrink-0"/>
                <Textarea 
                    placeholder="Write your post here!" 
                    isClearable 
                    onClear={() => setPostTextValue("")}
                    minRows={1} 
                    value={postTextValue} 
                    onChange={changePostText}/>
                <ImageButton fileChange={handleFileChange}/>
                <EmoticonButton addEmoji={addEmojiToText}/>

            </div>
            <SelectedFiles files={selectedFiles} removeFile={removeFileFromList}/>
            {(selectedFiles.length > 0 || postTextValue.length > 0) && (
                <button 
                    className="w-full h-11 text-xs rounded-md bg-[#7182A1] text-white" 
                    onClick={async () => await uploadPost()}
                >
                    Upload Post
                </button>
            )}
        </Panel>
    )
}

