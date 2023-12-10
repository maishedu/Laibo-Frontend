'use client'
import React, {Fragment} from 'react'
import ForgotPassword from '@/components/auth/forgot-password';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

const ForgotPasswordpage = () => {
    const router  = useRouter();
    const { data: session, status } = useSession()
    if (status === "authenticated") {
        router.push('/login')
    }
  return (
    <Fragment>
        <ForgotPassword/>
    </Fragment>
  )
}

export default ForgotPasswordpage;