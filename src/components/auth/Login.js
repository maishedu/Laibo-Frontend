"use client"
import React,{useState,useRef,useEffect} from 'react'
import { signIn } from "next-auth/react";
import Image from 'next/image'
import BgImg from '@/images/cashathand 2.png'
import {AiOutlineGoogle} from 'react-icons/ai'
import {FaFacebookF,FaEye, FaEyeSlash} from 'react-icons/fa'
import Link from 'next/link'
import {login} from "@/lib/api-util";
import Swal from 'sweetalert2'



function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (errorMessage) {
      // Display the error message on the login page
    }
  }, [errorMessage]);
  
  async function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const user = await login(enteredEmail,enteredPassword);
    if (user.status === 0){
      setErrorMessage(user.message);
      return;
    }
    try {
      const result = await signIn("credentials", {
       email:user.data.email,
        id:user.data.id,
        token:user.token,
        redirect:false
      });
      Swal.fire(
          'Login Successful',
          `You are now logged in as ${user.data.email}`,
          'success'
      )

    }catch (error){
      setErrorMessage(error.message);
    }
  }
  return (
  <div className="relative min-h-screen">
    <Image src={BgImg} className='absolute inset-0 object-cover w-full min-h-screen' alt='background image'/>
    <div className="relative ">
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl  md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mt-8 xl:px-8 xl:w-5/12">
            <div className="bg-black mt-20 w-full lg:w-96 rounded-3xl shadow-2xl p-10 sm:p-10">
              <h3 className="mb-4 text-xl default-yellow font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                Sign in
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-1 sm:mb-2">

                  <input
                    placeholder="Username, email or phone"
                    required
                    ref={emailRef}
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="relative mb-1 sm:mb-2">

                  <input
                    placeholder="Password"
                    required
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="password"
                    name="password"
                  />

                    <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700"
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                  {errorMessage &&
                      <div className="default-yellow-bg border border-red-400 text-black px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error</strong>
                        <span className="block sm:inline">{errorMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
                      </div>}
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
                <Link href={'/forgot-password'} >
                  <p className="text-xs mt-4 text-center default-yellow sm:text-sm">
                    Forgot you password?
                  </p>
                </Link>
                
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