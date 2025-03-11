export const ColumnWrapper = (
    {
        children,
        className
    }:{
        children: React.ReactNode,
        className?: string
    }) => {
    return (
        <div className={`h-full flex flex-col items-center justify-start ${className} overflow-y-scroll`}>
            {children}
        </div>
    )
}