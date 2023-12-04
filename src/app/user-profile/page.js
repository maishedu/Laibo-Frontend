'use client'
import React, {Fragment} from 'react'
import Profile from '@/components/profile/profile';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const Profilepage = () => {
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
        <Profile/>
    </Fragment>
  )
}

export default Profilepage;