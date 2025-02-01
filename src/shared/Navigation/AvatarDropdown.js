import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import nullUser from '../../images/user.png';
import { FaExclamationCircle } from "react-icons/fa";


const AvatarDropdown =  ({data }) => {
  const isFieldMissing = !data?.first_name || !data?.last_name || !data?.location || !data?.imageUrl;

    const handleImageError = (e) => {
        if (!e.target.dataset.errorHandled) {
            e.target.dataset.errorHandled = "true"; // Mark as handled
            e.target.src = nullUser.src;
            e.target.srcset = nullUser.src// Assign fallback image
        }
    };


  
  return (
    <>
      <Popover className={`AvatarDropdown relative flex `}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`self-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
            >
              <img
                src={data?.imageUrl}
                onError={handleImageError}
                alt="avatar"
                className="relative object-cover w-10 h-10 rounded-2xl shadow-sm"
              />
              {data?.offers + data?.deals > 0 ? (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{data?.offers + data?.deals}</span>
              ):null}
              
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
                      href={"/deals"}
                      className="flex items-center mt-4 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                     
                      <div className="ml-4 space-x-1">
                        <span className="text-sm font-medium ">{"Deals"}</span>
                        <span className="flex-grow text-right">
                          {data?.deals > 0 ? (
                              <button type="button" className="w-4 h-4 text-xs  rounded-full text-white bg-red-500">
                              <span className="p-1">
                                
                                  {data?.deals}
                              </span>
                          </button>
                          ):null}
                        
                      </span>
                      </div>
                    </Link>

                    <Link
                      href={"/offers"}
                      className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="ml-4 space-x-1">
                      <span className="text-sm font-medium ">{"Offers"}</span>
                      <span className="flex-grow text-right">
                        {data?.offers > 0 ? (
                           <button type="button" className="w-4 h-4 text-xs  rounded-full text-white bg-red-500">
                           <span className="p-1">
                             
                               {data?.offers}
                           </span>
                       </button>
                        ):null}
                         
                      </span>

                      </div>
                       
                    </Link>

                    <Link
                      href={"/rich-list"}
                      className="flex items-center mt-1  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"The rich list"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/account"}
                      className="flex items-center   transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Account"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/market"}
                      className="flex items-center mt-1  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"The market"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/my-library"}
                      className="flex items-center  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                     
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"My library"}</p>
                      </div>
                    </Link>

                    <Link
                      href={"/settings"}
                      className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="ml-4 flex space-x-2">
                     
                       <p className="text-sm font-medium ">{"Settings"}</p>
                      {isFieldMissing && <FaExclamationCircle className="text-red-500" />}
                     

                      </div>
                      
                    </Link>
                    <Link
                      href={"/feedback"}
                      className="flex items-center  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                        <div className="ml-2">
                        <p className="text-sm font-medium ">{"Report an issue"}</p>
                        </div>
                    </Link>

                    <hr/>

                    <button
                        className="flex items-center mb-2  transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                    >
                        <div className="ml-4">
                        <p className="text-sm font-medium ">{"Log out"}</p>
                      </div>
                    </button>
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

export default  AvatarDropdown;
