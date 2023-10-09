'use client'

import React, {useEffect, useState} from "react";
import {BiSolidUpArrow} from 'react-icons/bi'
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import Filter from "../Filter";
import Select from "@/shared/Select";
import Label from "../Label";
import {BsFilter} from 'react-icons/bs';
import Notfound from '../Notfound';


export default function  Search() {
  const [posts, setPosts] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const searchParams = useSearchParams();

  const bookType = searchParams.get('bookType')
  const location = searchParams.get('location')
  const condition = searchParams.get('condition')
  const maxPrice = searchParams.get('maxPrice')
  const minPrice = searchParams.get('minPrice')

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

  
  
    async function searchPosts() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/laibo/api/posts/search?query=&maxPrice=${maxPrice}&condition=${condition}&location=${location}&minPrice=${minPrice}`);
      try {
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setPosts(data.data)
        return data;
      
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    }
 
  useEffect(() => {
    if (condition) {
      setSeachDetails((prevSearchDetails) => ({
        ...prevSearchDetails,
        condition,
      }));
    }

    if (location) {
      setSeachDetails((prevSearchDetails) => ({
        ...prevSearchDetails,
        location,
      }));
    }

    if (minPrice) {
      setSeachDetails((prevSearchDetails) => ({
        ...prevSearchDetails,
        minPrice,
      }));
    }

    if (maxPrice) {
      setSeachDetails((prevSearchDetails) => ({
        ...prevSearchDetails,
        maxPrice,
      }));
    }
   
    searchPosts();
    
  }, [condition,location, minPrice, maxPrice]);


  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col  justify-center lg:flex-row ">
          <div className=" mb-12  w-full">
            <div className=" mb-6">
            <div className="mx-auto mb-10 flex justify-center w-96 sm:text-center">
              <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                  </span>
                  <span
                   onClick={handleFilterButtonClick}
                   class="absolute inset-y-0 right-0 flex lg:hidden items-center pr-3">

                    <BsFilter className="w-5 h-5 text-gray-400" />
                  </span>

                  <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-300 text-center bg-neutral-700  rounded-md " placeholder="Search"/>
              </div>
              </div>

              {isFilterVisible && (
                <div className="lg:hidden px-5 pt-6 pb-5 rounded sticky ">
                <Label>Book Type</Label>
                  <div className="mb-3 rounded-xl bg-neutral-800 ">
                  <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="bookType" value={searchDetails.bookType} onChange={handleValueChange}>
                    <option value="E-book">E-book</option>
                    <option value="Hardcover">Hardcover</option>
                  </Select>
                  </div>
      
                  <Label>Condition</Label>
                    <div className="mb-3 rounded-xl bg-neutral-800 ">
                    <Select className="mt-1.5 bg-neutral-800 px-3 py-3 text-white rounded-lg" name="condition" value={searchDetails.condition} onChange={handleValueChange}>
                      <option value="Brand new"  >Brand new</option>
                      <option value="New">New</option>
                      <option value="Good">Good</option>
                      <option value="Ok">Ok</option>
                      <option value="Bad">Bad</option>
                      <option value="Used">Used</option>
                      <option value="very-bad">Very bad</option>
                    </Select>
                  </div>
      
                  <Label>Location</Label>
                    <div className="mb-3 rounded-lg bg-neutral-800 ">
                      <input placeholder="Location" name="location" value={searchDetails.location} onChange={handleValueChange} className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                  
                  </div>
                    <Label>Price</Label>
                    <div className="flex justify-center mb-3 space-x-3">
                      <input placeholder="Min price" name="minPrice" value={searchDetails.minPrice} className="bg-neutral-800 w-full rounded-lg text-white p-2" onChange={handleValueChange}/>
                      <input placeholder="Max price" name="maxPrice" value={searchDetails.maxPrice} className="bg-neutral-800 w-full rounded-lg text-white p-2" onChange={handleValueChange}/>
                    </div>
                    
                  <div className="mb-3 text-center rounded-xl default-yellow-bg px-3 py-2">
                    <Link  href={`/market/search/?bookType=${searchDetails.bookType}&condition=${searchDetails.condition}&location=${searchDetails.location}&maxPrice=${searchDetails.maxPrice}&minPrice=${searchDetails.minPrice}`} >
                    <button type="submit" className="rounded-lg text-center">Show results </button>
                    </Link>
                  
                  </div>
                
                </div>

              )}
              {posts?.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
               
                <>
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
                
                   <div className="flex flex-col ">
                   <p className="text-sm text-white font-bold">{post.title}</p>
                     <p className="mb-2 text-xs text-gray-200">
                       {post.location}
                     </p>
                     <p className="mb-2 text-xs text-gray-200 font-semibold">
                       Mkt : <span className="default-green">{post.market_price} <BiSolidUpArrow className="inline-block w-3 h-2.5"/></span> 
                     </p>
                     <p className="mb-2 text-xs text-gray-200 font-semibold">
                       Ask: {post.last_price}
                     </p>
                     
                   </div>
                 </div>

                ))}

                </>

              </div>
              ): <Notfound  /> }

            </div>
          </div>

          <Filter searchDetails={searchDetails} handleValueChange={handleValueChange} />
        </div>
      </div>
    </div>
  );
}






