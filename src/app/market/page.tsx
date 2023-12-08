
import React, { Fragment } from "react";
import Market from '@/components/market/market'

async function fetchPosts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/fetch?limit=20&page=1`,
        { next: { revalidate: 180 } });
    try {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const data = responseData.data;
        return data;

    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
}
export default async function PageMarket() {
    const data = await fetchPosts()
  return (
    <Fragment>
      <Market post={data}/>
    </Fragment>
    
  );
};
