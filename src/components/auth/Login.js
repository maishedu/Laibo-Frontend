import React from 'react'
import Image from 'next/image'
import BgImg from '@/images/cashathand 2.png'
import {AiOutlineGoogle} from 'react-icons/ai'
import {FaFacebookF} from 'react-icons/fa'
import Link from 'next/link'

function Login() {
  return (
  <div className="relative">
    <Image src={BgImg} className='absolute inset-0 object-cover w-full min-h-screen' alt='background image'/>
    <div className="relative ">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full  md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="bg-black w-80 lg:w-96 rounded-3xl mt-4 shadow-2xl p-10 sm:p-10">
              <h3 className="mb-4 text-xl default-yellow font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                Sign in 
              </h3>
              <form>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Username, email or phone"
                    required
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Password"
                    required
                    type="password"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="password"
                    name="password"
                  />
                </div>

                <p className="text-xs text-center text-white sm:text-sm">
                  Sign in with one of the following options
                </p>
                <div className='flex justify-center mt-2 space-x-3'>
                    <button className='inline-flex default-green-bg w-full items-center justify-center rounded-lg p-2 text-white'>
                        <AiOutlineGoogle className='w-5 h-5' />
                    </button>
                    <button className='inline-flex default-green-bg p-2 w-full items-center justify-center rounded-lg text-white'>
                        <FaFacebookF className='w-5 h-5'/>
                    </button>

                </div>

                <div className="mt-4  mb-2 sm:mb-4">
                  <button
                    type="submit"
                    className="inline-flex default-yellow-bg items-center justify-center w-full h-10 px-6 font-medium tracking-wide  transition duration-200 rounded-xl shadow-md  focus:shadow-outline focus:outline-none"
                  >
                    Login
                  </button>
                </div>
                <p className="text-xs text-center text-white sm:text-sm">
                  Dont have an account? <Link href={'/signup'} className='default-yellow'>Sign up</Link>
                </p>
                <p className="text-xs text-center default-yellow sm:text-sm">
                  Forgot you password?
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

export default Login