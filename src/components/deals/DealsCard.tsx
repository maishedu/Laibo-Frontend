import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Image from "next/image";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";
import Link from "next/link";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const DealsCard: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { id, buyer_first_name, buyer_last_name, selling_price, photos, status, title } = taxonomy;

  const { data: session } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  const [message, setMessage] = useState("")

  const handleSubmitAccept  = (deal_id: string | number) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    .then((data)=> {
      setMessage(data.message);
    })
    .catch((error) =>{
      console.error('Error:', error);
    })
    setSeverity('success');
    setShowAlert(true);
    // setMessage('Deal accepted succesfully!');
  }

  const handleSubmitDeny = (deal_id: string | number) => () => {
    const deal_status = 0;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken);
    setSeverity('warning');
    setShowAlert(true);
    setMessage('You have rejected the deal!')
  }

  return (
    <>
     {showAlert && <SnackBar message={message} showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
     <Link href={'#'} className={`flex lg:flex-col ${className}`} data-nc-id="CardCategory5" >

     <div
        className={`flex-shrink-0 relative w-full rounded-2xl`}
      >
        <img
          alt=""
          src={photos || ""}
          className="object-cover w-full h-56 rounded-2xl"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>

      <div className={`bg-neutral-800 mt-2 p-2 text-xs text-center rounded-lg text-white font-semibold `}>
         <p className="text-sm">{title}</p>
          <p>Buyer: {buyer_first_name} {buyer_last_name } </p>
          <p className="text-neutral-400">Sold : <span className="default-green">{selling_price}</span></p>
         
          {status === "BID_SELLER_INCOMPLETE_EXCHANGE" ? (
            <>
             <p className="text-xs ">Have you given the book?</p>
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
          

      </div>
      
    </Link>

    
    </>
  
  );
};

export default DealsCard;
