import React from "react";
import './authors.css'
import Image from "next/image";
import Img1 from "@/images/Publisher screen phone.png";
import Img2 from "@/images/ebook screenshot.png";

function Authors() {
  return (
    <div className="overflow-hidden bg-neutral-700 relative h-2/4">
      <div className="container  relative mb-32 flex self-center  max-w-5xl mx-auto m-20">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg gap-2 lg:grid-cols-2 sm:mx-auto">
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div>
                  <p className="mb-4 text-4xl font-semibold default-yellow ">
                    PROTECT YOUR <br /> WORK FROM <br /> PIRACY!
                  </p>
                  <p className="text-md font-semibold text-white">
                    Stop distributing hard copies, they get scanned <br /> and
                    uploaded on PDF sites Distribute e-books on <br /> Laibo
                    instead. The "blank screenshot" feature <br /> prevents your
                    work from being pirated and ensures <br /> that you get
                    every single shilling from your work.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Image src={Img1} alt="image 1" />
              <Image src={Img2} alt="image 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authors;
