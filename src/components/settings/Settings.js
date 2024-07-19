"use client"
import React, {useState, useEffect,useRef} from 'react'
import nullUser from '../../images/user.png';
import { fetchUserData, updateProfilePicture, requestWithdrawal,updateName,updateUsername, updateUserEmail, updateUserPassword, updateUserPhone,updateUserLocation } from '@/lib/api-util';
import { useSession} from "next-auth/react";
import Popper from '@/components/popper/Popper'
import SettingsModal from './SettingsModal'
import SnackBar from '../snackBar';
import Swal from 'sweetalert2'
import { FaEye, FaEyeSlash,FaExclamationCircle } from "react-icons/fa";
import CustomIcon from '@/shared/CustomIcon/CustomIcon'

const Settings = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [userDetails, setUserDetails] = useState([])
    const [showName, setShowName] = useState(false)
    const [showUserName, setShowUserName] = useState(false)
    const [showUserEmail, setShowUserEmail] = useState(false)
    const [showUserPassword, setShowUserPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showUserPhone, setShowUserPhone] = useState(false)
    const [showUserLocation, setShowUserLocation] = useState(false)
    const [changeProfile, setChangeProfile] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");
    const [btnText, setBtnText]= useState('Upload');
    const [amount, setAmount] = useState([]);

    const firstName = userDetails?.first_name;
    const lastName = userDetails?.last_name;
    const nameExists = firstName || lastName;


    

    //refs
    const first_name = useRef();
    const last_name = useRef();
    const username = useRef();
    const email = useRef();
    const newPass = useRef();
    const oldPass = useRef();
    const phone = useRef();
    const location = useRef();
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

    const updateUser_Email = async (e)=>{
        e.preventDefault();
        const details = email.current.value;
        const data = await updateUserEmail(bearerToken,details)
        setShowUserEmail(false);
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

    const updateUser_Phone = async (e)=>{
        e.preventDefault();
        const details = phone.current.value;
        const data = await updateUserPhone(bearerToken,details)
        setShowUserPhone(false);
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

    const updateUser_Location = async (e)=>{
        e.preventDefault();
        const details = location.current.value;
        const data = await updateUserLocation(bearerToken,details)
        setShowUserLocation(false);
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

    const updateUser_Password = async (e)=>{
        e.preventDefault();
        const details = {
           newPass: newPass.current.value,
           oldPass: oldPass.current.value
        }
        const data = await updateUserPassword(bearerToken,details)
        setShowUserPassword(false);
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
    };  

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
                setShowAlert(data.message)

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
                        
                         <div
                            onClick={() => setShowName(true)}
                            className="relative mb-3 rounded-xl bg-neutral-800 px-3 py-2 flex items-center justify-between"
                        >
                            <p className="text-gray-400 flex-grow">
                            {nameExists ? `${firstName || ''} ${lastName || ''}`.trim() : "Name not provided"}
                            </p>
                            {!nameExists && <CustomIcon   /> }
                        </div>
                    
                    </div>
                    
                </div>
               

                <h2 className="text-gray-400 text-start  text-sm ">Username</h2>  
                 
                <div
                    onClick={() => setShowUserName(true)}
                    className="relative mb-3 rounded-xl cursor-pointer bg-neutral-800 px-3 py-2 flex items-center justify-between"
                >
                    <p className="text-gray-400 flex-grow text-center">{userDetails.username || "Username not updated"}</p>
                    {!userDetails.username && <CustomIcon   /> }
                </div>

                <h2 className="text-gray-400 text-start text-sm ">Email</h2>  
                
                <div
                    onClick={() => setShowUserEmail(true)}
                    className="relative mb-3 rounded-xl cursor-pointer bg-neutral-800 px-3 py-2 flex items-center justify-between"
                >
                    <p className="text-gray-400 flex-grow text-center">{userDetails.email || "Email not updated"}</p>
                    {!userDetails.email && <CustomIcon   /> }
                </div>

                <h2 className="text-gray-400 text-start text-sm ">Phone number</h2>  
                
                <div
                    onClick={() => setShowUserPhone(true)}
                    className="relative mb-3 rounded-xl cursor-pointer bg-neutral-800 px-3 py-2 flex items-center justify-between"
                >
                    <p className="text-gray-400 flex-grow text-center">{userDetails.msisdn || "Phone number not updated"}</p>
                    {!userDetails?.msisdn && <CustomIcon  /> }
                </div> 

                <h2 className="text-gray-400 text-start text-sm ">Location</h2> 
                <div
                    onClick={() => setShowUserLocation(true)}
                    className="relative mb-3 rounded-xl cursor-pointer bg-neutral-800 px-3 py-2 "
                >
                    <p className="text-gray-400 flex-grow text-center">{userDetails?.location || "Location not updated"}</p>
                    {!userDetails?.location && 
                    <CustomIcon   /> 
                    }
                </div> 
                 

                
                <div className='flex space-x-3'>
                    <div className='w-full'>
                    <h2 className="text-gray-400 text-start text-sm ">Password</h2>  
                        <div className="mb-3 rounded-xl bg-neutral-800 px-3 py-2">
                        <p className="text-gray-400 ">{"*******"}</p>
                        </div>
                    </div>
                    
                    <div className="mt-5 cursor-pointer rounded-xl bg-white h-10 py-2  w-full">
                      <button onClick={()=> setShowUserPassword(true)}  className="text-gray-900 text-sm">{"Change password"}</button>
                    </div>
                </div>

                <div className='flex space-x-3 mt-4'>
                    <div className="mb-1 sm:mb-2  w-full">
                        <input
                            placeholder="/="
                            value={amount}
                            onChange={({ target }) => setAmount(target?.value)}
                            required
                            type="number"
                            className="flex-grow w-full text-center text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-800 rounded-lg shadow-sm"
                            id="amount"
                            name="amount"
                        />
                    </div>
                    
                    <div className=" cursor-pointer rounded-xl default-green-bg h-10 py-2  w-full  ">
                      <button onClick={handleWithdraw}  className="text-gray-200 text-sm">{"Withdraw"}</button>
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
                <input type="text" className="m-2 px-2 py-2 rounded-lg focus:border-black border border-black" defaultValue={userDetails.first_name} name="first_name" ref={first_name}/>
                <input type="text" className="m-2 px-2 py-2 rounded-lg focus:border-black border border-black" defaultValue={userDetails.last_name} name="first_name" ref={last_name}/>
                <button onClick={updateNames} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>
        {/* User Name modal */}
        <Popper size={"sm"} title={"Update Username"} open={showUserName} setOpen={setShowUserName}>
            <SettingsModal setOpen={setShowUserName} >
                <input type="text" className="m-2 px-2 focus:border-black border border-black rounded-lg" defaultValue={userDetails.username} name="username" ref={username}/>
                <button onClick={updateUser_Name} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>
        {/* User Email modal */}
        <Popper size={"sm"} title={"Update Email"} open={showUserEmail} setOpen={setShowUserEmail}>
            <SettingsModal setOpen={setShowUserEmail} >
                <input type="text" className="m-2 px-2 rounded-lg focus:border-black border border-black" defaultValue={userDetails.email} name="email" ref={email}/>
                <button onClick={updateUser_Email} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>
        {/* User Password modal */}
        <Popper size={"sm"} title={"Update Password"} open={showUserPassword} setOpen={setShowUserPassword}>
            <SettingsModal setOpen={setShowUserPassword} >
                <div className='relative'>
                <input type={showPassword ? 'text' : 'password'} placeholder='Current password' className="m-2 px-2 py-2 rounded-lg focus:border-black border border-black" defaultValue={""} name="oldPass" ref={oldPass}

                />
                <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700"
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

                </div>

                <div className='relative'>
                <input type={showNewPassword ? 'text' : 'password'} placeholder='New password' className="m-2 px-2 py-2 rounded-lg focus:border-black border border-black" defaultValue={""} name="newPass" ref={newPass}/>
                <button
                type="button"
                onClick={toggleShowNewPassword}
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700"
                >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

                </div>
                
                <button onClick={updateUser_Password} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>

        {/* User Phone modal */}
        <Popper size={"sm"} title={"Update Phone number"} open={showUserPhone} setOpen={setShowUserPhone}>
            <SettingsModal setOpen={setShowUserPhone} >
                <input type="text" className="m-2 rounded-lg focus:border-black border px-2 border-black" defaultValue={userDetails.msisdn} name="phone" ref={phone}/>
                <button onClick={updateUser_Phone} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>

                {/* user Location modal */}
        <Popper size={"sm"} title={"Update Location"} open={showUserLocation} setOpen={setShowUserLocation}>
            <SettingsModal setOpen={setShowUserLocation} >
                <input type="text" className="m-2 rounded-lg focus:border-black border px-2 border-black" defaultValue={userDetails.location} name="phone" ref={location}/>
                <button onClick={updateUser_Location} className="m-2 bg-black hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Update</button>
            </SettingsModal>
        </Popper>



    </div>
  )
}

export default Settings