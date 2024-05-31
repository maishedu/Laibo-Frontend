import React, { Fragment } from "react";
// import Post from '@/components/market/post-detail'
import StockDetail from '@/components/my-library/StockDetail'
import {fetchPost} from "@/lib/api-util";
import Notfound from "@/components/Notfound";

import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { postId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.postId

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


export default async function PageMyStock({ params}:Props) {
    const { postId } = params;
    const post = await fetchPost(postId);
    if (post.status === 0){
        return <Notfound/>
    }
  return (
    <Fragment>
      <StockDetail details={post.data}/>
    </Fragment>
    
  );
};

