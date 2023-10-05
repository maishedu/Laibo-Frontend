'use client'

import React, {useEffect, useState} from "react";
import {BiSolidUpArrow} from 'react-icons/bi'
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import Filter from "../Filter";


export default function  Search() {
  const [posts, setPosts] = useState([]);

  const searchParams = useSearchParams();

  const bookType = searchParams.get('bookType')
  const location = searchParams.get('location')
  const condition = searchParams.get('condition')
  const maxPrice = searchParams.get('maxPrice')
  const minPrice = searchParams.get('minPrice')

  const [searchDetails, setSeachDetails] = useState({
    bookType: "",
    condition: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleValueChange = (e) => {
    setSeachDetails({ ...searchDetails, [e.target.name]: e.target.value})
  }

  
  
    async function searchPosts() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/search?query=&maxPrice=${maxPrice}&condition=${condition}&location=${location}&minPrice=${minPrice}`);
      try {
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setPosts(data)
        return data;
      
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    }
 
  useEffect(() => {
   
    searchPosts();
    
  }, []);


  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col  justify-center lg:flex-row ">
          <div className=" mb-12  w-full">
            <div className=" mb-6">
              <div className="grid gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
                {posts.data?.map((post,index) =>(
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
            </div>
          </div>

          <Filter searchDetails={searchDetails} handleValueChange={handleValueChange} />
        </div>
      </div>
    </div>
  );
}






