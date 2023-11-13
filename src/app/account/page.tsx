'use client'
import React, {Fragment} from 'react'
import Account from '@/components/account/Account';
import { useSession } from "next-auth/react";
import Loader from '@/components/Loader';

const Accountpage = () => {
    const { data: session, status } = useSession();
    if (status === 'loading'){
            return <Loader/>
        }
  return (
    <Fragment>
        <Account/>
    </Fragment>
  )
}

export default Accountpage; 