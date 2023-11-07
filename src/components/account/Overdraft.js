"use client"
import React, {useEffect, useState} from 'react'
import { fetchUserData } from '@/lib/api-util';
import { useSession } from "next-auth/react";

const Overdraft = () => {
    const [userDetails, setUserDetails] = useState([])
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    
    useEffect(() => {
        fetchUserData(userId, bearerToken)
        .then((data)=> {
          setUserDetails(data)
        })
        .catch((error) =>{
          console.error('Error:', error);
        })
    }, [userId, bearerToken]);

  return (
    <div className="relative w-80 bg-neutral-800 rounded-lg shadow-2xl  p-5">
      <div className="flex text-white font-semibold justify-between">
        <p>Overdraft limit:</p>
        <p>{userDetails?.overdraft_limit}</p>
      </div>
    </div>
  );
}

export default Overdraft