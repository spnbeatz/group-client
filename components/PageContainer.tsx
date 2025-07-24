export const PageContainer = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div 
            className={`w-full flex flex-row justify-between gap-4 items-start py-5 ${className}`}
            style={{
                height: "95%"
        }}>
            {children}
        </div>
    )
}