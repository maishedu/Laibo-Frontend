'use client'
import React, {Fragment} from 'react'
import Deposit from '@/components/deposit/Deposit'
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'

const Depositpage = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
}
  return (
    <Fragment>
      <Deposit/>
    </Fragment>
  )
}

export default Depositpage;