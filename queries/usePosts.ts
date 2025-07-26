import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getComments, getChildComments } from "@/api/comments";
import * as post from "@/api/post";
import { IPost } from "@/types/posts";
import { PostsFilter } from "@/types/posts";

export const useCommentsQuery = (postId: string, parentLimit: number) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return useQuery({
        queryKey: ["postcomments", postId, parentLimit],
        queryFn: async () => {
            if (!token) throw new Error("Brak tokena");
            const comments = await getComments(token, postId, parentLimit, 0);
            return comments;
        },
    })
}

export const useChildCommentsQuery = (parentId: string) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return useQuery({
        queryKey: ["childcomments", parentId],
        queryFn: async () => {
            if (!token) throw new Error("Brak tokena");
            const data = await getChildComments(token, parentId);
            return data;
        }
    })
}

export const usePostsQuery = (limit: number, skip: number, filter?: PostsFilter | null) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return useQuery({
        queryKey: ["posts", token, skip, limit],
        queryFn: async () => {
            console.log(token, " use query token")
            if (!token) throw new Error("Brak tokena");
            const posts = await post.getPosts(limit, skip, token, filter || null);
            console.log("fetched posts: ", posts)
            return posts;
        },
        enabled: !!token
    })
}

export const usePostMutation = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const createPost = useMutation<{ post: IPost }, Error, [File[], { text: string, user: string }]>({
        mutationFn: async ([files, value]) => {
            const newPost = await post.sendPostData(files, value, token);
            return newPost
        }
    });

    return { createPost };
};