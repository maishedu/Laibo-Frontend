import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Image from "next/image";
import { acceptOrDenyDeal } from "@/lib/api-util";
import { useSession} from "next-auth/react";
import SnackBar from "../snackBar";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const DealsCard: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { id, buyer_first_name, buyer_last_name, selling_price, photos, title } = taxonomy;

  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setSeverity] = useState("success");
  const [message, setMessage] = useState("")

  const handleSubmitAccept  = (deal_id: string | number) => () => {
    const deal_status = 1;
    acceptOrDenyDeal(deal_id,deal_status, bearerToken);
    setSeverity('success');
    setShowAlert(true);
    setMessage('Deal accepted succesfully!');
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
    <div className={` flex flex-col ${className}`}>

        <div className="relative mb-4  aspect-w-5 aspect-h-5 transition-shadow duration-300 hover:shadow-xl ">
            <img
              className="object-cover rounded shadow-lg sm:h-64 md:h-80 lg:h-64"
              src={photos || ""}
              alt=""
            />
          </div>
      
      
      <div className={`bg-neutral-800 text-xs p-2 rounded-lg text-white w-fit`}>
          <p className="text-sm">{title}</p>
          <p>Buyer: {buyer_first_name} {buyer_last_name } </p>
          <p>Sold : {selling_price}</p>

          <p className="text-xs font-semibold">Have you given the book?</p>

          <div className='mt-4 flex justify-between  font-semibold '>
          <button onClick={handleSubmitAccept(id)} className='default-green-bg text-white p-2 rounded-lg w-4/12  '>YES</button>
          <button onClick={handleSubmitDeny(id)} className='bg-red-600 text-white p-2 rounded-lg w-4/12 '>NO</button>
        </div>

      </div>

    </div>
    </>
  
  );
};

export default DealsCard;
