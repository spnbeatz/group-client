import { formatDate } from "@/config/dateFormat"

export const CommentDate = ({date}: {date: string | undefined}) => {
    return (
        <p className="text-xs text-slate-500">
            {date && formatDate(date, "chat")}
        </p>
    )
}