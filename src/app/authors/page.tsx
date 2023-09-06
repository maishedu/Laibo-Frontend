import React, { FC } from "react";
import Image from 'next/image'
import BgImg from '@/images/bg1.jpg'

const PageAuthors = () => {
  return (
    <div className="overflow-hidden bg-neutral-700 relative h-2/4">
      <div className="container  relative mb-32 flex self-center  max-w-5xl mx-auto m-20">
      <div className="px-4  py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
        <Image src={BgImg} className="relative flex justify-center self-center inset-0  "  alt="bg-image" />
      </div>
      </div>
    </div>
  );
};

export default PageAuthors;
