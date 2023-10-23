"use client"

import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import GallerySlider from '@/components/GallerySlider';
import {BiSolidUpArrow} from 'react-icons/bi'
import { useParams } from 'next/navigation'
import nullUser from '../../images/user.png';
import { fetchPost } from '@/lib/api-util';


const  Post =  () =>  {


  const params = useParams()
  const postId = params.postId
  const [details, setDetails] = useState([])


  async function fetchData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/postdetails/${postId}`);
    try {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDetails(data?.data)
      return data;

    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  useEffect(() => {
    fetchData()
  }, []);


  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = nullUser.src; 
  };
   

  
  return (
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
    <div className="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    
    {details.type === "Hardcover" ? (
      <div className="grid max-w-screen-lg gap-8 lg:grid-cols-2">
      <div className=" h-96 lg:h-full relative ">
       <div className="flex items-center mb-2">
       <Link href={`/user-profile/?id=${details?.customer_id}`}>
            <p   className="mr-3">
              <img
                src={details.seller_image_url}
                onError={handleImageError}
                alt="avatar"
                className="object-cover w-10 h-10 rounded-2xl shadow-sm"
              />
            </p>
            </Link>
            <div>
              <p
                aria-label="Author"
                className="font-semibold default-yellow "
              >
                {details.seller_first_name}
              </p>
            </div>
            
          </div>

          <GallerySlider
            
            ratioClass="aspect-w-12 aspect-h-11"
            galleryImgs={details?.photos}
            imageClass="rounded-lg"
          />
       </div>

      <div className="flex flex-col justify-center w-96">
        
        <div className="px-5 py-5 pb-5 mt-5 rounded ">
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <h2 className="text-white font-semibold ">Mkt: <span className="default-green">{details.market_price} <BiSolidUpArrow className="inline-block w-3 h-2.5"/></span> </h2>
               <h2 className="text-white font-semibold ">Ask: {details.selling_price}</h2>
               <div className='mb-3 text-center rounded-xl default-yellow-bg px-3 py-2'>
                <button className='rounded-lg text-center font-semibold text-sm'>MAKE OFFER</button>
               </div>
               
            </div>

            <h2 className="default-yellow font-semibold ">Title</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3 ">
               <p className="text-gray-400 ">{details.title}</p>
            </div>

            <h2 className="default-yellow font-semibold ">Author</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-gray-400  ">{details.author}</p>
            </div>

            <h2 className="default-yellow font-semibold ">Location</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-gray-400 ">{details.location}</p>
            </div>

            <h2 className="default-yellow font-semibold ">Condition</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-gray-400  ">{details.book_condition}</p>
            </div>

            <h2 className="default-yellow font-semibold ">Other details</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-gray-400 ">{details.description}</p>
            </div>
          </div>
      </div>
    </div>

    ): 
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="relative">

      
       <div className="flex items-center mb-2">
       <Link href={`/user-profile/?id=${details?.customer_id}`}>
            <p    className="ml-3 lg:ml-16 ">
              <img
                src={details?.seller_image_url}
                onError={handleImageError}
                alt="avatar"
                className="object-cover w-10 h-10 rounded-2xl shadow-sm"
              />
            </p>
            <div>
              <p
                aria-label="Author"
                className="font-semibold default-yellow ml-3"
              >
                {details?.seller_first_name}
              </p>
            </div>
            </Link>
          </div>
     
     

      </div>
      
      <div className="grid max-w-screen-lg gap-8 lg:grid-cols-2 sm:mx-auto">
      
        <div className="grid grid-cols-2 gap-5">
        
          <img
            className="object-cover w-full h-96 rounded shadow-lg"
            src={details?.photos?.[0]}
            alt="post image"
          />
          <img
            className="object-cover w-full h-96 rounded shadow-lg"
            src={details?.photos?.[0]}
            alt="post image"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="pb-4 mb-4 ">
            <h6 className="mb-2 text-center font-semibold  text-white leading-5">
              {details?.market_price}
            </h6>
            <div className='mb-2 flex justify-center'>
            <button className='default-green-bg text-gray-200 p-2 w-32 rounded-lg'>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>


    }
    
   
  </div>
  </div>
  
  )
}

export default Post;





