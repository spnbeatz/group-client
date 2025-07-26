export interface UserMinimal {
  id: string;
  username: string;
  avatar: string;
  status: string;
}
// STARE: MinUserProps

export interface ChatParticipant {
  id: string;
  username: string;
  avatar: string;
  mongoId?: string;
}
// STARE: ChatParticipants

export interface MessageUser {
  username: string;
  avatar: string;
}
// STARE: MessageUserProps

export interface UserDataProps {
  _id: string;
  email: string;
  username: string;
  sex: string;
  avatar: string;
  status: string;
  followers: string[] | null;
  followings: string[] | null;
}

export interface AuthState {
  token: string | null;
  userData: UserDataProps | null;
}
