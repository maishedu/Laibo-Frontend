"use client"
import React, {useState} from 'react'
import Image from 'next/image';
import mobileLogo from '../../images/logo4 copy.png';


const Username = () => {

  return (
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
        <div className="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-lg sm:text-center sm:mx-auto">
            <div className="flex items-center justify-center ">
              <Image src={mobileLogo} width={80}  alt="mobile logo" />
            </div>
            <p className="flex justify-center mt-10 text-lg font-semibold tracking-tight text-white  sm:leading-none">
             Username
            </p>

            <p className="flex justify-center mt-10 text-sm font-semibold tracking-tight text-gray-600  sm:leading-none">
             This is how you'll appear on Laibo
            </p>
           

            <div className=" mt-10 items-center mb-3 sm:justify-center">
             <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="@ wtf_books123"
                    required
                    type="text"
                    className="flex-grow w-full lg:w-80 h-10 px-4 mb-2 transition duration-200 bg-neutral-600 rounded-xl"
                    id="username"
                    name="username"
                  />
                </div>

           
            </div>
              
               <div className='flex justify-center mt-8'>
                <button className="flex  items-center justify-center w-full lg:w-80 font-semibold rounded-xl  py-2 default-yellow-bg">
                  Next 
                </button>
               </div>
           
        </div>
        </div>
    </div>
    
  )
}

export default Username