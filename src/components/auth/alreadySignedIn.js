import React from 'react';
import Image from "next/image";
import BgImg from "@/images/cashathand 2.png";

function AlreadySignedIn({email}) {
    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <Image src={BgImg} className='absolute inset-0 min-h-screen object-cover w-full' alt='background image' />

            <div className="relative px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                    <div className="w-full max-w-xl mt-8 lg:mt-1 xl:px-8">
                        <div className="bg-black w-80 lg:w-full rounded-3xl mt-4 shadow-2xl p-5 sm:p-10">
                            <h3 className="text-center mb-2 text-xl default-yellow font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                User is already signed in
                            </h3>
                            <p className="text-sm text-center text-white sm:text-2xl">
                                {`You are signed in as ${email}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AlreadySignedIn;