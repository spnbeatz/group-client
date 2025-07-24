import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import chatReducer from "./reducers/chatSlice";
import postReducer from "./reducers/postsSlice";

export const store = configureStore({
  reducer: { 
    auth: authReducer,
    chat: chatReducer,
    post: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;