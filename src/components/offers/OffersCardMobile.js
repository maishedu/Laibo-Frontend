import React, {  useState } from "react";
import Link from 'next/link';
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";


const OffersCardMobile = ({ offers, fetchOffers}) => {
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  
  const handleSubmitAccept  = (deal_id) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    .then((data)=>{
      setSeverity('success');
      setShowAlert(data.message);
      fetchOffers(bearerToken)
    
    })
    
  }

  const handleSubmitDeny = (deal_id) => () => {
    const deal_status = 0;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    .then((data)=> {
      setSeverity('warning');
      setShowAlert(data.message);
      fetchOffers(bearerToken)
    })
    
  }

  return (
    <>
     {showAlert && <SnackBar showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
     {offers?.map((offer, index)=> (
      <>
      <div key={index} className={`flex flex-row lg:hidden mb-6`} data-nc-id="CardCategory5" >

        <div
          className={`flex-shrink-0 relative  rounded-2xl`}
        >
          <img
            alt=""
            src={offer.photos[0] || ""}
            className="object-cover w-40 h-56 rounded-2xl"
            
          />
          
        </div>

        <div className={`mt-0 space-y-4 p-2 text-sm text-start ml-4 rounded-lg text-white font-semibold `}>
            <div className={` mt-0 space-y-3 p-1 text-start rounded-lg text-white font-semibold `}>
              <p>Title: <span className={`default-green`}>{offer.title}</span> </p>
              <Link href={`/user-profile/?id=${offer.buyer_customer_id}&username=${offer.buyer_username}`}>
                <p>Buyer: <span className={`default-green`}>{`@${offer.buyer_username}`}</span> </p>
              </Link>
                <p>Mkt: <span className={`default-green`}>{offer.market_price.toFixed(2)}</span> </p>
                <p>Ask: {offer.selling_price.toFixed(2)}</p>
                <p>Offer: {offer.amount.toFixed(2)}</p>
                <p>Quantity: {offer.quantity}</p>
            </div>
            
            <div className='mt-2 flex space-x-2 text-xs  font-semibold '>
              <button onClick={handleSubmitAccept(offer.id)} className='default-green-bg text-white p-2 rounded-lg   '>DEAL</button>
              <button onClick={handleSubmitDeny(offer.id)} className='bg-red-600 text-white p-2 rounded-lg  '>NO DEAL</button>
            </div>

        </div>
        
        </div>
        <hr className="mb-2 lg:hidden"/>
       
      </>
      

     ))}
     

    </>
  
  );
};

export default OffersCardMobile;
