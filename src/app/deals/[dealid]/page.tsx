import React, { Fragment } from "react";
import Dealdetail from "@/components/deals/Dealdetail";
import {fetchPost} from "@/lib/api-util";
import Notfound from "@/components/Notfound";

import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { dealid: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.dealid

    // fetch data
    const post = await fetchPost(id);
    if (post.status === 0){
        return {
            title: 'Laibo',
            description: 'laibo book',
        }
    }
    const {data} = post;
    return {
        title: data.title,
        description: `${data.title} - ${data.type} by ${data.author} selling at ${data.selling_price}`,
        keywords: ['Laibo', `${data.title}`, `${data.author}`,],
        authors: [{ name: data.author }],
        publisher: data.author,
    }
}


export default async function PageMarket({ params}:Props) {
    const { dealid } = params;
    const post = await fetchPost(dealid);
    if (post.status === 0){
        return <Notfound/>
    }
    return (
        <Fragment>
            <Dealdetail details={post.data}/>
        </Fragment>

    );
};

