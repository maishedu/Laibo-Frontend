"use client"
import React, {  useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import './siteheader.css';
import {AiOutlineMenu ,AiOutlineClose} from 'react-icons/ai';
import {BiSolidUpArrow} from 'react-icons/bi'
import mobileLogo from '../../images/logo4 copy.png';
import { useSession,signOut } from "next-auth/react";
import moneyImg from '@/images/money-bag-@2x.png'
import piggyBank from '@/images/money-pig.png'

import AvatarDropdown from "@/shared/Navigation/AvatarDropdown";

const AunthenticatedHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;

    const [userDetails, setUserDetails] = useState([])

    async function fetchUserData(userId, bearerToken) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/laibo/api/customer/info/${userId}`;
      const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json' 
      };
    
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers
      });
    
      try {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setUserDetails(data.data)
        console.log(data)
        return data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
      }
    }
    

  const toggleMenu = () => {
   
    setIsMenuOpen(!isMenuOpen);
  };

 

  useEffect(() => {
    fetchUserData(userId,bearerToken)
  }, []);


  return (
    <div className={`bg-neutral-700 fixed w-full z-40  `}>
    
    <nav className="fixed z-10 w-full bg-neutral-700 ">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-center py-3 gap-6 md:py-4 md:gap-0">
          <input type="checkbox" name="toggle_nav" id="toggle_nav" className="peer hidden"/>
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
           
           <div className="flex space-x-3">
           <Image src={piggyBank} alt="money bag image" height={30} width={40} /> 
           <div className="">
              <p className="text-gray-400 text-sm font-semibold">My account</p>
              <span className="text-white "> {userDetails?.walletBalance?.toFixed(2)} <span className="default-yellow">KES</span> </span>
            </div>
            <div className="hidden lg:flex default-yellow-bg h-10  rounded-xl">
                <button className="font-semibold w-32 text-sm ">DEPOSIT</button>
            </div>

           </div>
           

            <div className="flex items-center lg:hidden max-h-10">
              <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative w-10 h-auto p-2 hamburger" onClick={toggleMenu}>
                {isMenuOpen ? (
                    <AiOutlineClose className="w-5 h-5 default-yellow" />
                ) : (
                    <AiOutlineMenu className="w-5 h-5 default-yellow" />
                )}
              </label>
            </div>
          </div>

          

          {isMenuOpen && (
        <>
        
        <div className="menu fixed text-white text-center h-full flex-col justify-between gap-y-6 bg-neutral-600 w-full  left-0 top-0 z-10 backdrop-filter">
         <div className="py-16  flex items-center">
         <ul className="tracking-wide justify-center mt-5 font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
            <li>
              <Link href="/market" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>The market</span>
              </Link>
            </li>
            <li>
              <Link href="/market" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>My stock</span>
              </Link>
            </li>
            <li>
              <Link href="/authors" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Publisher</span>
              </Link>
            </li>
            <li>
              <Link href="/press" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Deals</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Offers</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Reports an issue</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                <span>Logout</span>
              </Link>
            </li>

          </ul>
         </div>
         <div className=" absolute w-full px-6 inset-x-0 mb-4  bottom-0 flex  justify-between  lg:w-max md:px-0 ">
           
             <Link href={'/login'} onClick={toggleMenu}>
                  <button type="button" className="w-36 p-2.5 text-center rounded-md default-yellow-bg hover:bg-sky-900  transition hover:text-white text-gray-900  ">
                     <span className="block text-yellow-800 dark:text-white font-semibold text-sm">
                         DEPOSIT
                     </span>
                   </button>
              </Link>

              <div className="flex space-x-2 justify-center ">
              <Image src={moneyImg} alt="money bag image" height={30} width={40} /> 
                <p className="text-lg text-center text-gray-200 font-semibold">
                  
                  <span className="default-green">{userDetails?.total_stock_value?.toFixed(2)} <BiSolidUpArrow className="inline-block w-3"/></span> 
                </p>
             </div>

            </div>

        </div>
        </>
      )}

     
       <div className="hidden  w-full   lg:flex lg:flex-row justify-end z-30 items-center gap-y-6  p-6 rounded-xl   lg:gap-y-0 lg:p-0   lg:w-8/12">
           
         <div className=" lg:flex w-full space-x-3   lg:space-y-0 sm:w-max ">
             <div className="flex space-x-2 justify-center ">
             <Image src={moneyImg} alt="money bag image" height={30} width={40} /> 
              <p className="text-lg text-center text-gray-200 font-semibold">
                
                <span className="default-green">{userDetails?.total_stock_value?.toFixed(2)} <BiSolidUpArrow className="inline-block w-3"/></span> 
              </p>
             </div>
             <div className="border-r"/>
            <AvatarDropdown/>
         </div>

       </div>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default AunthenticatedHeader