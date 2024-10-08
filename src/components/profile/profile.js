"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import moneyImg from "@/images/the rich list.png";
import nullUser from "@/images/user.png";
import { fetchUserPosts, fetchUserData, searchUsername } from "@/lib/api-util";
import locationIcon from "../../images/location icon.svg";

const Profile = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const userId = searchParams.get("id");
  const username = params.username;
  const { data: session, status } = useSession();
  const bearerToken = session?.accessToken;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [id, setID] = useState(userId || ""); // Initialize with userId or empty string

  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1;
      const newPosts = await fetchUserPosts(nextPage, id);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = nullUser.src;
  };

  // Fetch user data either by username or id
  const fetchUserDetails = async () => {
    try {
      if (username) {
        const decodedUsername = decodeURIComponent(username)
        const data = await searchUsername(decodedUsername);

        // Find the exact match for the username in the data array
        const user = data?.data?.find(
          (user) => user.username.toLowerCase() === decodedUsername.toLowerCase()
        );

        if (user && user.id) {
          setID(user.id); // Set ID from the exact username match
        } else {
          console.error("Exact username not found");
        }
      } else if (userId) {
        setID(userId); // Set ID from URL parameter sam chege
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch posts and user data once ID is available
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserDetails(); // Wait for ID to be set

        if (id) {
          // Fetch user details
          const userData = await fetchUserData(id, bearerToken);
          setUserDetails(userData);

          // Fetch initial posts
          const initialPosts = await fetchUserPosts(page, id);
          setPosts(initialPosts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, bearerToken]);

  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-12 lg:mb-0 w-full  ">
            <div className=" mb-6">
              <div className="flex space-x-4 mb-3">
                <div className="w-20">
                  <img
                    className="absolute object-cover rounded-2xl w-20 h-20"
                    src={userDetails?.imageUrl}
                    onError={handleImageError}
                    alt="Person"
                  />
                </div>
                <div className="flex flex-col justify-center mt-2">
                  <p className="text-lg font-bold text-white">
                    @{userDetails?.username}
                  </p>
                  <p className="mb-1 text-xs text-neutral-600">
                    {userDetails?.first_name + " " + userDetails?.last_name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={moneyImg}
                      alt="money bag image"
                      height={10}
                      width={20}
                    />
                    <p className="text-sm text-center text-gray-200 font-semibold">
                      <span
                        className={
                          userDetails.position_direction === "UP"
                            ? "default-green"
                            : userDetails.position_direction === "DOWN"
                            ? "text-red-600"
                            : "text-white"
                        }
                      >
                        {userDetails?.rank}
                        {userDetails.position_direction === "UP" ? (
                          <BiSolidUpArrow className="inline-block w-3 h-2.5" />
                        ) : userDetails.position_direction === "DOWN" ? (
                          <BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5" />
                        ) : (
                          ""
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b mb-8 w-64 border-neutral-400" />

              <div className="grid grid-cols-2 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-6 ">
                {posts?.map((post, index) => (
                  <div key={index}>
                    <Link href={`/market/${post.post_id}`}>
                      <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                        <Image
                            height="100"
                            width="100"
                          className="absolute object-cover w-full h-full rounded"
                          src={post.photos[0]}
                          alt="book background image"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col leading-3">
                      <p className="text-lg text-white font-bold mb-[-5px]">
                        {post.title}
                      </p>
                      <p className=" text-lg text-gray-500 mb-[-5px]">
                        {post.location}{" "}
                        <Image
                          className="inline"
                          src={locationIcon.src}
                          alt="location icon"
                          width="10"
                          height="10"
                        />
                      </p>
                      <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                        Mkt :{" "}
                        <span
                          className={
                            post.market_change === "UP"
                              ? "default-green"
                              : post.market_change === "DOWN"
                              ? "text-red-600"
                              : "text-white"
                          }
                        >
                          {post.market_price.toFixed(2)}
                          {post.market_change === "UP" ? (
                            <BiSolidUpArrow className="inline-block w-3 h-2.5" />
                          ) : post.market_change === "DOWN" ? (
                            <BiSolidDownArrow className="text-red-600 inline-block w-3 h-2.5" />
                          ) : (
                            ""
                          )}{" "}
                        </span>
                      </p>
                      <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                        Ask: {post.selling_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="text-gray-900 font-semibold p-2 default-yellow-bg rounded-lg w-36"
                >
                  Load more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
