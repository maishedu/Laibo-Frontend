'use client'
import React, {useState, useEffect} from 'react'
import { useSession} from "next-auth/react";
import Label from '../Label'
import Select from '@/shared/Select'
import Link from 'next/link'
import { FaPlus } from "react-icons/fa";
import { fetchCategories, uploadPosts } from '@/lib/api-util'
import FileUpload from '@/components/FileUpload';

const Post = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [categories, setCategories]= useState([])
    const [upload, setUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFilesUpload = (files) => {
        // Update the state with the uploaded files
        setUploadedFiles(files);
      };

    // console.log(uploadedFiles)

    function changeHandler  (event) {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
      };

    const [bookDetails, setBookDetails] = useState({
        bookType: "",
        category: "",
        title : "",
        author: "",
        condition: "",
        location: "",
        askPrice: "",
        lastPrice: "",
        quantity: "",
        description: ""
      })
    
      const handleValueChange = (e) => {
        setBookDetails({ ...bookDetails, [e.target.name]: e.target.value})
      }

      const handlePostsUpload = () => {
        uploadPosts(uploadedFiles,userId,bookDetails,bearerToken)
        .then((data)=>{
            console.log(data)
        })
      }
 
    useEffect(() => {
     fetchCategories()
      .then((data)=> {
        setCategories(data.data)
       
      })
      .catch((error) =>{
        console.error('Error:', error);
      })
    }, []);
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-8 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-10">
      <div className="mx-auto  text-center items-center w-full lg:w-5/12 ">
      <div className={` px-5 pt-2 lg:mt-12 pb-5 text-start rounded sticky`}>
            <Label>Book Type</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="bookType"
             value={bookDetails.bookType} onChange={handleValueChange}
             >
            <option value="E-book">Hardcover (Original)</option>
            <option value="Hardcover">Hardcover (Generic)</option>
            </Select>
            </div>

            <Label>Category</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="category"
             value={bookDetails.category} onChange={handleValueChange}
             >
                {categories?.map((cat, index)=>(
                    <option value={cat.id}>{cat.name}</option>
                ))}
            </Select>
            </div>

            <div>
                <p className='default-yellow'>Add pictures</p>
                <p className='text-neutral-600 text-sm'>The first photo will be used as your cover</p>
                <div 
                onClick={()=> setUpload(true)}
                 className='flex mt-2  flex-col px-2  justify-center mb-2 default-yellow-bg w-32 h-20 rounded-xl items-center py-5'>
                <FaPlus className='w-10 h-10'/>
                    
               </div>
               <div>
                <h1 className='text-white'>Multiple File Upload</h1>
                <FileUpload onFilesUpload={handleFilesUpload} uploadedFiles={uploadedFiles} />
                <div>
                    <h2 className='text-white'>Uploaded Files:</h2>
                    <ul className='text-white'>
                    {uploadedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                    </ul>
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
                            onChange={changeHandler}
                        />
                        {isSelected ? (
                            <div className=''></div>
                        ) : (
                            <p className=''>Select a file to show details</p>
                        )}

                        </div>
                    ) : null}

            </div>

            <Label>Title</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Title" name="title"
                 value={bookDetails.title} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>

            <Label>Author</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Author's name" name="author"
                 value={bookDetails.author} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>

            <Label>Condition</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 bg-neutral-800 px-3 py-3 text-white rounded-lg" name="condition" 
            value={bookDetails.condition} onChange={handleValueChange}
            >
                <option value="Brand new"  >Brand new</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Ok">Ok</option>
                <option value="Bad">Bad</option>
                <option value="very-bad">Very bad</option>
            </Select>
            </div>

            <Label>Location</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Location" name="location"
                 value={bookDetails.location} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>
                <Label>Price</Label>
                <div className="flex justify-center mb-3 space-x-3">
                <input placeholder="Asking Price" name="askPrice"
                 value={bookDetails.askPrice}
                  className="bg-neutral-800 w-full rounded-lg text-white p-2"
                   onChange={handleValueChange}
                   />
                <input placeholder="Last Price" name="lastPrice"
                 value={bookDetails.lastPrice}
                  className="bg-neutral-800 w-full rounded-lg text-white p-2" 
                  onChange={handleValueChange}
                  />
                </div>

                <Label>Quantity</Label>
                <div className="mb-3 rounded-lg bg-neutral-800 ">
                    <input placeholder="2" name="quantity"
                     value={bookDetails.quantity} onChange={handleValueChange}
                    className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                
                </div>

                <Label>Other details</Label>
                <div className="mb-3 rounded-lg bg-neutral-800 ">
                    <textarea rows={2}  placeholder="Other details..." name="description"
                     value={bookDetails.description} onChange={handleValueChange}
                    className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                
                </div>
            
                <div className="mb-3 text-center rounded-xl default-yellow-bg px-3 py-2">
                    <button onClick={handlePostsUpload} type="submit" className="rounded-lg font-semibold text-center">POST </button>
                </div>
                {/* <div className="mb-3 text-center rounded-xl bg-white px-3 py-2">
                    <button onClick={clear} className="rounded-lg text-center">Clear Filter</button>
                </div> */}
        
            </div>

        </div>
       </div>
    </div>
  )
}

export default Post