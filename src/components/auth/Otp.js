"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import mobileLogo from '../../images/logo4 copy.png';
import OtpInput from 'react-otp-input';
import {verifyOTP} from "@/lib/api-util";
import Swal from "sweetalert2";

function Otp({phone}){
    const [otp, setOtp] = useState('');
    const router = useRouter()
    const verify = async ()=>{
        const verifyResponse = await verifyOTP(phone,otp);
        if (verifyResponse.status === 0){
            Swal.fire(
                'OTP Verification Failed',
                `You are now signed up as ${verifyResponse.message}`,
                'warning'
            )
            return;
        }else{
            Swal.fire(
                'OTP Verified',
                `You are now signed up`,
                'success'
            )
            router.push('/login');
        }
    }

  return (
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
        <div className="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-lg sm:text-center sm:mx-auto">
            <div className="flex items-center justify-center ">
              <Image src={mobileLogo} width={80}  alt="mobile logo" />
            </div>
            <p className="flex justify-center mt-10 text-lg font-semibold tracking-tight text-white  sm:leading-none">
             Enter confirmation code
            </p>
            <p className="flex justify-center text-base mt-10 text-neutral-700 ">
             Enter the 6 digit confirmation code sent to <br/>
                {phone}
            </p>

            <div className="flex mt-10 items-center mb-3 justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span  style={{
                    fontSize: "7px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }} >{" "}</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                    width: "30px",
                    marginBottom: "10px",
                    textDecorationColor: "white",
                    height: "30px",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    backgroundColor: "ghostwhite",
                    outline: "none",
                  }}
                />
           
            </div>

               <div className='flex justify-center mt-8'>
                <button onClick={verify} className="flex  items-center justify-center w-40 font-semibold rounded-xl  py-2 default-yellow-bg">
                  Verify 
                </button>
               </div>
           
        </div>
        </div>
    </div>
    
  )
}

export default Otp