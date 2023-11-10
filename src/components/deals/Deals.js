"use client"
import React, {useState, useEffect} from 'react'
import DealsSlider from './DealsSlider'
import { useSession} from "next-auth/react";
import { fetchDeals } from '@/lib/api-util';
import Loader from '../Loader';
import {BsEmojiFrown} from 'react-icons/bs';


const Deals = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id
  const bearerToken = session?.accessToken;
  const [deals, setDeals] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(1)

  useEffect(() => {
    fetchDeals(page,userId, bearerToken)
      .then((data)=> {
        setDeals(data.data)
        setLoading(0)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
    
  }, []);
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-20">
       <div className="mx-auto  text-center items-center">
        {deals?.length > 0 ? (
           <DealsSlider id={userId} deals={deals} />

        ): loading === 1 ? <Loader/> :

        <div className='items-center py-16'>
          <div className='flex justify-center mb-4'>
          <BsEmojiFrown className="text-neutral-600 flex justify-center items-center text-center h-20 w-20"/>

          </div>
          
          <h2 className='text-neutral-600 text-center'>Oops. No post found</h2>
        </div>


        }
       
       </div>
      </div>
    </div>
  )
}

export default Deals;