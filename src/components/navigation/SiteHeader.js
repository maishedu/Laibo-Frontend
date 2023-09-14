"use client"
import React, { FC, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { Route } from "@/routers/types";
import './siteheader.css';
import {AiOutlineMenu ,AiOutlineClose} from 'react-icons/ai';
import mobileLogo from '../../images/logo4 copy.png';
import Img from "@/images/logo4 copy.png";



const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
   
    setIsMenuOpen(!isMenuOpen);
  };
  

  return (
      <div className={`MainNav2 relative z-10 `}>

        <nav className="fixed z-10 w-full bg-black ">
          <div className="container m-auto px-2 md:px-12 lg:px-7">
            <div className="flex flex-wrap items-center justify-center py-3 gap-6 md:py-4 md:gap-0">
              <input type="checkbox" name="toggle_nav" id="toggle_nav" className="peer hidden"/>
              <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
                {isMenuOpen && (
                  <Link href={'/'} aria-label="logo" onClick={toggleMenu} className=" hidden lg:flex space-x-2 items-center">
                  <span className="secondary-font default-yellow hide-desktop-logo">LAIBO<span className="text-yellow-700 dark:text-yellow-300"></span></span>
                      <Image src={mobileLogo} width={80} className='show-mobile-logo'   alt="mobile logo" />
                </Link>

                )}
                <Link href={'/'} aria-label="logo" className="flex space-x-2 items-center">
                  <span className="secondary-font default-yellow hide-desktop-logo">LAIBO <span className="text-yellow-700 dark:text-yellow-300"></span></span>
                    <Image src={mobileLogo} width={80} className='show-mobile-logo'   alt="home-image" />
                </Link>

                <div className="flex items-center lg:hidden max-h-10">
                  <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative w-10 h-auto p-2 hamburger" onClick={toggleMenu}>
                    {isMenuOpen ? (
                        <AiOutlineClose className="w-5 h-5 text-yellow" />
                    ) : (
                        <AiOutlineMenu className="w-5 h-5 text-yellow" />
                    )}
                  </label>
                </div>
              </div>

              {isMenuOpen && (
            <>
            
            <div className="menu fixed text-white text-center  bg-neutral-600 w-full h-full left-0 top-0 z-10 backdrop-filter">
             <div className="py-16  flex items-center">
             <ul className="tracking-wide justify-center font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <Link href="/how-it-works" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                    <span>How it works</span>
                  </Link>
                </li>
                <li>
                  <Link href="/authors" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                    <span>Authors</span>
                  </Link>
                </li>
                <li>
                  <Link href="/press" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                    <span>Press</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={toggleMenu} className="block md:px-4 transition hover:text-yellow-700">
                    <span>Contact</span>
                  </Link>
                </li>
                <li>
                <Link href={'/login'} onClick={toggleMenu}>
                  <button type="button" className="w-36 p-2.5 text-center rounded-md default-yellow-bg hover:bg-sky-900  transition hover:text-white text-gray-900  ">
                      <span className="block text-yellow-800 dark:text-white font-semibold text-sm">
                          LOG IN
                      </span>
                    </button>
                  </Link>

                </li>
                <li>
                <Link href={'/signup'} onClick={toggleMenu}>
                <button type="button"  className="w-36 p-2.5 text-center text-white rounded-md transition default-green-bg hover:bg-sky-900 ">
                    <span className="block text-yellow-900 font-semibold text-sm">
                        SIGN UP
                    </span>
                </button>
              </Link>
                </li>
              </ul>
             </div>
            </div>
            </>
          )}

           {/* Desktop Menu */}
           <div className="hidden  w-full flex-col  lg:flex lg:flex-row justify-end z-30 items-center gap-y-6  p-6 rounded-xl bg-neutral-600  lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
                <div className="text-white text-center lg:pr-4 w-full ">
                <ul className="tracking-wide justify-center font-medium  text-sm
                         flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                  <li>
                    <Link href={"/how-it-works" }  className="block md:px-4 transition  hover:text-yellow-700">
                      <span>How it works</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/authors" }  className="block md:px-4 transition  hover:text-yellow-700">
                      <span>Authors</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/press" } className="block md:px-4 transition  hover:text-yellow-700">
                      <span>Press</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/contact" }  className="block md:px-4 transition  hover:text-yellow-700">
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </div>
               

             <div className=" lg:flex w-full space-x-3 min-w-max space-y-2
                    border-yellow-200 lg:space-y-0 sm:w-max ">
                      <Link href={'/login'}>
                      <button type="button" className="w-36 p-2.5 text-center rounded-md default-yellow-bg hover:bg-sky-900  transition hover:text-white text-gray-900  ">
                         <span className="block text-yellow-800 dark:text-white font-semibold text-sm">
                             LOG IN
                         </span>
                       </button>
                      </Link>
              <Link href={'/signup'}>
              <button type="button"  className="w-36 p-2.5 text-center text-white rounded-md transition default-green-bg hover:bg-sky-900 ">
                  <span className="block text-yellow-900 font-semibold text-sm">
                      SIGN UP
                  </span>
               </button>
              </Link>
               
             </div>

           </div>
            </div>
          </div>
        </nav>
      </div>
  );
};

export default SiteHeader;
