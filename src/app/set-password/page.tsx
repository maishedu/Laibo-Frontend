'use client'
import React, {Fragment} from 'react'
import Password from '@/components/auth/set-password';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation';
import Loader from '@/components/Loader';


const SetPasswordpage = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
  }
  if (status === 'loading'){
    return <Loader/>
  }
  
  return (
    <Fragment>
        <Password/>
    </Fragment>
  )
}

export default SetPasswordpage; 