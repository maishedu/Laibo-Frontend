'use client'
import React, {Fragment} from 'react'
import Account from '@/components/account/Account';
import { useSession } from "next-auth/react";

const Accountpage = () => {
    const { data: session, status } = useSession();
    if (status === 'loading'){
            return <h2>loading ...</h2>
        }
  return (
    <Fragment>
        <Account/>
    </Fragment>
  )
}

export default Accountpage; 