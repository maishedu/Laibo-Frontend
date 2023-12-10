import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Link from "next/link";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";

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
  const { id,seller_customer_id,buyer_customer_id,buyer_username,seller_username, photos, buyer_first_name, buyer_last_name ,market_price, selling_price, quantity, amount,buyer_image_url  } = taxonomy;
  

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
   
      <Link
      href={'#'}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        className={`flex-shrink-0 relative w-full   rounded-2xl  `}
      >
        <img
          alt=""
          src={photos?.[0] || ""}
          className="object-cover w-full h-full rounded-2xl"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className={`bg-neutral-800 mt-4 p-2 text-center rounded-lg text-white font-semibold `}>
        <Link href={`/user-profile/?id=${buyer_customer_id}&username=${buyer_username}`}>
          <p>Buyer: <span className={`default-green`}>{`@${buyer_username}`}</span> </p>
        </Link>
        <p>Mkt : <span className={`default-green`}>{market_price}</span> </p>
        <p>Ask : {parseFloat(selling_price as string).toFixed(2)}</p>
        <p>Offer : {parseFloat(amount as string).toFixed(2)}</p>
        <p>Quantity : {quantity}</p>

      </div>
      <div className='mt-4 flex space-x-5 justify-between text-xs font-semibold '>
          <button onClick={handleSubmitAccept(id)} className='default-green-bg text-white p-2 w-full rounded-lg '>DEAL</button>
          <button onClick={handleSubmitDeny(id)} className='bg-red-600 text-white p-2 w-full rounded-lg  '>NO DEAL</button>
     </div>
      
    </Link>
    </>
    
  );
};

export default OffersCard;
