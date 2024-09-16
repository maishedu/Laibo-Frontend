import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Link from "next/link";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";

export interface OffersCardProps {
  className?: string;
  taxonomy: TaxonomyType;
  fetchOffers:(message:any) => void;
}

const OffersCard: FC<OffersCardProps> = ({
  className = "",
  taxonomy,
  fetchOffers
}) => {
  const { id,title,market_change,seller_customer_id,buyer_customer_id,buyer_username,seller_username, photos, buyer_first_name, buyer_last_name ,market_price, selling_price, quantity, amount,buyer_image_url  } = taxonomy;
  

  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  const [message, setMessage] = useState("")

  const handleSubmitAccept  = (deal_id: string | number) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    .then((data)=>{
      setSeverity('success');
      setShowAlert(data.messsage);
      fetchOffers(bearerToken)

    })
    
  }

  const handleSubmitDeny = (deal_id: string | number) => () => {
    const deal_status = 0;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    .then((data)=>{
      setSeverity('warning');
      setShowAlert(data.message);
      fetchOffers(bearerToken);

    })
    
  }

  return (
    <>
      {showAlert && <SnackBar message={message} showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
      <div className="flex items-center mb-2">
           <Link href={`/profile/${buyer_first_name}`}>
            <p className="mr-3">
              <img
                src={buyer_image_url}
                // onError={handleImageError}
                alt="avatar"
                className="object-cover w-10 h-10 rounded-2xl shadow-sm"
              />
            </p>
            </Link>
            <div>
                <Link href={`/profile/${buyer_first_name}`}>
              <p
                aria-label="Author"
                className="font-semibold text-white"
              >
                @{buyer_first_name}
              </p>
                </Link>
            </div>

          </div>
      <Link
      href={'#'}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
        <div
            className={`flex-shrink-0 relative w-full rounded-2xl`}
        >
          <img
              alt=""
              src={photos?.[0] || ""}
              className="object-cover w-full h-96 rounded-2xl"
              sizes="(max-width: 400px) 100vw, 400px"
          />
          <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
        </div>
      </Link>

      <div className={`bg-neutral-800 mt-4 p-2 text-center rounded-lg text-white font-semibold `}>
        {/* <p>Title : <span className={`default-green`}>{title}</span> </p> */}
        {/* <Link href={`/profile/?id=${buyer_customer_id}&username=${buyer_username}`}>
          <p>Buyer: <span className={`default-green`}>{`@${buyer_username}`}</span> </p>
        </Link> */}
        <p>Mkt : <span className={market_change === "UP" ? 'default-green' : market_change === "DOWN" ? 'text-red-600' : 'text-white'}>{market_price}
          {market_change === "UP" ? <BiSolidUpArrow className="inline-block w-3 h-2.5"/> : market_change === "DOWN" ? < BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5"/> : ''} </span>
        </p>
        <p>Ask : {parseFloat(amount as string).toFixed(2)}</p>
        <p>Offer : {parseFloat(selling_price as string).toFixed(2)}</p>
        <p>Quantity : {quantity}</p>

      </div>
      <div className='mt-4 flex space-x-5 justify-between text-xs font-semibold '>
          <button onClick={handleSubmitAccept(id)} className='default-green-bg text-white p-2 w-full rounded-lg '>DEAL</button>
          <button onClick={handleSubmitDeny(id)} className='bg-red-600 text-white p-2 w-full rounded-lg  '>NO DEAL</button>
     </div>
    </>
    
  );
};

export default OffersCard;
