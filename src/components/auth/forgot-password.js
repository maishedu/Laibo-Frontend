'use client'
import React, {useState} from 'react'
import Image from 'next/image';
import mobileLogo from '../../images/logo4 copy.png';
import {  sendOTP } from '@/lib/api-util';
import RegisterModal from '@/components/modal/RegisterModal';
import ResetOtp from '@/components/auth/ResetOtp'
import Swal from "sweetalert2";
import {PulseLoader} from 'react-spinners'
import SnackBar from '../snackBar';



const ForgotPassword = () => {
    const [phone, setPhone] = useState([])
    const [otpModal,setOTPModal]=useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setSeverity] = useState("success");

    const handleRequestOtp = (e) => {
        setLoading(true)
        e.preventDefault();
        sendOTP(phone)
        .then((data)=>{
            if(data.status === 1){
                setShowAlert(data.message)
                setOTPModal(true)
            }else {
                Swal.fire(
                    'OTP Sending Failed',
                    ``,
                    'warning' 
                )
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
            <p className="flex justify-center mt-10 text-lg font-semibold tracking-tight text-white  sm:leading-none">
             Reset password
            </p>

            <p className="flex justify-center mt-10 text-sm font-semibold tracking-tight text-gray-600  sm:leading-none">
             Enter phone number that is linked to your account
            </p>
           

            <div className=" mt-10 items-center mb-3 sm:justify-center">
             <div className="mb-1 sm:mb-2">
                  
                  <input
                    placeholder="Phone number"
                    required
                    type="text"
                    className="flex-grow w-full lg:w-80 h-10 px-4 mb-2 transition duration-200 bg-neutral-600 rounded-xl"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={({ target })=> setPhone(target?.value)}
                  />
                </div>

           
            </div>
              
               <div className='flex justify-center mt-8'>
                <button onClick={handleRequestOtp} disabled={loading} className="flex  items-center justify-center w-full lg:w-80 font-semibold rounded-xl  py-2 default-yellow-bg"

                >
                   {loading ? ( <>Please wait <PulseLoader color='black' size={10} /></>) : ('Continue')}
                </button>
               </div>
           
        </div>
        </div>
        <RegisterModal open={otpModal}>
           <ResetOtp phone={phone} />
        </RegisterModal>
    </div>
  )
}

export default ForgotPassword