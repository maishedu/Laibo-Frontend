"use client"

import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import GallerySlider from '@/components/GallerySlider';
import {BiSolidDownArrow, BiSolidUpArrow} from 'react-icons/bi'
import { useParams } from 'next/navigation'
import nullUser from '../../images/user.png';
import { fetchPost } from '@/lib/api-util';
import Image from 'next/image'


function  Post ({details}) {
  

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = nullUser.src; 
  };
  return (
    <div className='overflow-auto w-full py-16 bg-black min-h-screen relative h-2/4'>
    <div className="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid w-full max-w-screen-lg gap-8 lg:grid-cols-2">
      <div className=" h-96 lg:h-full relative ">
       <div className="flex items-center mb-2">
           <Link href={`/profile/${details?.seller_username}`}>
            <p className="mr-3">
              <Image
                src={details.seller_image_url}
                onError={handleImageError}
                alt="avatar"
                width="200"
                height="100"
                className="object-cover w-10 h-10 rounded-2xl shadow-sm"
              />
            </p>
            </Link>
            <div>
                <Link href={`/profile/${details?.seller_username}`}>
              <p
                aria-label="Author"
                className="font-semibold text-white"
              >
                @{details.seller_username}
              </p>
                </Link>
            </div>

          </div>

          <GallerySlider
            
            ratioClass="aspect-w-12 aspect-h-11"
            galleryImgs={details?.photos}
            imageClass="rounded-lg"
          />
       </div>

      <div className="flex flex-col justify-center w-full">
        
        <div className="px-5 py-5 pb-5 mt-5 rounded ">
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-white font-semibold ">Mkt: <span className={details.market_change === "UP" ? 'default-green' : details.market_change === "DOWN" ? 'text-red-600' : 'text-white'}>
                   {details.market_price.toFixed(2)} {details.market_change === "UP" ? <BiSolidUpArrow className="inline-block w-3 h-2.5"/> : details.market_change === "DOWN" ? < BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5"/> : ''}
               </span> </p>
               <p className="text-white font-semibold ">Ask: {details.selling_price.toFixed(2)}</p>
               
                    <div className='hover:bg-sky-900 mb-3 text-center rounded-xl default-yellow-bg px-3 py-2'>
                    <Link href={`/make-an-offer?id=${details.post_id}`}>
                       <button className='rounded-lg text-center cursor-pointer font-semibold text-sm'>MAKE OFFER</button>
                   </Link>
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

            <h2 className="default-yellow font-semibold ">Book Cover</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-gray-400  ">{details?.type}</p>
            </div>

            <h2 className="default-yellow font-semibold ">Other details</h2>  
            <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-3">
               <p className="text-gray-400 ">{details.description}</p>
            </div>
          </div>
      </div>
    </div>

  </div>
  </div>
  
  )
}

export default Post;





