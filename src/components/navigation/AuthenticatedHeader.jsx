"use client"
import React, {  useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import './siteheader.css';
import {BiSolidDownArrow, BiSolidUpArrow} from 'react-icons/bi'
import mobileLogo from '../../images/logo4 copy.png';
import { useSession,signOut } from "next-auth/react";
import moneyImg from '@/images/money-bag-@2x.png'
import bookshelf from '@/images/bookshelf2.png'
import {  fetchUserData} from "@/lib/api-util";
import { usePathname, useRouter } from "next/navigation";
import nullUser from '@/images/user.png';
import { FaExclamationCircle } from "react-icons/fa";
import CustomIcon from '@/shared/CustomIcon/CustomIcon'
import AvatarDropdown from "@/shared/Navigation/AvatarDropdown";


const AuthenticatedHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [userDetails, setUserDetails] = useState([])
    const isFieldMissing = !userDetails?.first_name || !userDetails?.last_name || !userDetails?.location || !userDetails?.imageUrl;
   
    const pathname = usePathname();
    const router  = useRouter()

    const isMarketPage = pathname === '/market';
    
  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);
  };

    const handleImageError = (e) => {
        if (!e.target.dataset.errorHandled) {
            e.target.dataset.errorHandled = "true"; // Mark as handled
            e.target.src = nullUser.src;
            e.target.srcset = nullUser.src// Assign fallback image
        }
    };



    useEffect(() => {
    fetchUserData(userId, bearerToken)
      .then((data)=> {
        setUserDetails(data)
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
  }, []);


  return (
    <div className={`bg-neutral-700 fixed w-full z-40  `}>

    <nav className="fixed z-10 w-full bg-neutral-700 ">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-center py-3 gap-6 md:py-4 md:gap-0">
          <input type="checkbox" name="toggle_nav" id="toggle_nav" className="peer hidden"/>
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">

           <div className="flex space-x-3 ">
           {/*<Image src={piggyBank} alt="money bag image" height={30} width={40} />*/}
           <div className="">
              <p className="text-gray-400 text-xs font-semibold">My account</p>
              <span className="text-white text-xs"> {userDetails?.walletBalance?.toFixed(2)} <span className="default-yellow">KES</span> </span>
            </div>
               <div className="border-r"></div>
            <div className="flex bg-white h-10 items-center text-center  rounded-xl">
              <Link href={`/deposit`}>
               <button className="font-semibold text-center w-16 p-1 text-xs ">DEPOSIT</button>
              </Link>
            </div>
            {/* {isMarketPage && ( */}
              <div className="flex default-yellow-bg h-10 items-center text-center rounded-xl">
                <Link href={`/post`}>
                <button className="font-semibold text-center w-16 p-1 text-xs ">POST</button>
                </Link>
              </div>

            {/* )} */}
           </div>
         
            <div onClick={toggleMenu} className="flex  items-center lg:hidden max-h-10">
            <p  className="relative ml-3 lg:ml-16 ">
                {userDetails?.imageUrl?.length > 1 ? (
                    <Image
                        width="200"
                        height="200"
                        src={userDetails.imageUrl}
                        onError={handleImageError}
                        alt=" desktop avatar"
                        className="relative object-cover w-10 h-10 rounded-2xl shadow-sm"
                    />
                ) : null}

                {userDetails?.offers + userDetails?.deals > 0 ? (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{userDetails?.offers + userDetails?.deals}</span>
              ):null}
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{userDetails?.offers + userDetails?.deals}</span> */}
            </p>
             
            </div>

          </div>
            {isMenuOpen && (
        <>
        
        <div className="menu fixed text-white text-center h-full flex-col justify-between gap-y-6 bg-neutral-600 w-full  left-0 top-0 z-10 backdrop-filter">
         <div className="py-16  flex items-center">
         <ul className="tracking-wide justify-center mt-8 font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
            
            <li>
              <Link href="/deals" onClick={toggleMenu} className="block space-x-2 md:px-4 transition hover:text-yellow-700">
                <span>Deals</span>
                <span className="flex-grow text-right">
                  {userDetails?.deals > 0 ? (
                    <button type="button" className="w-4 h-4 text-xs  rounded-full text-white bg-red-500">
                    <span className="p-1">
                        {userDetails?.deals}
                    </span>
                </button>
                  ):null}
                    
                </span>
              </Link>
            </li>
            <li>
              <Link href="/offers" onClick={toggleMenu} className="block space-x-2 md:px-4 transition hover:text-yellow-700">
                <span>Offers</span>
                <span className="flex-grow text-right">
                  {userDetails?.offers > 0 ? (
                    <button type="button" className="w-4 h-4 text-xs  rounded-full text-white bg-red-500">
                    <span className="p-1">
                       {userDetails?.offers}
                    </span>
                </button>
                  ):null}
                    
                </span>
              </Link>
            </li>
            <li>
              <Link href="/market" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>The market</span>
              </Link>
            </li>
            <li>
              <Link href="/rich-list" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>The rich list</span>
              </Link>
            </li>
           
            <li>
              <Link href="/my-library" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>My library</span>
              </Link>
            </li>
            <li>
              <Link href="/account" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Account</span>
              </Link>
            </li>
           
            
            <li>
              <Link href="/settings" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
              <p>Settings
                <span className="ml-1" >
                   {isFieldMissing && 
                   <FaExclamationCircle className="text-red-500 inline-flex" />
                   }</span>
               </p>
              </Link>
            </li>
            <li>
              <Link href="/feedback" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Reports an issue</span>
              </Link>
            </li>
            

          </ul>
         </div>
         <div className=" absolute w-full px-6 inset-x-0 mb-4  bottom-0 flex  justify-between  lg:w-max md:px-0 ">
           
             
                  <button onClick={() => signOut({ callbackUrl: '/login' })} type="button" className="w-40 p-2.5 text-center rounded-md default-yellow-bg hover:bg-sky-900  transition hover:text-white text-gray-900  ">
                     <span className="block text-yellow-800  font-semibold text-sm">
                         LOG OUT
                     </span>
                   </button>
             

              <div className="flex space-x-2 justify-center items-center">
              <Image src={bookshelf} alt="money bag image" height={30} width={40} /> 
                <p className="text-xl items-center text-center text-gray-200 font-semibold">
                    <span className={userDetails.stock_direction === "UP" ? 'default-green' : userDetails.stock_direction === "DOWN" ? 'text-red-600' : 'text-white'}>{userDetails?.total_stock_value?.toFixed(2)}
                        {userDetails.stock_direction === "UP" ? <BiSolidUpArrow className="inline-block w-3 h-2.5"/> : userDetails.stock_direction === "DOWN" ? < BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5"/> : ''}
                </span>
                </p>
             </div>

            </div>

        </div>
        </>
      )}

     
       <div className="hidden  w-full lg:flex lg:flex-row justify-end z-30 items-center gap-y-6  p-6 rounded-xl   lg:gap-y-0 lg:p-0   lg:w-8/12">
           
         <div className=" lg:flex w-full space-x-3   lg:space-y-0 sm:w-max ">
             <div className="flex space-x-2 items-center ">
             <Image src={bookshelf} alt="money bag image" height={30} width={40} /> 
              <p className="text-lg text-center text-gray-200 font-semibold">
                
                <span className={userDetails.stock_direction === "UP" ? 'default-green' : userDetails.stock_direction === "DOWN" ? 'text-red-600' : 'text-white'}>{userDetails?.total_stock_value?.toFixed(2)}
                    {userDetails.stock_direction === "UP" ? <BiSolidUpArrow className="inline-block w-3 h-2.5"/> : userDetails.stock_direction === "DOWN" ? < BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5"/> : ''}
                </span>

              </p>
             </div>
             <div className="border-r"/>
             <div className=" px-3 space-x-3 flex items-center">
             <AvatarDropdown data={userDetails} />
                 <p className="text-white inline items-center">{userDetails?.username}</p>
             </div>
            
         </div>
       </div>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default AuthenticatedHeader