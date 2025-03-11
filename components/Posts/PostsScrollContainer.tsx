import { posts } from "@/config/data"
import { Post } from "./Post"

export const PostsScrollContainer = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-4 w-1/3 h-full overflow-y-scroll" style={{scrollbarWidth: "none"}}>
            {posts.map((post) => {
                return (
                    <Post key={post.user.toString()} post={post}/>
                )
            })}
        </div>
    )
}