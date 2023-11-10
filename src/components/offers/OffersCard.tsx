import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import { acceptOrDenyDeal } from "@/lib/api-util";
import nullUser from '../../images/user.png';
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";

export interface OffersCardProps {
  className?: string;
  taxonomy: TaxonomyType;
}

const OffersCard: FC<OffersCardProps> = ({
  className = "",
  taxonomy,
}) => {
  const { id, photos, buyer_first_name, buyer_last_name ,market_price, selling_price, quantity, amount,buyer_image_url  } = taxonomy;
  // const handleImageError = (e) => {
  //   e.target.onerror = null; 
  //   e.target.src = nullUser.src; 
  // };

  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  const [message, setMessage] = useState("")

  const handleSubmitAccept  = (deal_id: string | number) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    setSeverity('success');
    setMessage('Deal accepted succesfully!');
    setShowAlert(true);
  }

  const handleSubmitDeny = (deal_id: string | number) => () => {
    const deal_status = 0;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken)
    setSeverity('warning');
    setMessage('You have rejected the deal!')
    setShowAlert(true);
  }

  return (
    <>
      {showAlert && <SnackBar message={message} showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
    <div  className={`nc-CardCategory3 flex flex-col  ${className}`}>

      <div className=" mb-4 sm:text-center w-full">
          <div className="flex">
            <img
              className="object-cover w-10 h-10 mr-4 rounded-2xl shadow"
              src={buyer_image_url}
              // onError={handleImageError}
              alt="Buyer image"
            />
            <div className="flex flex-col justify-center">
              <p className=" text-white font-semibold">{buyer_first_name} {buyer_last_name}</p>
            </div>
          </div>
        </div>

        <div className=" relative mb-4 lg:w-96 aspect-w-5 aspect-h-5 transition-shadow duration-300 hover:shadow-xl   ">
            <img
              className="object-cover rounded shadow-lg sm:h-64 md:h-80 lg:h-64"
              src={photos || ""}
              alt=""
              
            />
          </div>

      {/* <div> */}
      <div className={`bg-neutral-800 p-2 items-center lg:w-fit rounded-lg text-white font-semibold `}>
          <p>Mkt : <span className={`default-green`}>{market_price}</span> </p>
          <p >Ask : {selling_price}</p>
          <p>Offer : {amount}</p>
          <p>Quantity : {quantity}</p>

      </div>

      <div className='mt-4 flex space-x-5 justify-between text-xs font-semibold '>
          <button onClick={handleSubmitAccept(id)} className='default-green-bg text-white p-2 rounded-lg '>DEAL</button>
          <button onClick={handleSubmitDeny(id)} className='bg-red-600 text-white p-2 rounded-lg  '>NO DEAL</button>
      </div>


      {/* </div> */}

      </div>
    </>
    
  );
};

export default OffersCard;
