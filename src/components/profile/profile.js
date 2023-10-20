'use client'

import React, {useEffect, useState} from "react";
import { useSearchParams } from 'next/navigation'
import { useSession,signOut } from "next-auth/react";
import {BiSolidUpArrow} from 'react-icons/bi'
import Link from "next/link";
import Image from "next/image";
import moneyImg from '@/images/money-bag-@2x.png'
import nullUser from '@/images/user.png';
import { fetchUserPosts , fetchUserData} from "@/lib/api-util";


const  Profile = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id')

    const { data: session, status } = useSession();
    const bearerToken = session?.accessToken;
 
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);

    const [userDetails, setUserDetails] = useState([])
     


    const handleLoadMore = async () => {
      try{
        const nextPage = page + 1;
        const newData = await fetchUserPosts(nextPage);
        setPage(nextPage);
      } catch (error) {
        console.error('Error loading more posts:', error);
      }
    };

  

    const handleImageError = (e) => {
      e.target.onerror = null; 
      e.target.src = nullUser.src; 
    };
 
  useEffect(() => {
    
    fetchUserData(userId, bearerToken)
      .then((data)=> {
        setUserDetails(data)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })

     fetchUserPosts( page, userId)
      .then((data)=> {
        setPosts((prevPosts) => [...prevPosts, ...data])
      })
      .catch((error) =>{
        console.error('Error:', error);
      })

 
    
  }, [page]);
  
  

  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">

          <div
            className="mb-12 lg:mb-0 w-full  ">
            <div className=" mb-6">

            <div className="flex space-x-4 mb-3">
            <div className="w-20">
              <img
                className="absolute object-cover rounded-2xl w-20 h-20"
                src={userDetails?.imageUrl}
                onError={handleImageError}
                alt="Person"
                />
            </div>
            <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
                <p className="text-lg font-bold text-white">{userDetails?.username}</p>
                <p className="mb-4 text-xs text-neutral-600">{userDetails?.first_name + " " +  userDetails?.last_name}</p>
                
                <div className="flex items-center space-x-2">
                        <Image src={moneyImg} alt="money bag image" height={10} width={20} /> 
                        <p className="text-sm text-center text-gray-200 font-semibold">
                            <span className="default-green">{userDetails?.walletBalance} <BiSolidUpArrow className="inline-block w-3"/></span> 
                        </p>
                </div>
            </div>
            </div>
            <div className="border-b mb-5 w-64 border-neutral-400"/>
          

              <div
               className="grid grid-cols-2 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-6 ">
                {posts?.map((post,index) =>(
                   <div key={index} >
                    <Link href={`/market/${post.post_id}`}>
                      <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                      <img
                        className="absolute object-cover w-full h-full rounded"
                        src={post.photos[0]}
                        alt="book background image"
                      />
                    </div>
                    </Link>
                   <div className="flex flex-col ">
                   <p className="text-sm text-white font-bold">{post.title}</p>
                     <p className="mb-2 text-xs text-gray-200">
                       {post.location}
                     </p>
                     <p className="mb-2 text-xs text-gray-200 font-semibold">
                       Mkt : <span className="default-green">{post.market_price} <BiSolidUpArrow className="inline-block w-3 h-2.5"/></span> 
                     </p>
                     <p className="mb-2 text-xs text-gray-200 font-semibold">
                       Ask: {post.last_price}
                     </p>
                     
                   </div>
                 </div>

                ))}

              </div>

              <div className="mt-4 flex justify-center">
                <button onClick={handleLoadMore} className="text-gray-900 font-semibold p-2 default-yellow-bg rounded-lg w-36">Load more</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



export default Profile;









