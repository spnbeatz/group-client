export const Row = (
    {
        children,
        className
    } : {
        children: React.ReactNode,
        className?: string
    }) => {
    return (
        <div className={`flex flex-row justify-center items-center ${className}`}>
            {children}
        </div>
    )
}