'use client'
import React, {Fragment} from 'react';
import Stock from '@/components/my-library/Stock'
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const MyStockpage = () => {
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
        <Stock/>
    </Fragment>
  )
}

export default MyStockpage;