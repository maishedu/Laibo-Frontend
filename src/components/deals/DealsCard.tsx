import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import { dealResponses } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";
import Link from "next/link";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
  userid?:string | number;
  fetchDeals:(message:string | number) => void;
}

const DealsCard: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
  userid,
  fetchDeals,
}) => {
  const { id, post_id, buyer_first_name, buyer_last_name, selling_price,seller_customer_id, seller_first_name,seller_last_name, photos, status, title } = taxonomy;

  const { data: session } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  const [message, setMessage] = useState("")

  

  const handleSubmitAccept  = (deal_id: string | number) => () => {
    const deal_status = 1;
    dealResponses(deal_id, deal_status,status, bearerToken)
    .then((data)=> {
      setShowAlert(data.message);
      fetchDeals(id);
      
      
    })

    .catch((error) =>{
      console.error('Error:', error);
    })
    
    
  }

  const handleSubmitDeny = (deal_id: string | number) => () => {
    const deal_status = 0;
    dealResponses(deal_id,deal_status, status, bearerToken)
    .then((data)=> {
      setSeverity('warning');
      setShowAlert(data.message);

    })
    
    
  }

  return (
    <>
     {showAlert && <SnackBar message={message} showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
     <Link href={`/deals/${post_id}`} className={`flex flex-col  ${className}`} data-nc-id="CardCategory5" >

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

      <div className={`bg-neutral-800 mt-2 p-2 text-xs text-center rounded-lg text-white font-semibold `}>
         <p className="text-sm">{title}</p>
          <p>{userid == seller_customer_id ? 'Buyer' : "Seller"} : {userid == seller_customer_id ? buyer_first_name  : seller_first_name } {userid == seller_customer_id ? buyer_last_name  : seller_last_name  } </p>
          <p className="text-neutral-400">{userid == seller_customer_id ? 'Sold' : "Bought"} : <span className="default-green">{selling_price}</span></p>
         

          {userid == seller_customer_id ? (
            <>
            {status === "BID_SELLER_INCOMPLETE_EXCHANGE" || status === "BORROW_SELLER_INCOMPLETE_EXCHANGE" ? (
            <>
             <p className="text-xs ">{userid == seller_customer_id ? 'Have you given the book?' : 'Have you received the book?'}</p>
            <div className='mt-2 flex space-x-2 text-sm  font-semibold '>
            <button onClick={handleSubmitAccept(id)} className='default-green-bg text-white p-1 rounded-lg w-full  '>YES</button>
            <button onClick={handleSubmitDeny(id)} className='bg-red-600 text-white p-1 rounded-lg w-full '>NO</button>
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
          {status === "BID_BUYER_INCOMPLETE_EXCHANGE" ? (
            <>
             <p className="text-xs ">{userid == seller_customer_id ? 'Have you given the book?' : 'Have you received the book?'}</p>
            <div className='mt-2 flex space-x-2 text-sm  font-semibold '>
            <button onClick={handleSubmitAccept(id)} className='default-green-bg text-white p-1 rounded-lg w-full  '>YES</button>
            <button onClick={handleSubmitDeny(id)} className='bg-red-600 text-white p-1 rounded-lg w-full '>NO</button>
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
     </>
  
  );
};

export default DealsCard;
