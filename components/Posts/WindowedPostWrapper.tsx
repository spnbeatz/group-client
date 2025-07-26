import { UserMinimal } from "@/types/user";
import { Close } from "@mui/icons-material";

export const WindowedPostWrapper = ({
    children,
    isWindowed,
    showCommentForm,
    user,
    closeWindow,
    postId
} : {
    children: React.ReactNode,
    isWindowed: boolean,
    showCommentForm: boolean,
    user: UserMinimal | undefined,
    closeWindow: () => void,
    postId: string
}) => {
    return (
        <div className={isWindowed ? "fixed w-full h-full -mt-16 flex flex-col justify-center items-center z-[1000] post-window-bg" : "w-full"}>
            {isWindowed && <div className={isWindowed ? "w-1/3 h-12 flex flex-row items-center justify-between px-6 bg-white" : ""}>
                <div></div>
                <p className="text-slate-600 text-lg font-semibold">
                    {user?.username}'s post
                </p>
                <div onClick={() => closeWindow()}>
                    <Close fontSize="medium" className="text-slate-600"/>
                </div>
            </div>}
            <div className={isWindowed ? "overflow-y-scroll h-[85%] flex-col justify-start items-center flex w-full" : ""}>
                {children}
            </div>
        </div>
    )
}