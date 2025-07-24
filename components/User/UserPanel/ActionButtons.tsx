import { PersonAddAlt1, Mail } from "@mui/icons-material"

export const ActionButtons = ({
    onFollow,
    onMessage
} : {
    onFollow?: () => void,
    onMessage: () => void
}) => {
    return (
        <div className='flex flex-row items-center justify-center gap-2'>
            <ButtonWrapper>
                <PersonAddAlt1 className="text-white" style={{ fontSize: "18px"}}/>
                <p className="text-white text-sm">Follow</p>
                
            </ButtonWrapper>
            <ButtonWrapper onClick={() => onMessage()}>
                <Mail className="text-white" style={{ fontSize: "18px"}}/>
                <p className="text-white text-sm">Send message</p>
                
            </ButtonWrapper>
        </div>
    )
}

const ButtonWrapper = ({
    children,
    onClick
} : {
    children: React.ReactNode,
    onClick?: () => void
}) => {
    return (
        <div className="px-5 py-2 gap-2 rounded-md bg-slate-600 flex items-center justify-center" onClick={onClick}>
            {children}
        </div>
    )
}