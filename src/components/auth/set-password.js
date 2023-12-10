"use client"
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import mobileLogo from '../../images/logo4 copy.png';
import { setUserPassword } from '@/lib/api-util';
import { useRouter } from 'next/navigation'
import SnackBar from '../snackBar';
import {PulseLoader} from 'react-spinners'

const Password = () => {
    const router = useRouter()
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setSeverity] = useState("success");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const bearerToken = sessionStorage.getItem('token');
        if (bearerToken === null){
            setShowAlert('Token not Available');
            setTimeout(()=>{
                router.push('/forgot-password')
            },2000)
        }
    },[])

  const handleResetPassword = (e) => {
      const bearerToken = sessionStorage.getItem('token');
      if (bearerToken === null){
          setShowAlert('Token not Available');
          return;
      }
    setLoading(true)
    e.preventDefault();
    if(password.current.value !== confirmPassword.current.value){
      setErrorMessage("Password do not match")
      setTimeout(function(){ setErrorMessage("")}, 3000);
      return;
    }
    setUserPassword(bearerToken,password.current.value)
    .then((data)=>{
      if(data.status === 1){
        setShowAlert(data.message)
          sessionStorage.removeItem('token');
        setTimeout(()=>{
            router.push('/login')
        },2000)

      }else {
        setSeverity('error')
        setShowAlert(data.message);
      }
    })
    .finally(()=>{
      setLoading(false)
  })
  }


  return (
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
      {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
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
                    ref={password}
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
                    ref={confirmPassword}
                    type="password"
                    className="flex-grow w-full lg:w-96 h-10 px-4 mb-2 transition duration-200 bg-neutral-600 rounded-xl"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                </div>
           
            </div>
               <p className='text-white text-xs tracking-tighter'>
                Passwords must have at least 8 characters and contain at least two of the <br /> following: 
                uppercase letters, lowercase letters, numbers and symbols.
               </p>
               <div className='flex justify-center mt-8'>
               {errorMessage &&
                      <div className="default-yellow-bg border border-red-400 text-black px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error</strong>
                        <span className="block sm:inline">{errorMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                      </div>}
                <button onClick={handleResetPassword} disabled={loading} className="flex  items-center justify-center w-full lg:w-96 font-semibold rounded-xl  py-2 default-yellow-bg">
                {loading ? ( <>Please wait <PulseLoader color='black' size={10} /></>) : ('Continue')}
                </button>
               </div>
           
        </div>
        </div>
    </div>
    
  )
}

export default Password