"use client"
import React, {useState, useEffect} from 'react'
import OffersSlider from './OffersSlider';
import OffersCardMobile from './OffersCardMobile'
import { fetchOffers } from '@/lib/api-util';
import { useSession} from "next-auth/react";
import {BsEmojiFrown} from 'react-icons/bs';
import Loader from '../Loader';

const Offers = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id
  const bearerToken = session?.accessToken;
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(1)

  

  const getOffers = async ()=>{
    const offers = await fetchOffers(bearerToken);
    if(offers.status === 1){
     fetchOffers(bearerToken);
     setOffers(offers.data)
     setLoading(0)
    }else{
     console.error('Error:', error);
    }
   }

  useEffect(() => {

    getOffers()
    
    
  }, []);
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-20">
       <div className="mx-auto  text-center items-center">
        {offers?.length > 0 ? (
          <>
            <OffersSlider offers={offers} fetchOffers={getOffers} className='hidden lg:flex'/>
            <OffersCardMobile offers={offers} fetchOffers={getOffers} />
          </>
           

        ): loading === 1 ? <Loader/> :
        <div className='items-center py-16'>
          <div className='flex justify-center mb-4'>
          <BsEmojiFrown className="text-neutral-600 flex justify-center items-center text-center h-20 w-20"/>

          </div>
          
          <h2 className='text-neutral-600 text-center'>You have not received any offer</h2>
        </div>}
       
       </div>
      </div>
    </div>
  )
}

export default Offers;