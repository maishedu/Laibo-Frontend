import React, { FC } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import Link from "next/link";
import { Route } from "@/routers/types";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      <div className="px-4 h-20 lg:container flex justify-between">
        <div className="flex md:flex flex-1 justify-center  space-x-3 sm:space-x-8 lg:space-x-10">
            <div className="self-center">
              <h2 className="text-yellow-300 font-bold text-3xl uppercase ">Laibo</h2>
            </div>
          
        </div>
        <div className="hidden md:flex flex-1 justify-center space-x-3">
            <p className="text-white text-sm self-center" >How it works</p>
            <p className="text-white text-sm self-center" >Authors</p>
            <p className="text-white text-sm self-center" >Press</p>
            <p className="text-white text-sm self-center" >Contact</p>
        </div>

        <div className="hidden md:flex flex-1 justify-center lg:flex-none text-neutral-700 dark:text-neutral-100">
            <div className="hidden lg:flex space-x-3">
            <div className="self-center ">
              <button className="p-2 w-32 font-semibold text-sm rounded-md bg-yellow-400 hover:bg-sky-900 hover:text-white text-gray-700">
                LOG IN
              </button>
            </div>
            <div className="self-center ">
              <button className="p-2 w-32 font-semibold text-sm rounded-md bg-lime-600 hover:bg-sky-900 text-white">
                SIGN UP
              </button>
            </div>
            
          </div>  
        </div>
        <div className="flex space-x-2 md:hidden">
            <MenuBar />
          </div>
      </div>
    </div>
  );
};

export default MainNav2;
