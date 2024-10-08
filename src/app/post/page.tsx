'use client'
import React, {Fragment} from 'react'
import Post from '@/components/post/Post';
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const Postpage = () => {
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
      <Post/>
    </Fragment>
  )
}

export default Postpage;