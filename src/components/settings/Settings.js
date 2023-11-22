"use client"
import React, {useState, useEffect,useRef} from 'react'
import nullUser from '../../images/user.png';
import { fetchUserData, updateProfilePicture, requestWithdrawal,updateName,updateUsername } from '@/lib/api-util';
import { useSession} from "next-auth/react";
import Popper from '@/components/popper/Popper'
import SettingsModal from './SettingsModal'
import SnackBar from '../snackBar';
import Swal from 'sweetalert2'

const Settings = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [userDetails, setUserDetails] = useState([])
    const [open, setOpen] = useState(false)
    const [showName, setShowName] = useState(false)
    const [showUserName, setShowUserName] = useState(false)
    const [toEdit, setToEdit] = useState([])
    const [changeProfile, setChangeProfile] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");
    const [btnText, setBtnText]= useState('Upload');
    const [amount, setAmount] = useState([]);

    //refs
    const first_name = useRef();
    const last_name = useRef();
    const username = useRef();
//refresh
    const refreshUser = async ()=>{
        fetchUserData(userId, bearerToken)
            .then((data)=> {
                setUserDetails(data)
            })
            .catch((error) =>{
                console.error('Error:', error);
            })
    }
    //update field functions
    const updateNames = async (e)=>{
        e.preventDefault();
        const details = {
            first_name : first_name.current.value,
            last_name : last_name.current.value
        }
        const data = await updateName(bearerToken,details);
        setShowName(false);
        if (data.status === 1){
            await refreshUser()
            Swal.fire({
                title: "Success",
                text: data.message,
                icon: "success"
            });
        }else{
            Swal.fire({
                title: "Failed",
                text: data.message,
                icon: "error"
            });
        }
    }
    const updateUser_Name = async (e)=>{
        e.preventDefault();
        const details = username.current.value;
        const data = await updateUsername(bearerToken,details)
        setShowUserName(false);
        if (data.status === 1){
            await refreshUser()
            Swal.fire({
                title: "Success",
                text: data.message,
                icon: "success"
            });
        }else{
            Swal.fire({
                title: "Failed",
                text: data.message,
                icon: "error"
            });
        }
    }
    const handleImageError = (e) => {
        e.target.onerror = null; 
        e.target.src = nullUser.src; 
      };

      const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
      };

      const handleUpdateProfile = () => {
        setBtnText('Uploading...')
        updateProfilePicture(selectedFile,bearerToken)
        .then((data)=> {
            if(data.status === 1){
                setShowAlert(data.message);
                fetchUserData(userId, bearerToken);
                setChangeProfile(false)
            }else {
                setSeverity('warning')
                setShowAlert('An error occured, try again!')

            }
        })
      }

      const handleWithdraw = () => {
        requestWithdrawal(userDetails.msisdn, amount, bearerToken)
        .then((data)=>{
            if(data.status === 1){
                setShowAlert(data.message);
                setAmount("")
            }else {
                setSeverity('warning')
                setShowAlert('An error occured, try again!')

            }
        })
      
      }



      useEffect(() => {
        fetchUserData(userId, bearerToken)
          .then((data)=> {
            setUserDetails(data)
          })
          .catch((error) =>{
            console.error('Error:', error);
          })
    
         
      }, [userId, bearerToken]);



  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-20">
      {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }

       <div className="mx-auto  text-center items-center w-full lg:w-5/12">
       <div className="flex flex-col justify-center w-full">
        
            {/* <div className="px-5 py-5 pb-5 mt-5 rounded "> */}

            <div className="flex  items-center mb-2">
                
                <div className="flex justify-center w-full ">
                <img
                    src={userDetails.imageUrl}
                    onError={handleImageError}
                    alt="avatar"
                    className="object-cover w-20 h-20 rounded-2xl shadow-sm"
                />
                </div>

                <div className="mb-3 cursor-pointer rounded-xl  bg-white  py-2 w-40  ">
                    <button onClick={() => setChangeProfile(true)} className="text-gray-900 text-xs">{"Edit profile picture"}</button>
                </div>
            </div>
               
           
                {changeProfile ? (
                <div className='bg-white py-2 rounded-lg'>
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

                    <div>
                        <button
                        className="default-yellow-bg p-1 w-28 mt-2 text-gray-900  rounded-xl"
                        onClick={handleUpdateProfile}
                        >
                        {btnText}
                        </button>
                    </div>
                    </div>
                ) : null}
               

                <div className=''>
                    <div className='w-full cursor-pointer'>
                        <h2 className="text-gray-400 text-sm text-start ">Names</h2>  
                        <div onClick={()=>setShowName(true)} className="mb-3 rounded-xl bg-neutral-800 px-3 py-2 ">
                        <p className="text-gray-400 ">{userDetails.first_name} {userDetails.last_name}</p>
                        </div>
                    </div>
                    
                </div>
               

                <h2 className="text-gray-400 text-start  text-sm ">Username</h2>  
                 <div onClick={()=>setShowUserName(true)} className="mb-3 cursor-pointer rounded-xl bg-neutral-800 px-3 py-2">
                 <p className="text-gray-400 ">{userDetails.username}</p>
                </div>

                <h2 className="text-gray-400 text-start text-sm ">Email</h2>  
                 <div className="mb-3 cursor-pointer rounded-xl bg-neutral-800 px-3 py-2">
                 <p className="text-gray-400  ">{userDetails.email}</p>
                </div>

                <h2 className="text-gray-400 text-start text-sm ">Phone number</h2>  
                 <div className="mb-3 rounded-xl cursor-pointer bg-neutral-800 px-3 py-2">
                 <p className="text-gray-400 ">{userDetails.msisdn}</p>
                </div>

                
                <div className='flex space-x-3'>
                    <div className='w-full'>
                    <h2 className="text-gray-400 text-start text-sm ">Password</h2>  
                        <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-2">
                        <p className="text-gray-400 ">{"*******"}</p>
                        </div>
                    </div>
                    
                    <div className="mt-5 cursor-pointer rounded-xl bg-white h-10 py-2  w-full">
                      <button  className="text-gray-900 text-sm">{"Change password"}</button>
                    </div>
                </div>

                <div className='flex space-x-3 mt-4'>
                    <div className="mb-1 sm:mb-2  w-full">
                        <input
                            placeholder="/="
                            value={amount}
                            onChange={({ target }) => setAmount(target?.value)}
                            required
                            type="text"
                            className="flex-grow w-full text-center text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-800 rounded-lg shadow-sm"
                            id="amount"
                            name="amount"
                        />
                    </div>
                    
                    <div className=" cursor-pointer rounded-xl bg-white h-10 py-2  w-full  ">
                      <button onClick={handleWithdraw}  className="text-gray-900 text-sm">{"Withdraw"}</button>
                    </div>
                </div>

                <div className='mt-6'>
                    <p className='text-blue-500 font-semibold'>Delete account</p>
                </div>

          </div>
         </div>
        </div>
        {/* Name modal */}
        <Popper size={"sm"} title={"Update Names"} open={showName} setOpen={setShowName}>
            <SettingsModal setOpen={setShowName} >
                <input type="text" className="m-2 focus:border-black border-teal-700" defaultValue={userDetails.first_name} name="first_name" ref={first_name}/>
                <input type="text" className="m-2" defaultValue={userDetails.last_name} name="first_name" ref={last_name}/>
                <button onClick={updateNames} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>
        {/* User Name modal */}
        <Popper size={"sm"} title={"Update Username"} open={showUserName} setOpen={setShowUserName}>
            <SettingsModal setOpen={setShowUserName} >
                <input type="text" className="m-2 focus:border-black border-teal-700" defaultValue={userDetails.username} name="username" ref={username}/>
                <button onClick={updateUser_Name} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>
    </div>
  )
}

export default Settings