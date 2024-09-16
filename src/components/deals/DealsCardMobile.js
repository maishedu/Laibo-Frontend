import React, { useState } from "react";
import { dealResponses } from "@/lib/api-util";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SnackBar from "../snackBar";

const DealsCardMobile = ({ deals, fetchDeals }) => {
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const userId = session?.user.id;
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setSeverity] = useState("success");
  const [page,setPage] = useState(1);

  const handleSubmitAccept = (deal_id, status) => () => {
    const deal_status = 1;
    dealResponses(deal_id, deal_status, status, bearerToken)
      .then((data) => {
        setShowAlert(data.message);
        fetchDeals(1, userId, bearerToken);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setSeverity("success");
  };

  const handleSubmitDeny = (deal_id, status) => () => {
    const deal_status = 0;
    dealResponses(deal_id, deal_status, status, bearerToken)
      .then((data) => {
        setSeverity("warning");
        setShowAlert(data.message);
        fetchDeals(1, userId, bearerToken);
      })
      .catch((error) => {
        console.error("Error:", error);
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
        {deals?.map((deal, index) => (
          <div key={index}>
            <Link
              href={`/deals/${deal.post_id}`}
              className={`flex flex-col  `}
              data-nc-id="CardCategory5"
            >
              <div className="flex items-center mb-2">
                <Link href={`/profile/${deal.buyer_first_name}`}>
                  <p className="mr-3">
                    <img
                      src={deal.buyer_image_url}
                      // onError={handleImageError}
                      alt="avatar"
                      className="object-cover w-10 h-10 rounded-2xl shadow-sm"
                    />
                  </p>
                </Link>
                <div>
                  <Link href={`/profile/${deal.buyer_first_name}`}>
                    <p aria-label="Author" className="font-semibold text-white">
                      @{deal.buyer_first_name}
                    </p>
                  </Link>
                </div>
              </div>

              <div className={`flex-shrink-0 relative w-full rounded-2xl`}>
                <img
                  alt=""
                  src={deal.photos?.[0] || ""}
                  className="object-cover w-full h-96 rounded-2xl"
                  sizes="(max-width: 400px) 100vw, 400px"
                />
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
              </div>
            </Link>

            <div
              className={`bg-neutral-800 mt-2 p-2 text-xs text-center rounded-lg text-white font-semibold `}
            >
              
              <p className="text-neutral-400">
                {userId == deal.seller_customer_id ? "Sold" : "Bought"} :{" "}
                <span className="default-green">{deal?.selling_price}</span>
              </p>

              {userId == deal.seller_customer_id ? (
                <>
                  {status === "BID_SELLER_INCOMPLETE_EXCHANGE" ||
                  status === "BORROW_SELLER_INCOMPLETE_EXCHANGE" ? (
                    <>
                      <p className="text-xs ">
                        {userId == deal.seller_customer_id
                          ? "Have you given the book?"
                          : "Have you received the book?"}
                      </p>
                      <div className="mt-2 flex space-x-2 text-sm  font-semibold ">
                        <button
                          onClick={handleSubmitAccept(deal.id, deal.status)}
                          className="default-green-bg text-white p-1 rounded-lg w-full  "
                        >
                          YES
                        </button>
                        <button
                          onClick={handleSubmitDeny(deal.id, deal.status)}
                          className="bg-red-600 text-white p-1 rounded-lg w-full "
                        >
                          NO
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-6 flex mb-2 text-sm justify-center text-neutral-400  ">
                      <p>Pending confirmation from buyer</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {status === "BID_BUYER_INCOMPLETE_EXCHANGE" ? (
                    <>
                      <p className="text-xs ">
                        {userId == deal.seller_customer_id
                          ? "Have you given the book?"
                          : "Have you received the book?"}
                      </p>
                      <div className="mt-2 flex space-x-2 text-sm  font-semibold ">
                        <button
                          onClick={handleSubmitAccept(id)}
                          className="default-green-bg text-white p-1 rounded-lg w-full  "
                        >
                          YES
                        </button>
                        <button
                          onClick={handleSubmitDeny(id)}
                          className="bg-red-600 text-white p-1 rounded-lg w-full "
                        >
                          NO
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-6 flex mb-2 text-sm justify-center text-neutral-400  ">
                      <p>Pending confirmation from seller</p>
                    </div>
                  )}
                </>
              )}
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

export default DealsCardMobile;
