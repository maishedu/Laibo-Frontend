'use client'
import React, {useState, useEffect} from 'react'
import { FaPlus } from "react-icons/fa";
import { useSession} from "next-auth/react";
import { applyOverdraft } from '@/lib/api-util';
import SnackBar from '../snackBar';

const Applyloan = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [kraPin, setKraPin] = useState([]);
    const [upload, setUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
      };
    const handleApplyOverdraft = (e) => {
        e.preventDefault();
        
       applyOverdraft(selectedFile,kraPin,bearerToken)
       .then((data)=>{
        if(data.status === 1){
            setShowAlert(data.message);
            setUpload(false)
            setKraPin("")
        }else {
            setSeverity('warning')
            setShowAlert('An error occured, try again!')

        }
       })
    }  

  return (
    <div className='overflow-hidden py-16 bg-black min-h-screen relative h-2/4'>
     <div className="px-4  py-16 mx-auto  flex justify-center sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
     {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
      <div className="mx-auto   items-center ">
      <div className="flex flex-col justify-center w-full">
      <div className="px-5 py-5 pb-5 mt-5 rounded ">
        <div onClick={()=> setUpload(true)} className='flex  flex-col px-2  justify-center mb-2 bg-neutral-400 w-full h-32 rounded-xl items-center py-5'>
            <FaPlus className='w-10 h-10'/>
            {upload ? (
            <div className='bg-white py-2 px-2 rounded-lg'>
                <input
                    className=" "
                    type="file"
                    name="file"
                    webkitdirectory
                    onChange={changeHandler}
                />
                {isSelected ? (
                    <div className=''></div>
                ) : (
                    <p className=''>Select a file to show details</p>
                )}

                </div>
            ) : null}
        </div>

        

        <div className='items-center text-center space-y-3 text-white mt-4'>
            <p>Upload indentification document</p>
            <p>(National ID/Passport)</p>
        </div>

        <div className="mt-6 mb-1 sm:mb-2 text-sm">
            <label
                htmlFor="pin"
                className="inline-block text-start mb-1 text-sm text-gray-500"
            >
                KRA pin
            </label>
            <input
                placeholder="A0135HF78HD"
                value={kraPin}
                onChange={({ target }) => setKraPin(target?.value)}
                required
                type="text"
                className="flex-grow w-full text-center text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-700   rounded-lg shadow-sm  "
                id="pin"
                name="pin"
            />
        </div>
        <div className="mt-4 mb-2 flex justify-center sm:mb-4">
            <button
            onClick={handleApplyOverdraft}
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

export default Applyloan