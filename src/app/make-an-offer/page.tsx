'use client'
import React, {Fragment} from 'react';
import MakeOffer from '@/components/offers/MakeOffer';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const MakeOfferpage = () => {
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
        <MakeOffer/>
    </Fragment>
  )
}

export default MakeOfferpage;