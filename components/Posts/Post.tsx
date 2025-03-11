import { Avatar } from "@heroui/avatar"
import { Image } from "@heroui/image"


interface PostUser {
    username: string,
    avatar: string,
    id: string
}

interface PostContent {
    text: string,
    image: string
}

interface PostProps {
    user: PostUser,
    content: PostContent
}

export const Post = ({post}: {post: PostProps}) => {
    return (
        <div className="w-full rounded-md bg-white p-6 flex flex-col justify-center items-start gap-4 shadow-md mt-6">
            <div className="flex flex-row justify-center items-center gap-2">
                <Avatar src={post.user.avatar} size="md" />
                <div className="flex flex-col items-start justify-center">
                    <p className="text-sm font-semibold text-slate-600">
                        {post.user.username}
                    </p>
                    <p className="text-tiny text-slate-400">
                        @Leader
                    </p>
                </div>
            </div>
            <p className="text-xs text-slate-600">{post.content.text}</p>
            <Image src={post.content.image} className="rounded-sm z-0"/>
        </div>  
    )
}