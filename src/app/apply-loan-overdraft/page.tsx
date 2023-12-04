'use client'
import React, {Fragment} from 'react'
import Applyloan from '@/components/apply-loan/Applyloan';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const ApplyLoanpage = () => {
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
        <Applyloan/>

    </Fragment>
  )
}

export default ApplyLoanpage;