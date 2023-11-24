"use client"
import Reac, {useRef, useState} from 'react'
import Image from 'next/image'
import BgImg from '@/images/cashathand 2.png'
import {AiOutlineGoogle} from 'react-icons/ai'
import {FaFacebookF,FaEye, FaEyeSlash} from 'react-icons/fa'

import Link from 'next/link'
import * as sweetalert2 from "sweetalert2";
import {signUp,sendOTP} from "@/lib/api-util";
import RegisterModal from "@/components/modal/RegisterModal";
import Otp from "@/components/auth/Otp";
import React from "react";
import Swal from "sweetalert2";

function Signup() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [phoneNumber,setPhoneNumber]=useState("");
  const [otpModal,setOTPModal]=useState(false);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const gender = useRef(null);
  const dob = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

const submitForm = async (event)=>{
  event.preventDefault();
  if(password.current.value !== confirmPassword.current.value){
    setErrorMessage("Password do not match")
    setTimeout(function(){ setErrorMessage("")}, 3000);
    return;
  }
  const details =JSON.stringify({
    "first_name":firstName.current.value,
    "last_name":lastName.current.value,
    "email":email.current.value,
    "msisdn":phone.current.value,
    "gender":gender.current.value,
    "dob":dob.current.value,
    "password":password.current.value
  })
  const response = await signUp(details);
  if (response.status === 0){
    setErrorMessage(response.message)
    setTimeout(function(){ setErrorMessage("")}, 3000);
    return;
  }else if (response.status === 1){
    Swal.fire(
        'Sign Up Successful',
        `You are now signed up as ${response.data.email}`,
        'success'
    )
    setPhoneNumber(response.data.msisdn)
    const otpResponse = await sendOTP(phoneNumber);
    if (otpResponse.status === 1){
      setOTPModal(true);
    }else {
      Swal.fire(
          'OTP Sending Failed',
          ``,
          'warning'
      )
    }
  }
}

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
              <form onSubmit={submitForm}>
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
                    ref={firstName}
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="firstName"
                    name="firstName"
                  />
                  <input
                    placeholder="Last Name"
                    required
                    ref={lastName}
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
                    ref={email}
                    type="email"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Phone number 254712345678"
                    required
                    ref={phone}
                    type="text"
                    className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="phone"
                    name="phone"
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                <select
                    id="gender"
                    className="flex-grow w-full h-12 px-4 mb-2 rounded-xl text-sm transition placeholder:text-slate-400 "
                    defaultValue={'MALE'}
                    ref={gender}
                >
                  <option value="MALE" disabled>Choose Gender ...</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                </div>
                <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Birthday"
                    ref={dob}
                    pattern="\d{4}-\d{2}-\d{2}"
                    required
                    type="date"
                    className="flex-grow w-full h-10  px-4 mb-2 transition duration-200 bg-white rounded-xl"
                    id="dob"
                    name="dob"
                  />
                </div>
                <div className="relative mb-1 sm:mb-2">

                  <input
                      placeholder="Password"
                      required
                      ref={password}
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
                <div className="relative mb-1 sm:mb-2">
                  <input
                      placeholder="Confirm Password"
                      required
                      ref={confirmPassword}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white rounded-xl"
                      id="confirmPassword"
                      name="confirmPassword"
                  />
                   <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700"
                    >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="mt-2  mb-2 sm:mb-4">
                  {errorMessage &&
                      <div className="default-yellow-bg border border-red-400 text-black px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error</strong>
                        <span className="block sm:inline">{errorMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
                      </div>}
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
    <RegisterModal open={otpModal}>
      <Otp phone={phoneNumber} />
    </RegisterModal>
  </div>
  )
}

export default Signup