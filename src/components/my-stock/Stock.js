"use client"
import React, {useState, useEffect} from 'react';
import { fetchUserPosts } from '@/lib/api-util';
import { useSession} from "next-auth/react";
import Link from "next/link";
import locationIcon from "../../images/location icon.svg";
import {BiSolidUpArrow} from 'react-icons/bi';

const Stock = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    

    useEffect(() => {
     fetchUserPosts(page, userId)
      .then((data)=> {
        setPosts(data.data)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
    }, [page, userId]);



  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">

        <div
               className="grid grid-cols-2 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
                {posts?.map((post,index) =>(
                   <div key={index} >
                    <Link href={`/my-stock/${post.post_id}`}>
                      <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                      <img
                        className="absolute object-cover w-full h-full rounded"
                        src={post.photos[0]}
                        alt="book background image"
                      />
                    </div>
                    </Link>
                   <div className="flex flex-col leading-3">
                   <p className="text-lg text-white font-bold mb-[-5px]">{post.title}</p>
                     <p className=" text-lg text-gray-500 mb-[-5px]">
                       {post.location} <img className="inline" src={locationIcon.src} alt="location icon" width="10"/>
                     </p>
                     <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                       Mkt : <span className="default-green">{post.market_price} <BiSolidUpArrow className="inline-block w-3 h-2.5"/></span> 
                     </p>
                     <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                       Ask: {post.last_price}
                     </p>
                     
                   </div>
                 </div>

                ))}

              </div>

      </div>
     </div>
    </div>
  )
}

export default Stock;