

export const List = (
    {
        children,
        className,
    }:{
        children: React.ReactNode,
        className?: string,
    }) => {
        return (
            <div className={`flex flex-col w-full items-center justify-center ${className}`}>
                {children}
            </div>
        )
}