export interface PostsFilter {
    userId?: string
}

export interface IPost {
  _id: string;
  user: string;
  content: {
    text: string;
    attachments?: {
      type: string;
      id: string;
    }[];
  };
  metadata: {
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: string;
  updatedAt: string;
}
// STARE: PostProps

export interface IComment {
  _id?: string;
  userId: string;
  postId: string;
  parentCommentId: string | null;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  childCount?: number;
  childComments?: IComment[];
}
// STARE: CommentProps