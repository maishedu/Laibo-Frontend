'use client'
import React, {Fragment} from 'react'
import Feedback from '@/components/feedback/Feedback'
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const Feedbackpage = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
  }else if (status === 'loading'){
    return <Loader/>
  }
  return (
    <Fragment>
      <Feedback/>
    </Fragment>
  )
}

export default Feedbackpage