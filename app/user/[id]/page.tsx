"use client"

import { useParams } from 'next/navigation';
import { ColumnWrapper } from '@/components/ColumnWrapper';
import { PageContainer } from '@/components/PageContainer';
import { Panel } from '@/components/Panel';
import { useEffect, useState } from 'react';
import { getUser } from '@/api/user';
import { Avatar } from '@heroui/avatar';
import { Place } from '@mui/icons-material';
import { UserPanel } from '@/components/User/UserPanel';
import { FollowRecomendations } from '@/components/User/FollowRecomendations';
import { ImageList } from '@/components/User/ImageList';
import { Posts } from '@/components/Posts/Posts';

export default function UserPage() {
    const { id } = useParams();

    const [ userData, setUserData ] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUser(id);
            console.log("data", data)
            if(data) {
                setUserData(data);
            }
        }

        fetchUserData();
    }, [id])

    return (
        <div className='w-full h-[100%] flex flex-row justify-center items-start scrollbar-hide gap-4 bg-green-300'>
            <div className=' flex flex-col justify-start items-center w-full  sm:w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 3xl:w-1/2 4xl:w-1/3 bg-red-300'>
                <UserPanel user={userData} id={id} />
                <div className='flex flex-col md:flex-row w-full justify-between items-start scrollbar-hide gap-4'>
                    <div className='flex flex-col items-center justify-start w-full md:w-2/5 scrollbar-hide'>
                        
                        <FollowRecomendations />
                        <ImageList />
                    </div>
                    <div className='flex flex-col justify-start items-center w-full md:w-3/5 scrollbar-hide'>
                        {userData && 
                            <Posts 
                                filter={{userId: userData._id}}
                                className='w-full'
                            />
                        }
                    </div>

                </div>

{/*                 <ColumnWrapper className='w-1/6'>
                    <div>

                    </div>
                </ColumnWrapper> */}
            </div>

        </div>
    )
}