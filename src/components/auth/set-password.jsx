"use client"
import React, {useState} from 'react'
import Image from 'next/image';
import mobileLogo from '../../images/logo4 copy.png';
// import OtpInput from 'react-otp-input';

const Password = () => {

  return (
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
        <div className="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-lg sm:text-center sm:mx-auto">
            <div className="flex items-center justify-center ">
              <Image src={mobileLogo} width={80}  alt="mobile logo" />
            </div>
            <p className=" mt-10 text-lg font-semibold tracking-tight text-white  sm:leading-none">
             Create password
            </p>
           

            <div className=" mt-10 items-center mb-3 sm:justify-center">
             <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="********"
                    required
                    type="password"
                    className="flex-grow w-full lg:w-96 h-10 px-4 mb-2 transition duration-200 bg-neutral-600 rounded-xl"
                    id="password"
                    name="password"
                  />
                </div>

                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="********"
                    required
                    type="password"
                    className="flex-grow w-full lg:w-96 h-10 px-4 mb-2 transition duration-200 bg-neutral-600 rounded-xl"
                    id="newpassword"
                    name="newpassword"
                  />
                </div>
           
            </div>
               <p className='text-white text-xs tracking-tighter'>
                Passwords must have at least 8 characters and contain at least two of the <br /> following: 
                uppercase letters, lowercase letters, numbers and symbols.
               </p>
               <div className='flex justify-center mt-8'>
                <button className="flex  items-center justify-center w-full lg:w-96 font-semibold rounded-xl  py-2 default-yellow-bg">
                  Next 
                </button>
               </div>
           
        </div>
        </div>
    </div>
    
  )
}

export default Password