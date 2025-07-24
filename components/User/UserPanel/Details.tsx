export const Details = ({
    details
}:{
    details: any
}) => {
    return (
        <div className='flex flex-col items-start justify-between'>
            <p className='text-[24px] text-slate-600 font-semibold'>{details?.username}</p>
            <p className='text-[10px] text-slate-500'>{details?.email}</p>

        </div>
    )
}