import { PostProps } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PostProps[] = [];

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (_, action: PayloadAction<PostProps[]>) => {
            console.log("set posts", action.payload)
            return action.payload;
        },
        insertPost: (state, action: PayloadAction<PostProps>) => {
            state.unshift(action.payload);
        }
    }
})

export const { setPosts, insertPost } = postSlice.actions;
export default postSlice.reducer;