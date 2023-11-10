"use client"
import React, {Fragment} from 'react';
import Deals from '@/components/deals/Deals';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const Dealspage = () => {
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
        <Deals/>
    </Fragment>
  )
}

export default Dealspage;