import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import Image from "next/image";

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const DealsCard: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  return (
    <div  className={`nc-CardCategory3 flex flex-col ${className}`}>

    

        <div className="mb-4 w-full aspect-w-5 aspect-h-5 transition-shadow duration-300 hover:shadow-xl ">
            <img
              className="object-cover  w-full rounded shadow-lg sm:h-64 md:h-80 lg:h-64"
              src={thumbnail || ""}
              alt=""
            />
          </div>
      
      {/* <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
      >
        <Image
          src={thumbnail || ""}
          className="object-cover w-full h-full rounded-2xl"
          alt="places"
          fill
          sizes="(max-width: 400px) 100vw, 300px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div> */}

      <div>
      <div className={`bg-neutral-800 text-xs p-2 rounded-lg text-white `}>
          <p className="text-sm">Future crimes</p>
          <p>Lender: George bush </p>
          {/* <p className="text-xs">Borrowed until : 24-07-23</p> */}
          <p>Held : 550</p>

          {/* <p className="text-xs font-semibold">Have you received this book?</p> */}

          <div className='mt-4 flex justify-between  font-semibold '>
          <button className='default-green-bg text-white p-2 rounded-lg w-4/12  '>YES</button>
          <button className='bg-red-600 text-white p-2 rounded-lg w-4/12 '>NO</button>
        </div>

      </div>
      


      </div>

    </div>
  );
};

export default DealsCard;
