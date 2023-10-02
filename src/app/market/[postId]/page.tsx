
import React, { Fragment } from "react";
import Post from '@/components/market/post-detail'
// import { useRouter } from 'next/router';


const PageMarket = () => {
  // const router = useRouter();
  // const { postId } = router.query; 
  // console.log(postId)
  return (
    <Fragment>
      <Post />
    </Fragment>
    
  );
};

export default PageMarket;