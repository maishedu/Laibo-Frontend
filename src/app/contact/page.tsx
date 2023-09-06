import React, { FC } from "react";
import Image from 'next/image'
// import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import BgImage from '@/images/contact_bg.png'
import { BsInstagram, BsTwitter  } from 'react-icons/bs'
import {BiLogoFacebook, BiLogoLinkedin } from 'react-icons/bi'


export interface PageContactProps {}

const PageContact: FC<PageContactProps> = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden relative h-4/5`}>
      
         <Image src={BgImage} className="absolute inset-0 object-cover w-full min-h-screen"  alt="bg-image" />
            <h2 className="relative my-8 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-cyellow justify-center pt-16">
              Contact Us
            </h2>
            <div className="relative mb-32 flex self-center bg-cyellow  container max-w-5xl mx-auto ">
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
          
              <div className="grid gap-20 row-gap-8 lg:grid-cols-3">
                <div className="flex">
                 
                  <div>
                    <h6 className="mb-6 font-semibold text-center">Call</h6>
                    <p className="text-sm text-gray-900">
                      +254748429724
                    </p>
                  </div>
                </div>

                <div className="flex">
                 
                  <div>
                    <h6 className="mb-6 font-semibold text-center ">Email</h6>
                    <p className="text-sm text-gray-900">
                      Contact@laibo.co.ke
                    </p>
                  </div>
                </div>

                <div className="flex">
                 
                  <div>
                    <h6 className="mb-6 font-semibold text-center">Follow</h6>
                    <div className="m-auto mt-4  text-gray-900 flex w-max items-center justify-between space-x-4">
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
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>
  );
};

export default PageContact;
