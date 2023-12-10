'use client'
import React, {useState, useEffect} from 'react'
import { useSession} from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image'
import { fetchRichList } from '@/lib/api-util'
import RichListImg from '@/images/the rich list.png'
import { fetchUserData } from '@/lib/api-util'

const RichList = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;

    const [userDetails, setUserDetails] = useState([])

    const handleLoadMore = async () => {
        try{
          const nextPage = page + 1;
          const newData = await fetchRichList(nextPage);
          setPage(nextPage);
        } catch (error) {
          console.error('Error loading more posts:', error);
        }
      };

      useEffect(() => {
      fetchRichList(page)
      .then((data)=> {
        setPosts((prevPosts) => [...prevPosts, ...data])
      })
      .catch((error) =>{
        console.error('Error:', error);
      })

      fetchUserData(userId, bearerToken)
      .then((data)=> {
        setUserDetails(data)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })



      }, [page]);

  return (
   
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
    <div className="px-4  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="  mx-auto flex justify-center lg:max-w-screen-lg">
      <div>
        <Image
          src={RichListImg}
          className="object-cover w-24 h-24 rounded-2xl shadow"
          alt="Person"
        />
        <div className="flex flex-col justify-center mt-2">
          <span className=' font-bold default-green  text-lg'>{"The rich list"}
            <p className='text-neutral-600 font-semibold inline-block ml-4'>{userDetails?.rank}</p>
          </span>
          
          <p className="mb-4 text-sm text-white">{'(Ranked by stock value)'}</p>
          
        </div>
      </div>
    </div>

   
    {posts?.map((post,index)=> (
      
      <div key={index}  className='mx-auto  px-5 flex justify-center lg:w-96 '>

       <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
       <tbody>
            <tr class="flex justify-between ">
                <td class="px-2 py-2">
                    <Link href={`/user-profile/?id=${post.id}`}>
                <span className='text-white font-semibold  text-lg'>{post?.rank}
                    <p className='text-neutral-600 font-normal inline-block ml-4'>{post?.first_name} {post?.last_name}</p>
                    </span>
                </Link>
                </td>
               
                <td class="px-2 py-2">
                <p className='default-green font-semibold '>{post?.total_stock_value.toFixed(2)}</p>
                </td>
            </tr>
            </tbody>
         </table>
      </div>
        ))}

        
    <div className="mt-4 flex justify-center">
      <button onClick={handleLoadMore} className="text-gray-900 font-semibold p-2 default-yellow-bg rounded-lg w-36">Load more</button>
    </div>
  </div>
  </div>

  )
}

export default RichList;