'use client'
import React, {useEffect, useState} from 'react'
import { fetchCustomerTransactions } from '@/lib/api-util';
import { useSession } from "next-auth/react";
import moment from 'moment';


const Transactions = () => {
    const [transDetails, setTransDetails] = useState([])
    const { data: session, status } = useSession();
    const bearerToken = session?.accessToken;
    

    useEffect(() => {
        fetchCustomerTransactions(bearerToken)
        .then((data)=> {
          setTransDetails(data)
        })
        .catch((error) =>{
          console.error('Error:', error);
        })
        
    }, [bearerToken]);
    if (transDetails == null){
        return (
            <div className="relative mt-4 w-72 bg-neutral-800 font-semibold rounded-lg shadow-2xl  p-5">
                <h2 className="default-green">No Data</h2>
            </div>
        )
    }

  return (
    <div className="relative w-80 bg-neutral-800 rounded-lg shadow-2xl  p-5">
        {transDetails?.map((trans, index) =>(
              <div key={index}>
              <div className="flex text-white justify-between">
                  <p>
                     
                     {moment(new Date(trans.date).toISOString()).utc().format('ddd,DD MMM YYYY [at] H:mm')}
                     </p>
              </div>
      
            <div className="mb-1 mt-2 sm:mb-2">
              
              <p className="text-neutral-500 text-sm" dangerouslySetInnerHTML={{ __html: trans.message }}/>
            </div>
              </div>

        )) }
      
     
    </div>
  );
}

export default Transactions