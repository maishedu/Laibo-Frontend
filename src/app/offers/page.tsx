"use client"
import React, {Fragment} from 'react'
import Offers from "@/components/offers/Offers"
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'

const Offerspage = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
}
  return (
    <Fragment>
        <Offers/>
    </Fragment>
  )
}

export default Offerspage;