import { Avatar } from "@heroui/avatar"
import { CelebrationOutlined } from "@mui/icons-material"

interface UserProps {
    username: string,
    avatar: string,
}

export const BirthdayListItem = ({user}: {user: UserProps}) => {
    return (
        <div className="w-full p-2 flex flex-row justify-start items-center gap-4 rounded-lg hover:bg-indigo-200 cursor-pointer">
            <CelebrationOutlined fontSize="medium" />
            <div className="flex flex-row items-start justify-center gap-1">
                
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-sm">have birthday today!</p>
                
            </div>
        </div>
    )
}