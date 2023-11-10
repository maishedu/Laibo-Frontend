"use client";
import Image from "next/image";
import { CustomLink } from "@/data/types";
import React from "react";
import { BsInstagram, BsTwitter  } from 'react-icons/bs'
import {BiLogoFacebook, BiLogoLinkedin } from 'react-icons/bi'
import  googleLogo from '@/images/google-play.png'

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "About us",
    menus: [
      { href: "/press", label: "Press" },
      { href: "/how-it-works", label: "How it works" },
    ],
  },
  {
    id: "1",
    title: "Support",
    menus: [

      { href: "mailto:support@laibo.co.ke", label: "support@laibo.co.ke" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "/terms-conditions", label: "Terms & conditions" },
      { href: "/privacypolicy", label: "Privacy policy" },
      
    ],
  },


 
];


const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm p-4">
        <h2 className="font-semibold text-neutral-200 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-200 "
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="nc-Footer bg-black relative py-12 lg:py-12">
        <div className="container grid self-center text-center  gap-y-5 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-5 ">
          <div className="flex flex-col items-center p-5">
            <a href="https://play.google.com/store/apps/details?id=ke.co.laibo.mobile&hl=en&gl=US" className="text-neutral-200 ">
              <Image src={googleLogo} className="" alt="google play logo" width={200} />
            </a>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
          

        <div className="m-auto mt-4  text-white flex w-max items-center justify-between space-x-4">
        <a href="https://www.instagram.com/laibo.inc/" aria-label="instagram">
          <BsInstagram className='w-5 h-5'  />
          
        </a>
        <a href="mailto:hello@mail.com" aria-label="facebook">
          <BiLogoFacebook className='w-6 h-6'/>
         
        </a>
        <a href="https://twitter.com/_laibo" title="twitter" target="blank" aria-label="twitter">
          <BsTwitter className='w-5 h-5'/>
          
        </a>
        <a href="#" title="linkedin" target="blank" aria-label="linkedin">
          <BiLogoLinkedin className='w-6 h-6'/>
          
        </a>
      </div>

        <div className="mt-4 text-center">
            <h2 className="text-sm default-yellow tracking-wide">
              {`© ${new Date().getFullYear()} by Laibo | All rights reserved`}
            </h2>
          </div>
         

      </div>
      
    </>
  );
};

export default Footer;
