import { Divider } from "@heroui/divider"

export const PanelLabel = (
    {
        label, 
        className, 
        startContent,
        endContent
    } : {
        label: string, 
        className?: string,
        startContent?: React.ReactNode,
        endContent?: React.ReactNode
    }) => {
    return (
        <div className={`flex flex-col justify-center items-center w-full gap-2 ${className}`}>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="w-full flex gap-2 flex-row justify-start items-stretch">
                    {startContent}
                    <p className="font-semibold text-slate-800 w-full" style={{fontSize: "14px"}}>{label}</p>
                </div>
                {endContent}
            </div>


            <Divider/>
        </div>
    )
}