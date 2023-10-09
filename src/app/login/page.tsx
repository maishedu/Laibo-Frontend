"use client"
import React, { Fragment } from "react";
import Login from '@/components/auth/Login';
import { useSession } from "next-auth/react";
import AlreadySignedIn from "@/components/auth/alreadySignedIn";



const PageLogin = () => {
    const { data: session, status } = useSession()
    if (status === "authenticated" && session?.email) {
        return <AlreadySignedIn email={session.email}/>
    }
  return (
    <Fragment>
      <Login/>
    </Fragment>

  );
};

export default PageLogin;