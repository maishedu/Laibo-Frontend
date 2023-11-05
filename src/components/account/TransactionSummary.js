"use client"
import React, {useEffect, useState} from 'react'
import { fetchCustomerTransactionsSummary } from '@/lib/api-util';
import { useSession } from "next-auth/react";

const TransactionSummary = () => {
    const [transDetails, setTransDetails] = useState([])
    const { data: session, status } = useSession();
    const bearerToken = session?.accessToken;
    const [selectedMonth, setSelectedMonth] = useState([])
    

    const handleMonthChange = (e) => {
        setSelectedMonth( e.target.value );
      }
      

    
    const filteredData = transDetails.filter(item => item.month === selectedMonth);  

    useEffect(() => {
        fetchCustomerTransactionsSummary(bearerToken)
        .then((data)=> {
          setTransDetails(data)
          setSelectedMonth(data[0].month)
        })
        .catch((error) =>{
          console.error('Error:', error);
        })
        
    }, [bearerToken]);

  return (
    <>
    <div className='mt-2 items-center'>
    <label>Select a month:</label>
    <select value={selectedMonth} onChange={handleMonthChange} className='w-24 items-center p-2 rounded'>
        {transDetails.map(item => item.month).map(month=> (
            <option key={month} value={month}>{month}</option> 
        ))}
        
    </select>

    </div>
   
     <div className="relative mt-4 w-72 bg-neutral-800 font-semibold rounded-lg shadow-2xl  p-5">
        {filteredData?.map(item => (
            <>
            <div className="flex default-green justify-between">
                <p>Revenue</p>
                <p>{item.revenue}</p>
            </div>
            <div className="flex mb-2 text-neutral-600 justify-between">
                <p>Pending</p>
                <p>{item.pending}</p>
            </div>
            <div className="flex text-red-600 justify-between">
                <p>Spend</p>
                <p>{item.spend}</p>
            </div>
            <div className="flex mb-2 text-neutral-600 justify-between">
                <p>Held</p>
                <p>{item.held}</p>
            </div>
            <div className="flex text-white justify-between">
                <p>Deposited</p>
                <p>{item.deposit}</p>
            </div>
            <div className="flex text-white justify-between">
                <p>Withdrawn</p>
                <p>{item.withdrawn}</p>
            </div>
            </>
        ))}
      
    </div>
    </>
    
   
  );
}

export default TransactionSummary