"use client"

import { AddPost } from "./AddPost";
import { useState, useEffect, useRef } from "react";
import { Post } from "./Post";
import { PostProps } from "@/types";
import { usePostsQuery } from "@/queries/usePosts";
import { PostsFilter } from "@/types/posts";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, insertPost } from "@/state/reducers/postsSlice";
import { RootState } from "@/state/store";

export const Posts = ({
    filter,
    className
}: {
    filter?: PostsFilter,
    className?: string
}) => {
    const dispatch = useDispatch();
    const [limit, setLimit] = useState<number>(10);
    const [skip, setSkip] = useState<number>(0);
    const postsContainerRef = useRef<HTMLDivElement | null>(null);

    const { data, isLoading, isSuccess } = usePostsQuery(limit, skip, filter || null);
    const posts = useSelector((state: RootState) => state.post)

    useEffect(() => {
        console.log(posts, " selector posts")
    }, [posts])

    useEffect(() => {
        if (data) {
            dispatch(setPosts(data));
        }
    }, [data])

    const insertNewPost = (newPost: PostProps) => {
        dispatch(insertPost(newPost))
    };

    const handleScroll = () => {
        const container = postsContainerRef.current;
        if (!container) return;

        const bottom = container.scrollHeight === container.scrollTop + container.clientHeight;
        
        if (bottom && !isLoading && !isSuccess) {
            setSkip((prevSkip) => prevSkip + limit); // Zwiększamy skip, by załadować kolejne posty
        }
    };

    return (
        <div
            className={`w-full h-full flex flex-col items-center scrollbar-hide justify-start overflow-y-scroll ${className}`}

            onScroll={handleScroll}
            ref={postsContainerRef}
        >
            <AddPost insertNewPost={insertNewPost} />
            {posts?.map((post: PostProps, index: number) => (
                <Post key={post.createdAt + post.user + index} post={post} />
            ))}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}
