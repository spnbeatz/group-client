export interface Reactions {
  likeCount?: number;
  smileCount?: number;
  loveCount?: number;
  angryCount?: number;
}
// STARE: IReactions

interface UsersCount {
  users: string[];
  count: number;
}
// STARE: CountsProps

export interface ReactionKeys {
  like?: UsersCount;
  laugh?: UsersCount;
  angry?: UsersCount;
  love?: UsersCount;
  sad?: UsersCount;
}
// STARE: ReactionKeysProps

export interface ReactionCounts {
  reactions: ReactionKeys;
  total: UsersCount;
}
// STARE: ReactionCountsProps

export interface Reaction {
  id?: string;
  userId: string;
  contentId: string;
  contentType: string;
  reactionType: string;
}
// STARE: ReactionProps