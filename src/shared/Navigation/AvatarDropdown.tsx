import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import {RxAvatar} from 'react-icons/rx'
interface Props {
  className?: string;
}

export default function AvatarDropdown({ className = "" }: Props) {
  return (
    <>
      <Popover className={`AvatarDropdown relative flex ${className}`}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`self-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
            >
              <RxAvatar sizeClass="w-8  h-8 sm:w-9 sm:h-9" className="text-white h-8 w-8" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 top-full mt-10 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-10 w-40 px-6">

                    <Link
                      href={"/market"}
                      className="flex items-center mt-2  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"The market"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/author"}
                      className="flex items-center  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                     
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"My stock"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/account-savelists"}
                      className="flex items-center  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                     
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Publisher"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/account-savelists"}
                      className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                     
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Deals"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/#"}
                      className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                        <p className="text-sm font-medium ">{"Offer"}</p>
                    </Link>

                    <Link
                      href={"/#"}
                      className="flex items-center   transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                        <p className="text-sm font-medium ">{"Settings"}</p>
                      
                    </Link>
                    <Link
                      href={"/#"}
                      className="flex items-center  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                        <p className="text-sm font-medium ">{"Report an issue"}</p>
                    </Link>

                    <hr/>

                    <Link
                      href={"/#"}
                      className="flex items-center mb-2  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Log out"}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
