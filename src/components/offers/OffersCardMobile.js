import React, {  useState } from "react";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";


const OffersCardMobile = ({ offers}) => {
  
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  const [message, setMessage] = useState("")

  const handleSubmitAccept  = (deal_id) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken);
    setSeverity('success');
    setShowAlert(true);
    setMessage('Deal accepted succesfully!');
  }

  const handleSubmitDeny = (deal_id) => () => {
    const deal_status = 0;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken);
    setSeverity('warning');
    setShowAlert(true);
    setMessage('You have rejected the deal!')
  }

  return (
    <>
     {showAlert && <SnackBar message={message} showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
     {offers?.map((offer, index)=> (
      <>
      <div key={index} className={`flex flex-row lg:hidden mb-6`} data-nc-id="CardCategory5" >

        <div
          className={`flex-shrink-0 relative  rounded-2xl`}
        >
          <img
            alt=""
            src={offer.photos || ""}
            className="object-cover w-40 h-56 rounded-2xl"
            
          />
          
        </div>

        <div className={`mt-2 space-y-4 p-2 text-sm text-start ml-4 rounded-lg text-white font-semibold `}>
            <div className={` mt-4 space-y-3 p-2 text-start rounded-lg text-white font-semibold `}>
                <p>Mkt: <span className={`default-green`}>{offer.market_price}</span> </p>
                <p>Ask: {offer.selling_price}</p>
                <p>Offer: {offer.amount}</p>
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
