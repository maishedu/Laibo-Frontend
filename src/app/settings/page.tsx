"use client"
import React, {Fragment} from 'react'
import Settings from '@/components/settings/Settings'
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'

const Settingspage = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
 }

  return (
    <Fragment>
        <Settings/>
    </Fragment>
  )
}

export default Settingspage;