"use client"
import React, {useState, useEffect} from 'react';
import { fetchUserPosts } from '@/lib/api-util';
import { useSession} from "next-auth/react";
import Link from "next/link";
import locationIcon from "../../images/location icon.svg";
import {BiSolidDownArrow, BiSolidUpArrow} from 'react-icons/bi';
import {BsEmojiFrown} from 'react-icons/bs';
import Loader from '../Loader';

const Stock = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(1);
    

    useEffect(() => {
     fetchUserPosts(page, userId)
      .then((data)=> {
        setPosts(data)
        setLoading(0)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
    }, [page, userId]);



  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">

          {posts?.length > 0 ? (
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
                      Mkt : <span className={post.market_change === "UP" ? 'default-green' : post.market_change === "DOWN" ? 'text-red-600' : 'text-white'}>{post.market_price.toFixed(2)}
                      {post.market_change === "UP" ? <BiSolidUpArrow className="inline-block w-3 h-2.5"/> : post.market_change === "DOWN" ? < BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5"/> : ''} </span>
                  </p>
                  <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                    Ask: {post.last_price.toFixed(2)}
                  </p>
                  
                </div>
              </div>

             ))}

     </div>

          ): loading  === 1 ? <Loader/> :
          <div className='mx-auto items-center py-16'>
          <div className='flex justify-center mb-4'>
          <BsEmojiFrown className="text-neutral-600 flex justify-center items-center text-center h-20 w-20"/>

          </div>
          
          <h2 className='text-neutral-600 text-center'>Oops. No post found</h2>
        </div>  
          }
        

      </div>
     </div>
    </div>
  )
}

export default Stock;