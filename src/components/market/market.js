'use client'
import React, {useState} from "react";
import {BiSolidUpArrow} from 'react-icons/bi';
import Link from "next/link";
import {BsFilter} from 'react-icons/bs';
import Filter from "../Filter";
import locationIcon from "../../images/location icon.svg";


  
export default function  Market ({post}) {
 
  const [posts, setPosts] = useState(post);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [page, setPage] = useState(1);

  const handleFilterButtonClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };


  const [searchDetails, setSeachDetails] = useState({
    bookType: "",
    condition: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleValueChange = (e) => {
    setSeachDetails({ ...searchDetails, [e.target.name]: e.target.value})
  }
  const clearFilter = ()=>{
    setSeachDetails({
      bookType: "",
      condition: "",
      location: "",
      minPrice: "",
      maxPrice: "",
    })
  }

  const handleLoadMore = async () => {
    try{
      const nextPage = page + 1;
      const newData = await fetchPosts(nextPage);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  
  async function fetchPosts(page) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/fetch?limit=20&page=${page}`);
    try {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      const data = responseData.data;
      setPosts(prevPosts => [...prevPosts, ...data]);
      return data;
    
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">

          <div className="mb-12 lg:mb-0 w-full  ">
            <div className=" mb-6">
              <div className="mx-auto mb-10 flex justify-center w-100 sm:text-center">
              <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                  </span>
                  <span
                   onClick={handleFilterButtonClick}
                   className="absolute inset-y-0 right-0 flex lg:hidden items-center pr-3">

                    <BsFilter className="w-5 h-5 text-gray-400" />
                  </span>

                  <input type="text" className="w-full py-2 pl-16 lg:pl-32 lg:pr-32 pr-16 text-gray-300 text-center bg-neutral-700  rounded-md " placeholder="Search"/>
              </div>
              </div>

            {isFilterVisible && (
              <Filter searchDetails={searchDetails} clear={clearFilter} handleValueChange={handleValueChange} classes="lg:hidden xl:hidden" />
          )}

              <div
               className="grid grid-cols-2 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
                {posts?.map((post,index) =>(
                   <div key={index} >
                    <Link href={`/market/${post.post_id}`}>
                      <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                      <img
                        className="absolute object-cover w-full h-full rounded"
                        src={post.photos[0]}
                        alt="book background image"
                      />
                    </div>
                    </Link>
                   <div className="flex flex-col leading-3">
                   <p className="text-lg text-white font-bold mb-[-5px]">{post.title}</p>
                     <p className=" text-lg text-gray-500 mb-[-5px]">
                       {post.location} <img className="inline" src={locationIcon.src} alt="location icon" width="10"/>
                     </p>
                     <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                       Mkt : <span className="default-green">{post.market_price} <BiSolidUpArrow className="inline-block w-3 h-2.5"/></span> 
                     </p>
                     <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                       Ask: {post.last_price}
                     </p>
                     
                   </div>
                 </div>

                ))}

              </div>

              <div className="mt-4 flex justify-center">
                <button onClick={handleLoadMore} className="text-gray-900 font-semibold p-2 default-yellow-bg rounded-lg w-36">Load more</button>
              </div>
            </div>
          </div>
          <Filter searchDetails={searchDetails} clear={clearFilter} handleValueChange={handleValueChange} classes="hidden lg:block" />
        </div>
      </div>
    </div>
  );
}













