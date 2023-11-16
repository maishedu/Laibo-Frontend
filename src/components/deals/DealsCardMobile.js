import React, {  useState } from "react";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";


const DealsCardMobile = ({ deals}) => {
  
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
     {deals?.map((deal, index)=> (
      <>
      <div key={index} className={`flex flex-row lg:hidden mb-6`} data-nc-id="CardCategory5" >

        <div
          className={`flex-shrink-0 relative  rounded-2xl`}
        >
          <img
            alt=""
            src={deal.photos || ""}
            className="object-cover w-40 h-56 rounded-2xl"
            
          />
          
        </div>

        <div className={`mt-2 space-y-4 p-2 text-sm text-start ml-4 rounded-lg text-white font-semibold `}>
            <p className="text-sm">{deal.title}</p>
            <p className="text-neutral-400">Buyer: {deal.buyer_first_name} {deal.buyer_last_name} </p>
            <p className="text-neutral-400">Sold : <span className="default-green">{deal.selling_price}</span></p>
            <p className="text-xs text-neutral-400">Have you given the book?</p>
            <div className='mt-2 flex space-x-2 text-sm  font-semibold '>
              <button onClick={handleSubmitAccept(deal.id)} className='default-green-bg text-white p-1 rounded-lg w-full  '>YES</button>
              <button onClick={handleSubmitDeny(deal.id)} className='bg-red-600 text-white p-1 rounded-lg w-full '>NO</button>
            </div>

        </div>
        
        </div>
        <hr className="mb-2 lg:hidden"/>
       
      </>
      

     ))}
     

    </>
  
  );
};

export default DealsCardMobile;
