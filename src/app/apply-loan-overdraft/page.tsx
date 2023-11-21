'use client'
import React, {Fragment} from 'react'
import Applyloan from '@/components/apply-loan/Applyloan';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'

const ApplyLoanpage = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
 }
 
  return (
    <Fragment>
        <Applyloan/>

    </Fragment>
  )
}

export default ApplyLoanpage;