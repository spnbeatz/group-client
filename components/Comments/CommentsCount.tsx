import { Tooltip } from "@heroui/tooltip"

export const CommentsCount = () => {
    return (
        <Tooltip
            content="lista nazw uzytkownika"
        >
            <div>
                <p className="text-slate-600 text-medium hover:underline cursor-pointer">
                    121 comments
                </p>
            </div>
        </Tooltip>

    )
}