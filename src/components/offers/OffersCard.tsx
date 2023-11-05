import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import { acceptOrDenyDeal } from "@/lib/api-util";

export interface OffersCardProps {
  className?: string;
  taxonomy: TaxonomyType;
}

const OffersCard: FC<OffersCardProps> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  return (
    <div  className={`nc-CardCategory3 flex flex-col ${className}`}>

      <div className=" mb-4 sm:text-center ">
          <div className="flex">
            <img
              className="object-cover w-10 h-10 mr-4 rounded-2xl shadow"
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
            <div className="flex flex-col justify-center">
              <p className=" text-white font-semibold">Marta Clermont</p>
            </div>
          </div>
        </div>

        <div className="mb-4 transition-shadow duration-300 hover:shadow-xl ">
            <img
              className="object-cover w-full h-32 rounded shadow-lg sm:h-64 md:h-80 lg:h-64"
              src={thumbnail || ""}
              // src="https://images.pexels.com/photos/3727459/pexels-photo-3727459.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
              
            />
          </div>

      <div>
      <div className={`bg-neutral-800 p-2 items-center rounded-lg text-white font-semibold `}>
          <p>Mkt : <span className={`default-green`}> 700</span> </p>
          <p >Ask : 600</p>
          <p>Offer : 550</p>

      </div>
      <div className='mt-4 flex justify-between text-xs font-semibold '>
          <button className='default-green-bg text-white p-2 rounded-lg w-5/12'>DEAL</button>
          <button className='bg-red-600 text-white p-2 rounded-lg w-5/12 '>NO DEAL</button>
        </div>


      </div>

    </div>
  );
};

export default OffersCard;
