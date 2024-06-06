'use client'
import React, {useState, useEffect} from 'react'
import { useSession} from "next-auth/react";
import Label from '../Label'
import Select from '@/shared/Select'
import { FaPlus } from "react-icons/fa";
import { fetchCategories, uploadPosts } from '@/lib/api-util'
import SnackBar from '../snackBar';
import { useRouter } from 'next/navigation';
import {PulseLoader} from 'react-spinners'

const Post = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [categories, setCategories]= useState([])
    const [upload, setUpload] = useState(false);
    const [isSelected, setIsSelected] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setSeverity] = useState("success");
    const [newPhotos, setNewPhotos] = useState([]);
    const [displayPhotos, setDisplayPhotos] = useState([])
    const [category, setCategory] = useState([])
    const router = useRouter()
    const [btnText, setBtnText] = useState('POST')
    const [loading, setLoading] = useState(false);

      const handleAdd = (event) => {
        const newFiles = Array.from(event.target.files);
        setNewPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);
        const displayPics = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
        setDisplayPhotos((prevPhotos) => [...prevPhotos, ...displayPics]);
      };

      const handleDelete = (index) => {
        setDisplayPhotos((prevPhotos) => [...prevPhotos.slice(0, index), ...prevPhotos.slice(index + 1)])
        setNewPhotos((prevPhotos) => [...prevPhotos.slice(0, index), ...prevPhotos.slice(index + 1)]);
      };


    const [bookDetails, setBookDetails] = useState({
        bookType: "Hardcover (Original)",
        // category: "",
        title : "",
        author: "",
        condition: "Brand new",
        location: "",
        askPrice: "",
        lastPrice: "",
        quantity: "",
        description: ""
      })
    
      const handleValueChange = (e) => {
        setBookDetails({ ...bookDetails, [e.target.name]: e.target.value})
      }



    const handlePostsUpload = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setLoading(true);
        setBtnText('Uploading...');
        uploadPosts(newPhotos, userId, bookDetails, category, bearerToken)
            .then((data) => {
                if(data.status === 1){
                    setShowAlert(data.message);
                    setBookDetails("");
                    router.push('/my-library');
                }else{
                    setSeverity('warning');
                    setShowAlert('Failed, try again!');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
     fetchCategories()
      .then((data)=> {
        setCategories(data.data)
        setCategory(data.data[0].id)
       
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
    }, []);
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
        <form onSubmit={handlePostsUpload}>
      {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
      <div className="px-4 py-8 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-10">
      <div className="mx-auto  text-center items-center w-full lg:w-5/12 ">
      <div className={`px-5 pt-2 lg:mt-12 pb-5 text-start rounded sticky`}>
            <Label>Book Type</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="bookType"
             value={bookDetails.bookType} onChange={handleValueChange} required
             >
            <option value="Paper back">Paper Back</option>
            <option value="Hardcover">Hardcover</option>
            </Select>
            </div>

            {/* <Label>Category</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="category"
             value={category} required
             onChange={({ target }) => setCategory(target?.value)}
              
             >
                {categories?.map((cat, index)=>(
                    <option key={index} value={cat.id}>{cat.name}</option>
                ))}
            </Select>
            </div> */}

            <div>
                <p className='default-yellow'>Add pictures</p>
                <p className='text-neutral-600 text-sm'>The first photo will be used as your cover</p>
                  
                  <div className='flex space-x-3 mt-3'>
                  {displayPhotos?.map((pic, index)=>(
                      <div key={index} className=" relative mb-2">
                      <img src={pic} alt="book image" className="relative object-fit w-20 h-20 rounded-lg" />
                      <span 
                      onClick={() => handleDelete(index)} 
                      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full cursor-pointer">X</span>
                     </div>

                    ))}

                    <div 
                      onClick={()=> setUpload(true)}
                      className='flex   flex-col px-2  justify-center mb-2 default-yellow-bg w-20 h-20 rounded-xl items-center py-5'>
                      <FaPlus className='w-10 h-10'/>
                          
                    </div>

                  </div>


               {upload ? (
                    <div className='bg-white py-2 px-2 rounded-lg'>
                        <input
                            multiple
                            className=" "
                            type="file"
                            name="file"
                            
                            // webkitdirectory
                            onChange={handleAdd}
                        />
                        {isSelected ? (
                            <div className=''>
                              {/* <img src={selectedFile}/> */}
                            </div>
                        ) : (
                            <p className=''>Select a file to show details</p>
                        )}

                        </div>
                    ) : null}

            </div>

            <Label>Title</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Title" name="title" required
                 value={bookDetails.title} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>

            <Label>Author</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Author's name" name="author" required
                 value={bookDetails.author} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>

            <Label>Condition</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 bg-neutral-800 px-3 py-3 text-white rounded-lg" name="condition" 
            value={bookDetails.condition} onChange={handleValueChange} required
            >
                <option value="Mint"  >Mint</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Ok">Ok</option>
                <option value="Bad">Bad</option>
                <option value="very-bad">Very bad</option>
            </Select>
            </div>

            {/* <Label>Location</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Location" name="location" required
                 value={bookDetails.location} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div> */}
                <Label>Price</Label>
                <div className="flex justify-center mb-3 space-x-3">
                <input placeholder="Asking Price" type="number" name="askPrice" required
                 value={bookDetails.askPrice}
                  className="bg-neutral-800 w-full rounded-lg text-white p-2"
                   onChange={handleValueChange}
                   />
                <input placeholder="Last Price" type="number" name="lastPrice" required
                 value={bookDetails.lastPrice}
                  className="bg-neutral-800 w-full rounded-lg text-white p-2" 
                  onChange={handleValueChange}
                  />
                </div>

                <Label>Quantity</Label>
                <div className="mb-3 rounded-lg bg-neutral-800 ">
                    <input placeholder="2" name="quantity" required
                     value={bookDetails.quantity} onChange={handleValueChange}
                    className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                
                </div>

                <Label>Other details</Label>
                <div className="mb-3 rounded-lg bg-neutral-800 ">
                    <textarea rows={2}  placeholder="Other details..." name="description"
                     value={bookDetails.description} onChange={handleValueChange}
                    className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                
                </div>
            
                <div className="mb-3 cursor-pointer text-center rounded-xl px-3 py-2">
                    <button disabled={loading} type="submit" className="inline-flex default-yellow-bg items-center hover:bg-sky-900 justify-center w-full h-10 px-6 font-medium tracking-wide  transition duration-200 rounded-xl shadow-md  focus:shadow-outline focus:outline-none">
                        {loading ? ( <>Uploading <PulseLoader color='black' size={10} /></>) : (btnText)}
                    </button>
                </div>
               
            </div>

            </div>
           </div>
        </form>
    </div>
  )
}

export default Post