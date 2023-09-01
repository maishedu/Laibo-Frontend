import React, { FC } from "react";
import Image from 'next/image'
import BgImg1 from '@/images/bg2.jpg'
import BgImg2 from '@/images/bg3.jpg'
import BgImg3 from '@/images/bg4.jpg'
import BgImg4 from '@/images/bg5.jpg'
import BgImg5 from '@/images/bg6.jpg'

const PageHow = () => {
  return (
    <div className={` overflow-hidden bg-neutral-700 min-h-screen relative`}>
      <div className="container  relative mb-32  self-center  max-w-5xl mx-auto">
      <div className="px-4  py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
        <Image src={BgImg1} className="relative flex justify-center self-center inset-0  "  alt="bg-image" />
      </div>
      <div className="px-4  py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
        <Image src={BgImg2} className="relative flex justify-center self-center inset-0  "  alt="bg-image" />
      </div>
      <div className="px-4  py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
        <Image src={BgImg3} className="relative flex justify-center self-center inset-0  "  alt="bg-image" />
      </div>
      <div className="px-4  py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
        <Image src={BgImg4} className="relative flex justify-center self-center inset-0  "  alt="bg-image" />
      </div>
      <div className="px-4  py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
        <Image src={BgImg5} className="relative flex justify-center self-center inset-0  "  alt="bg-image" />
      </div>
      </div>
    </div>
  );
};

export default PageHow;
