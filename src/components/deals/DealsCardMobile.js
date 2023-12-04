import React, {  useState } from "react";
import { dealResponses } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";


const DealsCardMobile = ({ deals, fetchDeals}) => {
  
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const userId = session?.user.id;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  

  const handleSubmitAccept  = (deal_id, status) => () => {
    const deal_status = 1;
    dealResponses(deal_id,deal_status,status, bearerToken)
    .then((data)=> {
      setShowAlert(data.message);
      fetchDeals(1,userId,bearerToken);
    })
    .catch((error) =>{
      console.error('Error:', error);
    })
    setSeverity('success');
    
  }

  const handleSubmitDeny = (deal_id, status) => () => {
    const deal_status = 0;
    dealResponses(deal_id,deal_status,status, bearerToken)
    .then((data)=> {
      setSeverity('warning');
      setShowAlert(data.message);
      fetchDeals(1,userId,bearerToken);
    })
    .catch((error) =>{
      console.error('Error:', error);
    })
    
  }

  return (
    <>
     {showAlert && <SnackBar showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
     {deals?.map((deal, index)=> (
      <>
      <div key={index} className={`flex flex-row lg:hidden mb-6`} data-nc-id="CardCategory5" >

        <div
          className={`flex-shrink-0 relative  rounded-2xl`}
        >
          <img
            alt=""
            src={deal.photos?.[0] || ""}
            className="object-cover w-40 h-56 rounded-2xl"
            
          />
          
        </div>

        <div className={`mt-2 space-y-4 p-2 text-sm text-start ml-4 rounded-lg text-white font-semibold `}>
            <p className="text-sm">{deal.title}</p>
            <p className="text-neutral-400"> {userId == deal.seller_customer_id ? 'Buyer' : "Seller "}: {userId == deal.seller_customer_id ? deal.buyer_first_name : deal.seller_first_name }  {userId == deal.seller_customer_id ? deal.buyer_last_name : deal.seller_last_name } </p>
            <p className="text-neutral-400">{userId == deal.seller_customer_id ? 'Sold' : "Bought "} : <span className="default-green">{deal.selling_price}</span></p>
            
            {userId == deal.seller_customer_id? (
              <>
               {deal.status === "BID_SELLER_INCOMPLETE_EXCHANGE" ? (
            <>
            <p className="text-xs ">{userId == deal.seller_customer_id ? 'Have you given the book?' : 'Have you received the book?'}</p>
            <div className='mt-2 flex space-x-2 text-sm  font-semibold '>
            <button onClick={handleSubmitAccept(deal.id,deal.status)} className='default-green-bg text-white p-1 rounded-lg w-full'>YES</button>
            <button onClick={handleSubmitDeny(deal.id,deal.status)} className='bg-red-600 text-white p-1 rounded-lg w-full '>NO</button>
          </div>
            </>
          ): 
          <div className="mt-6 flex mb-2 text-sm justify-center text-neutral-400  ">
            <p>
              Pending confirmation from buyer
            </p>
          </div>
          }
              </>
            ):
            <>
             {deal.status === "BID_BUYER_INCOMPLETE_EXCHANGE" ? (
            <>
            <p className="text-xs ">{userId == deal.seller_customer_id ? 'Have you given the book?' : 'Have you received the book?'}</p>
            <div className='mt-2 flex space-x-2 text-sm  font-semibold '>
            <button onClick={handleSubmitAccept(deal.id,deal.status)} className='default-green-bg text-white p-1 rounded-lg w-full'>YES</button>
            <button onClick={handleSubmitDeny(deal.id,deal.status)} className='bg-red-600 text-white p-1 rounded-lg w-full '>NO</button>
          </div>
            </>
          ): 
          <div className="mt-6 flex mb-2 text-sm justify-center text-neutral-400  ">
            <p>
              Pending confirmation from seller
            </p>
          </div>
          }
            </>
            }
           
           

        </div>
        
        </div>
        <hr className="mb-2 lg:hidden"/>
       
      </>
      

     ))}
     

    </>
  
  );
};

export default DealsCardMobile;
