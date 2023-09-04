import React, { FC } from "react";
import Image from "next/image";
import Img1 from "@/images/press1.jpg";
import Img2 from "@/images/press2.jpg";
import Img3 from "@/images/press3.jpg";
import Img4 from "@/images/press4.jpg";
import Link from "next/link";
import { Route } from "@/routers/types";

const PagePress = () => {
  return (
    <div className={` overflow-hidden bg-black min-h-screen relative`}>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2">
          <div className="transition duration-300 transform  rounded  hover:-translate-y-1  md:text-center">
            <div className="relative">
              <Image
                src={Img1}
                className=" relative flex justify-center self-center inset-0"
                alt="bg-image"
              />
            </div>
            <div className="px-6 py-8  rounded-b sm:px-8">
              <a
                target="_blank"
                href="https://www.youtube.com/watch?v=uXme1P3u3qQ&ab_channel=KTNNewsKenya"
                rel="noopener noreferrer"
              >
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md border border-yellow hover:bg-cyan-500 focus:shadow-outline focus:outline-none"
                >
                  Watch part 1
                </button>
              </a>
            </div>
          </div>

          <div className="transition duration-300 transform  rounded  hover:-translate-y-1  md:text-center">
            <div className="relative">
              <Image
                src={Img2}
                className="relative flex justify-center self-center inset-0"
                alt="bg-image"
              />
            </div>
            <div className="px-6 py-8  rounded-b sm:px-8">
              <a
                target="_blank"
                href="https://www.youtube.com/watch?v=zOThFAO-dYs&ab_channel=KTNNewsKenya"
                rel="noopener noreferrer"
              >
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md border border-yellow hover:bg-cyan-500 focus:shadow-outline focus:outline-none"
                >
                  Watch part 2
                </button>
              </a>
            </div>
          </div>

          <div className="transition self-center duration-300 transform  rounded  hover:-translate-y-1  md:text-center">
            <div className="relative px-5 lg:px-20 ">
              <Image
                src={Img3}
                className="relative flex justify-center self-center inset-0 "
                alt="bg-image"
              />
            </div>
            <div className="px-6  py-8 rounded-b sm:px-8">
              <a
                target="_blank"
                href="https://nation.africa/kenya/life-and-style/mynetwork/i-dropped-out-of-college-but-that-was-not-the-end-4032048"
                rel="noopener noreferrer"
              >
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md border border-yellow hover:bg-cyan-500 focus:shadow-outline focus:outline-none"
                >
                  View article
                </button>
              </a>
            </div>
          </div>

          <div className="transition self-center duration-300 transform  rounded hover:-translate-y-1  md:text-center">
            <div className="relative lg:px-10 ">
              <Image
                src={Img4}
                className="relative flex justify-center self-center inset-0"
                alt="bg-image"
              />
            </div>
            <div className="px-6 py-8  rounded-b sm:px-8">
              <a
                target="_blank"
                href="https://www.kenyans.co.ke/news/82790-meet-24-year-old-university-dropout-who-created-own-book-app"
                rel="noopener noreferrer"
              >
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md border border-yellow hover:bg-cyan-500 focus:shadow-outline focus:outline-none"
                >
                  View article
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePress;
