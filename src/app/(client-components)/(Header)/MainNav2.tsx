import React, { FC, useState } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import Link from "next/link";
import { Route } from "@/routers/types";
import {AiOutlineMenu ,AiOutlineClose} from 'react-icons/ai'

export interface MainNav2Props {
  className?: string;
}



const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      
           <nav className="fixed z-10 w-full bg-black ">
           <div className="container m-auto px-2 md:px-12 lg:px-7">
            <div className="flex flex-wrap items-center justify-center py-3 gap-6 md:py-4 md:gap-0">
                <input type="checkbox" name="toggle_nav" id="toggle_nav" className="peer hidden"/>
                <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
                    <Link href={'/'} aria-label="logo" className="flex space-x-2 items-center">
                        <span className="secondary-font default-yellow">LAIBO <span className="text-yellow-700 dark:text-yellow-300"></span></span>
                    </Link>

                    <div className="flex items-center lg:hidden max-h-10">
                        <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative w-10 h-auto p-2" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <AiOutlineClose className="w-5 h-5 text-yellow" />
                          ) : (
                            <AiOutlineMenu className="w-5 h-5 text-yellow" />
                          )}
                        </label>
                    </div>
                </div>

                <label role="button" htmlFor="toggle_nav" className="hidden peer-checked:block justify-center fixed w-full h-full left-0 top-0 z-10 bg-neutral-600 divide-y-2  backdrop-filter"></label>
                <div className="hidden peer-checked:flex w-full flex-col  lg:flex lg:flex-row justify-end z-30 items-center gap-y-6  p-6 rounded-xl bg-neutral-600  lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
                    <div className="text-white text-center lg:pr-4 w-full  sm:divide-y divide-slate-200">
                        <ul className="tracking-wide justify-center font-medium  text-sm 
                           flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                            <li>
                                <Link href={"/how-it-works" as Route<string> } className="block md:px-4 transition  hover:text-yellow-700">
                                    <span>How it works</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/authors" as Route<string> } className="block md:px-4 transition  hover:text-yellow-700">
                                    <span>Authors</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/press" as Route<string> } className="block md:px-4 transition  hover:text-yellow-700">
                                    <span>Press</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/contact" as Route<string> } className="block md:px-4 transition  hover:text-yellow-700">
                                    <span>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="hidden lg:flex w-full space-x-3 min-w-max space-y-2 
                       border-yellow-200 lg:space-y-0 sm:w-max ">
                        <button type="button" className="w-36 p-2.5 text-center rounded-md default-yellow-bg hover:bg-sky-900  transition hover:text-white text-gray-900  ">
                            <span className="block text-yellow-800 dark:text-white font-semibold text-sm">
                                LOG IN
                            </span>
                        </button>
                        <button type="button"  className="w-36 p-2.5 text-center text-white rounded-md transition default-green-bg hover:bg-sky-900 ">
                            <span className="block text-yellow-900 font-semibold text-sm">
                                SIGN UP
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </div>
  );
};

export default MainNav2;
