'use client'
import React, { Fragment } from "react";
import RichList from '@/components/rich-list/rich-list'
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation'

const PageRichList = () => {
  const router  = useRouter();
  const { data: session, status } = useSession()
  if (status === "unauthenticated" && !session) {
    router.push('/login')
}
  return (
    <Fragment>
      <RichList/>
    </Fragment>
    
  );
};

export default PageRichList;