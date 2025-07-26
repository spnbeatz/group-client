
export const Attachments = ({ attachments }: { attachments?: { type: string;  id: string }[] }) => {
    return (
        <div className="w-full">
                {attachments && attachments.length > 0 && 
                    <div className='relative w-full h-full max-h-[700px] overflow-hidden bg-black'>
                        <img 
 
                            src={`https://cloud.appwrite.io/v1/storage/buckets/67d09acc002a190d5e59/files/${attachments[0].id}/view?project=67d09abf000b0d7f12a5`} 
                            className="w-full h-full object-cover absolute top-0 z-10 blur-lg bg-black"
                            
                        />
                        <img 

                            src={`https://cloud.appwrite.io/v1/storage/buckets/67d09acc002a190d5e59/files/${attachments[0].id}/view?project=67d09abf000b0d7f12a5`} 
                            className="w-full max-h-[700px] h-full object-contain z-20 relative"
                        />

                    </div>}
{/*             {
                attachments?.map((attachment) => {
                    if(attachment.type.split("/")[0] == "image") {
                        return (
                            <div className='relative w-full h-full max-h-[700px] overflow-hidden bg-black'>
                                <img 
                                    key={attachment.id + "blur"} 
                                    src={`https://cloud.appwrite.io/v1/storage/buckets/67d09acc002a190d5e59/files/${attachment.id}/view?project=67d09abf000b0d7f12a5`} 
                                    className="w-full h-full object-cover absolute top-0 z-10 blur-lg bg-black"
                                    
                                />
                                <img 
                                    key={attachment.id} 
                                    src={`https://cloud.appwrite.io/v1/storage/buckets/67d09acc002a190d5e59/files/${attachment.id}/view?project=67d09abf000b0d7f12a5`} 
                                    className="w-full max-h-[700px] h-full object-contain z-20 relative"
                                />
        
                            </div>
                        )
                    }
                })
            } */}
        </div>
    )
}