import React, { FC } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
// import AvatarDropdown from "./AvatarDropdown";
// import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import Link from "next/link";
import { Route } from "@/routers/types";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      <div className="px-8 h-20 lg:container flex justify-between">
        <div className="flex md:flex flex-1 justify-center ">
            <div className="self-center">
              <Link href={"/"} className="text-cyellow font-semibold text-3xl uppercase ">Laibo</Link>
            </div>
          
        </div>
        <div className="hidden md:flex flex-1 space-x-3">
            <Link href={"/how-it-works" as Route<string> } className="text-white text-sm self-center" >How it works</Link>
            <Link href={"/authors" as Route<string> } className="text-white text-sm self-center" >Authors</Link>
            <p className="text-white text-sm self-center" >Press</p>
            <Link href={"/contact" as Route<string> } className="text-white text-sm self-center" >Contact</Link>
        </div>

        <div className="hidden md:flex flex-1  lg:flex-none text-neutral-700 dark:text-neutral-100">
            <div className="hidden lg:flex space-x-4">
            <div className="self-center ">
              <button className="p-2.5 w-36 font-medium text-sm rounded-md bg-yellow hover:bg-sky-900 hover:text-white text-gray-900">
                LOG IN
              </button>
            </div>
            <div className="self-center ">
              <button className="p-2.5 w-36 font-medium  text-sm rounded-md bg-green hover:bg-sky-900 text-white">
                SIGN UP
              </button>
            </div>
            
          </div>  
        </div>
        <div className="flex space-x-2 lg:hidden">
            <MenuBar />
          </div>
      </div>
    </div>
  );
};

export default MainNav2;
