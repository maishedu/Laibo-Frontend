'use client'
import React, {useState, useEffect} from 'react'
import { postFeedback } from '@/lib/api-util'
import { useSession} from "next-auth/react";
import SnackBar from '../snackBar';


const Feedback = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [feedback, setFeedback] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");


    const handleSubmit = () => {
        postFeedback(bearerToken,userId,feedback)
        .then((data)=>{
            if(data.status === 1){
                setShowAlert(data.message)
                setFeedback("")
            }else {
                setSeverity('warning')
                setShowAlert(data.message)
            }
            
        })
    }

  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-8 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-10">
      {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
      <div className="mx-auto  text-center items-center w-full lg:w-5/12 ">
      <div className="flex flex-col justify-center w-full">
      <div className={` px-5 pt-2 lg:mt-12 pb-5  rounded sticky`}>
        <p className='text-neutral-600 text-sm text-center font-semibold mb-2'>Tell us how we can improve our app to give you a better  <br/>  experience on Laibo</p>
      
        <div className="mb-3  rounded-lg bg-neutral-800 text-sm">
            <textarea rows={10}  placeholder="Type your feedback..." name="description"
                value={feedback} onChange={({ target }) => setFeedback(target?.value)}
            className="text-white rounded-lg p-4 bg-neutral-800 w-full"  />
        
        </div>
        <div className="mt-4 mb-2 flex justify-center sm:mb-4">
            <button
            onClick={handleSubmit}
                type="submit"
                className="inline-flex text-gray-900 font-semibold default-yellow-bg items-center justify-center w-40 h-10 px-6  tracking-wide  transition duration-200 rounded-xl shadow-md "
            >
                Submit
            </button>
        </div>

        </div>
        </div>
     </div>
     </div>
    </div>
  )
}

export default Feedback