
import { IPost } from "@/types/posts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IPost[] = [];

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (_, action: PayloadAction<IPost[]>) => {
            console.log("set posts", action.payload)
            return action.payload;
        },
        insertPost: (state, action: PayloadAction<IPost>) => {
            state.unshift(action.payload);
        }
    }
})

export const { setPosts, insertPost } = postSlice.actions;
export default postSlice.reducer;