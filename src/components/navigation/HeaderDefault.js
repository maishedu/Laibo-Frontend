"use client"
import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import AuthenticatedHeader from './AuthenticatedHeader';
import SiteHeader from "./SiteHeader";




const HeaderDefault = () => {
    const { data: session, status } = useSession()
    if (status === "authenticated" && session?.email) {
        return <AuthenticatedHeader/>
    }
    return (
        <Fragment>
            <SiteHeader/>
        </Fragment>

    );
};

export default HeaderDefault;