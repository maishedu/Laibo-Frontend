import React, { useState } from "react";
import Link from "next/link";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession } from "next-auth/react";
import SnackBar from "../snackBar";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Image from 'next/image';

const OffersCardMobile = ({ offers,fetchOffers }) => {
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setSeverity] = useState("success");
  const [page,setPage] = useState(1);

  const handleSubmitAccept = (deal_id) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id, deal_status, bearerToken).then((data) => {
      setSeverity("success");
      setShowAlert(data.message);
      fetchOffers(page,bearerToken);
    });
  };

  const handleSubmitDeny = (deal_id) => () => {
    const deal_status = 0;
    acceptOrDenyDeal(deal_id, deal_status, bearerToken).then((data) => {
      setSeverity("warning");
      setShowAlert(data.message);
      fetchOffers(page,bearerToken);
    });
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
                <p>Return by : 
                  {new Date(offer?.return_date).toLocaleDateString()}
                  
                  </p>
              ):
              <>
              <p>Ask : {parseFloat(offer.amount).toFixed(2)}</p>
                  {offer?.books_exchanged?.length > 0 ? (
                    <p className="">Offer : 
                    <span className="underline text-blue-400 ml-1">{offer?.books_exchanged?.length} books</span>
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
              >
                DEAL
              </button>
              <button
                onClick={handleSubmitDeny(offer.id)}
                className="bg-red-600 text-white p-2 w-full rounded-lg  "
              >
                NO DEAL
              </button>
            </div>

            
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
         <button onClick={handleLoadMore} className="text-gray-900 font-semibold p-2 default-yellow-bg rounded-lg w-36">Load more</button>
      </div>
    </>
  );
};

export default OffersCardMobile;
