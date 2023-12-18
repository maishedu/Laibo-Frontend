"use client"
import React, {useEffect, useState} from 'react'
import Select from '@/shared/Select'
import { useSession,signOut } from "next-auth/react";
import { fetchUserData, sendSTK } from '@/lib/api-util'
import Snackbar from '@/components/snackBar'

const Deposit = () => {
  const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");
    const [btnText, setBtnText] = useState("Deposit")
    

    const [userDetails, setUserDetails] = useState([])
    const fcm = userDetails?.fcm_key;
    const [myNumber,setMyNumber] = useState([])
    const [defaulyNumber,setDefaultNumber] = useState([])
    const [amount, setAmount] = useState([])

    const depositDetails = {
      msisdn: myNumber,
      amount: amount
    }


    const handleChange = (e) => {
      if (e.target.value === "Other"){
          setMyNumber("")
      }
      else{
        setMyNumber(defaulyNumber)
      }

    }

   async function  handleSubmit(e) {
      e.preventDefault();
      setBtnText('Please wait..')
      sendSTK(myNumber,amount,fcm,bearerToken)
      .then((data)=> {
        data.status === 1 ?  setShowAlert(data.message) : setShowAlert(data.message)
      })

    }


    useEffect(() => {
      fetchUserData(userId, bearerToken)
        .then((data)=> {
          setUserDetails(data)
          setMyNumber(data?.msisdn)
          setDefaultNumber(data?.msisdn);
        })
        .catch((error) =>{
          console.error('Error:', error);
        })
  
       
    }, []);


  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {showAlert && <Snackbar showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
      <div className="w-full flex justify-center">
              <div className="rounded shadow-2xl p-7 sm:p-10">
               
                <form onSubmit={handleSubmit}>
                  <div className="mb-1 sm:mb-2 text-sm">
                    <label
                      htmlFor="phone"
                      className="inline-block mb-1 text-sm text-white"
                    >
                      Deposit from
                    </label>
                    <Select
                      required
                      className="flex-grow w-full text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-700  rounded-lg shadow-sm "
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      >
                       
                        <option value="My number" >My number</option>
                        <option value="Other" >Other number</option>
                    </Select>
                  </div>
                  <div className="mb-1 sm:mb-2 text-sm">
                    <label
                      htmlFor="msisdn"
                      className="inline-block mb-1 text-sm text-white"
                    >
                      Number
                    </label>
                    <input
                      placeholder="0700000000"
                      value={myNumber}
                      onChange={({ target }) => setMyNumber(target?.value)}
                      // onChange={handleValueChange}
                      required
                      type="text"
                      className="flex-grow text-white w-full h-10 px-4 mb-2 transition duration-200 bg-neutral-700  rounded-lg shadow-sm "
                      id="msisdn"
                      name="msisdn"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2 text-sm">
                    <label
                      htmlFor="amount"
                      className="inline-block mb-1 text-sm text-white"
                    >
                     Amount
                    </label>
                    <input
                      placeholder="Amount"
                      value={amount}
                      onChange={({ target }) => setAmount(target?.value)}
                      required
                      type="number"
                      className="flex-grow w-full text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-700   rounded-lg shadow-sm  "
                      id="amount"
                      name="amount"
                    />
                  </div>
                  <div className="mt-4 mb-2 flex justify-center sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex  default-yellow-bg items-center justify-center w-40 h-10 px-6 font-medium tracking-wide  transition duration-200 rounded-xl shadow-md "
                    >
                      {btnText}
                    </button>
                  </div>
                 
                </form>
              </div>
            </div>


     </div>
    </div>
  )
}

export default Deposit