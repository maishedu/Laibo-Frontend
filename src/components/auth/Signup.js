import React from 'react'
import Image from 'next/image'
import BgImg from '@/images/cashathand 2.png'
import {AiOutlineGoogle} from 'react-icons/ai'
import {FaFacebookF} from 'react-icons/fa'
import Link from 'next/link'

function Signup() {
  return (
  <div className="relative min-h-screen">
    <Image src={BgImg} className='absolute inset-0 min-h-screen  object-cover w-full ' alt='background image'/>
    <div className="relative mx-auto container ">
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl  md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mt-8 lg:mt-1 xl:px-8 xl:w-5/12">
            <div className="bg-black mt-20 h-full w-full lg:w-full rounded-3xl shadow-2xl p-5 sm:p-10">
              <h3 className="mb-2 text-xl default-yellow font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                Sign up 
              </h3>
              <form>
                <p className="text-xs text-center text-white sm:text-sm">
                  Sign up with one of the following options
                </p>
                <div className='flex justify-center mt-2 mb-2 sm:mb-2 space-x-3'>
                    <button className='inline-flex default-green-bg w-full items-center justify-center rounded-lg p-2 text-white'>
                        <AiOutlineGoogle className='w-5 h-5' />
                    </button>
                    <button className='inline-flex default-green-bg p-2 w-full items-center justify-center rounded-lg text-white'>
                        <FaFacebookF className='w-5 h-5'/>
                    </button>

                </div>
                <div className="flex space-x-3 justify-center mb-2  sm:mb-2">
                  
                  <input
                    placeholder="First name"
                    required
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="firstName"
                    name="firstName"
                  />
                  <input
                    placeholder="Last Name"
                    required
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="lastName"
                    name="lastName"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Email"
                    required
                    type="email"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Phone number"
                    required
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="phone"
                    name="phone"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                {/* <select id="basic" class="flex-grow w-full h-12 px-4 mb-2 rounded-xl text-sm transition placeholder:text-slate-400 ">
                  <option selected="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select> */}
                
                  <input
                    placeholder="Gender"
                    required
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="gender"
                    name="gender"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Birthday"
                    required
                    type="date"
                    className="flex-grow w-full h-10  px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="birthday"
                    name="birthday"
                  />
                </div>

                <div className="mt-2  mb-2 sm:mb-4">
                  <button
                    type="submit"
                    className="inline-flex default-yellow-bg items-center justify-center w-full h-10 px-6 font-medium tracking-wide  transition duration-200 rounded-xl shadow-md  focus:shadow-outline focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
                <p className="text-xs text-center text-white sm:text-sm">
                  Already have an account? <Link href={'/login'} className='default-yellow'>Log in</Link>
                </p>
                
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup