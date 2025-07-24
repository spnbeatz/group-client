export const Counts = ({
    counts
} : {
    counts: {
        followers: number,
        followings: number,
        posts: number
    }
}) => {
    return (
        <div className='flex flex-row items-center justify-end gap-4'>
            <CountItem count={counts.followers} label="followers"/>
            <CountItem count={counts.followings} label="followings" />
            <CountItem count={counts.posts} label="posts" />
        </div>
    )
}

const CountItem = ({
    count,
    label,
    onClick
} : {
    count: number,
    label: string,
    onClick?: () => void
}) => {
    return (
        <div className='flex flex-row justify-center items-center gap-1'>
            <p className='text-[14px] font-semibold text-slate-500'>
                {count}
            </p>
            <p className='text-[14px] text-slate-500'>
                {label}
            </p>
        </div>  
    )
}