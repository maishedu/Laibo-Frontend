'use client'
import React, { useState } from "react";
import Link from "next/link";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession } from "next-auth/react";
import SnackBar from "../snackBar";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Image from 'next/image';
import { BeatLoader } from "react-spinners";
import Popper from "../popper/Popper";
import { CiLocationOn } from "react-icons/ci";

const OffersCardMobile = ({ offers,fetchOffers }) => {
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setSeverity] = useState("success");
  const [page,setPage] = useState(1);
  const [loading, setLoading] = useState(null);
  const [showExchangedBooks, setShowExchangedBooks] = useState()
  

  const handleSubmitAccept = (deal_id) => () => {
    setLoading(deal_id);
    const deal_status = 1;
    acceptOrDenyDeal(deal_id, deal_status, bearerToken)
    .then((data) => {
      setSeverity("success");
      setShowAlert(data.message);
      fetchOffers(page,bearerToken);
    })
    .catch((error) => {
      console.error("Error:", error)
    }).finally(()=>{
      setLoading(null);
    })
  };

  const handleSubmitDeny = (deal_id) => () => {
    setLoading(deal_id)
    const deal_status = 0;
    acceptOrDenyDeal(deal_id, deal_status, bearerToken)
    .then((data) => {
      setSeverity("warning");
      setShowAlert(data.message);
      fetchOffers(page,bearerToken);
    })
    .catch((error) => {
      console.error("Error:", error)
    }).finally(()=>{
      setLoading(null);
    })
  };

  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1; 
      await fetchOffers(nextPage,bearerToken); 
      setPage(nextPage); 
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };


  return (
    <>
      {showAlert && (
        <SnackBar
          showAlert={showAlert}
          alertSeverity={alertSeverity}
          setShowAlert={setShowAlert}
        />
      )}
      <div className="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg">
        {offers?.map((offer, index) => (
          <div key={index}>
            <div className="flex items-center mb-2">
              <Link href={`/profile/${offer.buyer_username}`}>
                <p className="mr-3">
                  <img
                    src={offer.buyer_image_url}
                    // onError={handleImageError}
                    alt="avatar"
                    className="object-cover w-10 h-10 rounded-2xl shadow-sm"
                  />
                </p>
              </Link>
              <div>
                <Link href={`/profile/${offer.buyer_username}`}>
                  <p aria-label="Author" className="font-semibold text-white">
                    @{offer.buyer_username}
                  </p>
                </Link>
              </div>
            </div>
            <Link
              href={"#"}
              className={`nc-CardCategory5 flex flex-col `}
              data-nc-id="CardCategory5"
            >
              <div className={`flex-shrink-0 relative w-full rounded-2xl`}>
                <Image
                    width="100"
                    height="100"
                  alt=""
                  src={offer.photos[0] || ""}
                  className="object-cover w-full h-96 rounded-2xl"
                  sizes="(max-width: 400px) 100vw, 400px"
                />
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
              </div>
            </Link>

            <div
              className={`bg-neutral-800 mt-4 p-2 text-center rounded-lg text-white font-semibold `}
            >
              <p>
                Mkt :{" "}
                <span
                  className={
                    offer.market_change === "UP"
                      ? "default-green"
                      : offer.market_change === "DOWN"
                      ? "text-red-600"
                      : "text-white"
                  }
                >
                  {offer.market_price}
                  {offer.market_change === "UP" ? (
                    <BiSolidUpArrow className="inline-block w-3 h-2.5" />
                  ) : offer.market_change === "DOWN" ? (
                    <BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5" />
                  ) : (
                    ""
                  )}{" "}
                </span>
              </p>
              {offer?.return_date ? (
                <>
                <p>
                    Security : {offer?.security_amount}
                </p>
                <p>Return by : 
                  {new Date(offer?.return_date).toLocaleDateString()}
                  
                  </p>
                  
                  </>
              ):
              <>
              <p>Ask : {parseFloat(offer.amount).toFixed(2)}</p>
                  {offer?.exchanged_books?.length > 0 ? (
                    <p className="">Offer : 
                    <span
                     onClick={()=>setShowExchangedBooks(offer?.exchanged_books)}
                     className="underline cursor-pointer text-blue-400 ml-1">{offer?.exchanged_books?.length} books</span>
                  </p>
                  ):
                  <p>Offer : {parseFloat(offer?.selling_price).toFixed(2)}</p>
                  }
              </>
              }
              
              

              <p>Quantity : {offer.quantity}</p>
            </div>
            <div className="mt-4 flex space-x-5 justify-between text-xs font-semibold ">
              <button
                onClick={handleSubmitAccept(offer.id)}
                className="default-green-bg text-white p-2 w-full rounded-lg "
                disabled={loading === offer.id}
              >
               
                {loading === offer.id ? <BeatLoader size={8} color="#fff" /> : "DEAL"}
              </button>
              <button
                onClick={handleSubmitDeny(offer.id)}
                className="bg-red-600 text-white p-2 w-full rounded-lg  "
                disabled={loading === offer.id}
              >
                
                {loading === offer.id ? <BeatLoader size={8} color="#fff" /> : "NO DEAL"}
              </button>
            </div>

            
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
         <button onClick={handleLoadMore} className="text-gray-900 font-semibold p-2 default-yellow-bg rounded-lg w-36">Load more</button>
      </div>

      <Popper size={"md"} title={'Exchanged books'} open={showExchangedBooks} setOpen={setShowExchangedBooks}>
            <div setOpen={setShowExchangedBooks} className="mx-auto bg-black px-4 py-4 rounded-md">
            <div
               className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
                {showExchangedBooks?.length > 0 ? (
                  <>
                   {showExchangedBooks?.map((post,index) =>(
                   <div key={index} className="" >
                    
                    <div  className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                    <a 
                        href={`/market/${post?.data?.post_id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                      <Image
                          width="200" height="200"
                        className="absolute object-cover w-full h-full rounded"
                        src={post?.data?.photos[0]}
                        alt="book background image"
                      />
                      </a>
                    </div>
                    
                   <div className="flex flex-col  leading-3">
                   <p className="text-lg text-white font-bold mb-[-5px]">{post?.data?.title}</p>
                     <p className=" text-lg text-gray-500 mb-[-5px]">
                       {post?.data?.location} <span className="inline-block"><CiLocationOn className="w-4 h-4"/> </span>
                     </p>
                     <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                       Mkt : <span className="default-green">{post?.data?.market_price} <BiSolidUpArrow className="inline-block w-3 h-2.5"/></span> 
                     </p>
                     <p className=" text-start text-lg text-gray-200 font-semibold mb-[-5px]">
                       Ask:{post?.data?.last_price}
                     </p>
                     
                   </div>
                 </div>

                ))}
                  </>
                ):
                <div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p>You have no books in your library at the moment.</p>
                </div>
                }
               

          </div>

            </div>
           
      </Popper>
    </>
  );
};

export default OffersCardMobile;
