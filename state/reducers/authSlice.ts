import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataProps {
  _id: string;
  email: string;
  username: string;
  sex: string;
  avatar: string;
  status: string;
  followers: string[] | null;
  followings: string[] | null;
}

interface AuthState {
  token: string | null;
  userData: UserDataProps | null;
}

const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  userData: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("authToken");
    },
    setUserData: (state, action: PayloadAction<UserDataProps>) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
