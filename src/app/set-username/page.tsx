'use client'
import React, {Fragment} from 'react';
import Username from '@/components/auth/set-username'
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const UsernamePage = () => {
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
      <Username/>
    </Fragment>
  )
}

export default UsernamePage;