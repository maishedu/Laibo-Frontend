"use client"
import React, { Fragment } from "react";
import Signup from '@/components/auth/Signup'
import {useSession} from "next-auth/react";
import AlreadySignedIn from "@/components/auth/alreadySignedIn";


const PageSignup = () => {
    const { data: session, status } = useSession()
    if (status === "authenticated" && session?.email) {
        return <AlreadySignedIn email={session.email}/>
    }
  return (
    <Fragment>
      <Signup/>
    </Fragment>
    
  );
};

export default PageSignup;