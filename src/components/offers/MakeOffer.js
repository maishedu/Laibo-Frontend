"use client"
import React, {useState, useEffect} from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { fetchPost, makeBidOffer, makeBorrowOffer, makeExchangeOffer, fetchUserPosts } from "@/lib/api-util";
import { useSearchParams } from "next/navigation";
import { useSession} from "next-auth/react";
import Popper from "../popper/Popper";
import BorrowModal from './BorrowModal'
import SnackBar from "../snackBar";


const MakeOffer = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const searchParams = useSearchParams();
    const postId = searchParams.get('id')
    const [amount, setAmount] = useState([])
    const [quantity, setQuantity] = useState([])
    const [postDetails, setPostDetails ] = useState([])
    const [borrow, setShowBorrow] = useState(false)
    const [returnDate, setReturnDate] = useState([])
    const [addBookModal, setShowAddBookModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const [book1, setBook1] = useState()
    const [book2, setBook2] = useState()
    const [book3, setBook3] = useState()
    

    const customer_id = postDetails?.customer_id;

    const handleMakeBidOffer = () => {
        const details = {quantity,amount,postId,customer_id}
        makeBidOffer(bearerToken,details)
        .then((data)=>{
          if(data.status === 1){
            setShowAlert(data.message)
          }else{
            setSeverity('warning')
            setShowAlert('Failed, trya again!')
          }
        })
    }

    const handleMakeBorrowOffer = () => {
        const details  = {quantity, postId, customer_id, returnDate}
        makeBorrowOffer(bearerToken,details)
        .then((data)=>{
          if(data.status === 1){
            setShowAlert(data.message)
          }else{
            setSeverity('warning')
            setShowAlert('Failed, trya again!')
          }
        })
    }

    const handleMakeExchangeOffer = () => {
      const details = {quantity,postId,customer_id}
      const books_exchanged = [book1?.id,book2?.id,book3?.id].filter(Boolean)
      const booksExchangedString = books_exchanged.join(',');
      makeExchangeOffer(bearerToken,details,booksExchangedString)
      .then((data)=>{
        if(data.status === 1){
          setShowAlert(data.message)
        }else {
          setSeverity('warning')
          setShowAlert("Failed, try again!")
        }
       
      })
    }

    const handleAddBook = (postId, title, photoUrl) => {
      if (!book1?.id) {
        setBook1({
          id: postId,
          title: title,
          url: photoUrl
        });
      } else if (!book2?.id) {
        setBook2({
          id: postId,
          title: title,
          url: photoUrl
        });
      } else if (!book3?.id) {
        setBook3({
          id: postId,
          title: title,
          url: photoUrl
        });
      }
    };
    

  
    useEffect(() => {
    fetchPost(postId)
      .then((data)=> {
        setPostDetails(data.data)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
      fetchUserPosts(page, userId)
      .then((data)=> {
        setPosts(data.data)
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
    }, [postId, userId]);


  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-20">
      {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
        <div className="mx-auto  text-center items-center w-full lg:w-3/12">
          <div className="flex flex-col justify-center w-full">
            <div className="">
             
                <h2 className="text-start  text-white">Quantity</h2>
                <div className=" relative mb-1  sm:mb-2  w-full">
                <input
                  placeholder="1"
                  value={quantity}
                  onChange={({ target }) => setQuantity(target?.value)}
                  required
                  type="text"
                  className="flex-grow w-full text-center text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-800 rounded-lg shadow-sm"
                  id="quantity"
                  name="quantity"
                />
               
              </div>

              <div
                className={`bg-neutral-800 mt-4 p-2 text-center rounded-lg text-white font-semibold `}
              >
                <p className=" text-lg text-gray-200 font-semibold mb-[-5px]">
                  Mkt :{" "}
                  <span className="default-green">
                    {postDetails?.market_price}{" "}
                    <BiSolidUpArrow className="inline-block w-3 h-2.5" />
                  </span>
                </p>
                <p>Ask : {postDetails?.selling_price}</p>
                <p>Top bid : {postDetails?.top_bid}</p>
              </div>

              <h2 className="text-start mt-4 text-white">Bid amount</h2>
              <div className=" relative mb-1  sm:mb-2  w-full">
                <input
                  placeholder="550.00"
                  value={amount}
                  onChange={({ target }) => setAmount(target?.value)}
                  required
                  type="text"
                  className="flex-grow w-full text-center text-white h-10 px-4 mb-2 transition duration-200 bg-neutral-800 rounded-lg shadow-sm"
                  id="amount"
                  name="amount"
                />
                <p className="absolute inset-y-0 right-0 px-4 py-2 text-white">
                  {"/="}
                </p>
              </div>

              <div className="flex space-x-2 w-full">
                <div className=" flex space-x-2 justify-center font-semibold text-white default-green-bg p-1 rounded-lg w-full">
                  <div className="bg-lime-600 rounded-lg p-1">
                    <FiArrowUpRight className="w-5 h-5" />
                  </div>
                  <button onClick={handleMakeBidOffer}>BUY</button>
                </div>
                <div className="flex space-x-2 justify-center font-semibold text-white bg-red-500 p-1 rounded-lg w-full">
                  <div className="bg-red-600 rounded-lg p-1">
                    <FiArrowDownRight className="w-5 h-5" />
                  </div>
                  <button onClick={()=>setShowBorrow(true)}>SELL</button>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">

                <div className="flex flex-col w-full">
                {book1?.url ? (
                    <div className="w-full relative mb-2">
                     <img src={book1.url} alt="book 1 image" className="relative object-fit w-20 h-20 rounded-lg" />
                     <span onClick={()=> setBook1("")} className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full cursor-pointer">X</span>
                    </div>
                   
                  ):

                <div
                  onClick={()=> setShowAddBookModal(true)}
                  className="flex flex-col relative px-2 justify-center mb-2 bg-neutral-400  h-20  rounded-xl items-center "
                >
                  
                  <FaPlus className="w-10 h-10" />
                </div>
                }

                {book1?.title ?(
                  <p className="text-gray-600 text-xs">{book1?.title}</p>

                ):
                <p className="text-gray-600 text-xs">Add book </p>
                }
               
                </div>

                <div className="flex flex-col w-full">
                {book2?.url ? (
                    <div className="w-full relative mb-2">
                     <img src={book2.url} alt="book 1 image" className="relative object-fit w-20 h-20 rounded-lg" />
                     <span onClick={()=> setBook2("")} className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full cursor-pointer">X</span>
                    </div>
                   
                  ):

                <div
                  onClick={()=> setShowAddBookModal(true)}
                  className="flex flex-col relative px-2 justify-center mb-2 bg-neutral-400  h-20  rounded-xl items-center "
                >
                  
                  <FaPlus className="w-10 h-10" />
                </div>
                }

                {book2?.title ?(
                  <p className="text-gray-600 text-xs">{book2?.title}</p>

                ):
                <p className="text-gray-600 text-xs">Add book </p>
                }
               
                </div>

                <div className="flex flex-col w-full">
                {book3?.url ? (
                    <div className="w-full relative mb-2">
                     <img src={book3.url} alt="book 1 image" className="relative object-fit w-20 h-20 rounded-lg" />
                     <span onClick={()=> setBook3("")} className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full cursor-pointer">X</span>
                    </div>
                   
                  ):

                <div
                  onClick={()=> setShowAddBookModal(true)}
                  className="flex flex-col relative px-2 justify-center mb-2 bg-neutral-400  h-20  rounded-xl items-center "
                >
                  
                  <FaPlus className="w-10 h-10" />
                </div>
                }

                {book3?.title ?(
                  <p className="text-gray-600 text-xs">{book3?.title}</p>

                ):
                <p className="text-gray-600 text-xs">Add book </p>
                }
               
                </div>

              </div>

              <div className="text-white relative mt-4 font-semibold bg-purple-600 rounded-lg py-2">
                <div className="absolute inset-y-0 left-0 ml-2 p-1 mt-1 mb-1 bg-purple-900 rounded-lg ">
                  <TbArrowsLeftRight className="w-5 h-5" />
                </div>
                <button onClick={handleMakeExchangeOffer}>EXCHANGE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popper size={"sm"}  open={borrow} setOpen={setShowBorrow}>
          <BorrowModal setOpen={setShowBorrow} >
            <p> <span className="default-green font-semibold">Kes {postDetails?.market_price}</span> will be held as security until the book is returned. if the book is not returned
            on time, the money will be released to the owner.
            </p>
            <p className="mt-4 mb-2 text-gray-900 font-semibold">Return Date</p>
            <input
                placeholder="Birthday"
                value={returnDate}
                onChange={({ target }) => setReturnDate(target?.value)}
                pattern="\d{4}-\d{2}-\d{2}"
                required
                type="date"
                className="flex-grow w-full h-10  border border-black px-4 mb-2 transition duration-200 bg-white rounded-xl"
                id="returndate"
                name="returndate"
              />
              <button onClick={handleMakeBorrowOffer} className="m-2 bg-red-600 hover:bg-yellow hover:text-black text-white text-sm font-bold py-2 px-4 rounded">Borrow</button>
          </BorrowModal>
      </Popper>

      <Popper size={"md"} title={'My stock'} open={addBookModal} setOpen={setShowAddBookModal}>
          
          
            <div setOpen={setShowAddBookModal} className="mx-auto bg-black px-4 py-4 rounded-md">
            <div
               className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
                {posts?.map((post,index) =>(
                   <div key={index} className="" >
                    
                    <div onClick={()=>handleAddBook(post.post_id, post.title, post.photos[0])} className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                      <img
                        className="absolute object-cover w-full h-full rounded"
                        src={post.photos[0]}
                        alt="book background image"
                      />
                    </div>
                    
                   <div className="flex flex-col leading-3">
                   <p className="text-lg text-white font-bold mb-[-5px]">{post.title}</p>
                     <p className=" text-lg text-gray-500 mb-[-5px]">
                       {post.location} <span className="inline-block"><CiLocationOn className="w-4 h-4"/> </span>
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

            </div>
           
      </Popper>

    </div>
  );
};

export default MakeOffer;