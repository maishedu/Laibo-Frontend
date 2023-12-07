'use client'
import React, {useState, useEffect} from 'react'
import { useSession} from "next-auth/react";
import Label from '../Label'
import Select from '@/shared/Select'
import { FaPlus } from "react-icons/fa";
import { fetchCategories, editPosts, fetchPost } from '@/lib/api-util'
import SnackBar from '../snackBar';
import { useParams } from 'next/navigation';

const EditPost = () => {
    const params = useParams();
    const postId = params.id
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const bearerToken = session?.accessToken;
    const [categories, setCategories]= useState([])
    const [upload, setUpload] = useState(false);
    const [isSelected, setIsSelected] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setSeverity] = useState("success");
    const [post, setPost] = useState([])
    const [deleted, setDeleted] = useState([])
    const [photos, setPhotos] = useState([])
    const [newPhotos, setNewPhotos] = useState([]);
    

    const handleDelete = (index) => {
      setPhotos((prevPhotos) => {
        const updatedPhotos = [...prevPhotos.slice(0, index), ...prevPhotos.slice(index + 1)];
        setDeleted(prevPhotos[index]);
        return updatedPhotos;
      });
    };



    const handleAdd = (event) => {
      const newFiles = Array.from(event.target.files);
      setNewPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);
    };
  
      const handleValueChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value})
      }

      const handlePostsEdit = () => {
        editPosts(userId,postId,post,newPhotos,deleted,bearerToken)
        .then((data)=>{
          if(data.status === 1){
            setShowAlert(data.message)
            setNewPhotos("")
            setUpload(false)
            getPost(postId)
          }else{
            setSeverity('error')
            setShowAlert('Failed, try again!')
          }
         
        })
      }

      const getPost = async ()=>{
        const post = await fetchPost(postId);
        if(post.status === 1){
         fetchPost(postId);
         setPost(post.data)
         setPhotos(post.data.photos)
        
        }else{
         console.error('Error:', error);
        }
       }
 
    useEffect(() => {
     fetchCategories()
      .then((data)=> {
        setCategories(data.data)
       
      })
      .catch((error) =>{
        console.error('Error:', error);
      })

      getPost()

      


    }, []);


  return (
    <div className="overflow-hidden py-5 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-5 mx-auto flex justify-center  md:px-16 lg:px-8 lg:py-10">
      {showAlert && <SnackBar  showAlert={showAlert} alertSeverity={alertSeverity}  setShowAlert={setShowAlert}/>   }
      <div className="mx-auto  text-center items-center w-full lg:w-5/12 ">
      <div className={` px-5 pt-2 lg:mt-12 pb-5 text-start rounded sticky`}>
            <Label>Book Type</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="type"
             value={post.type} onChange={handleValueChange}
             >
            <option value="Hardcover (Original)">Hardcover (Original)</option>
            <option value="Hardcover (Generic)">Hardcover (Generic)</option>
            </Select>
            </div>

            <Label>Category</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" id='category' name="category"
             value={post.category_id} onChange={handleValueChange}
             >
                {categories?.map((cat, index)=>(
                    <option key={index} value={cat.id}>{cat.name}</option>
                ))}
            </Select>
            </div>

            <div>
                <p className='default-yellow'>Add pictures</p>
                <p className='text-neutral-600 text-sm mb-3'>The first photo will be used as your cover</p>

                <div className="flex space-x-3  w-full">
                    {photos?.map((pic, index)=>(
                      <div key={index} className=" relative mb-2">
                      <img src={pic} alt="book image" className="relative object-fit w-20 h-20 rounded-lg" />
                      <span 
                      onClick={() => handleDelete(index)} 
                      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full cursor-pointer">X</span>
                     </div>

                    ))}
                    

                    <div 
                      onClick={()=> setUpload(true)}
                      className='flex flex-col px-2  justify-center mb-2 default-yellow-bg w-20 h-20 rounded-xl items-center py-5'>
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
                  defaultValue={post.title} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>

            <Label>Author</Label>
            <div className="mb-3 rounded-lg bg-neutral-800 ">
                <input placeholder="Author's name" name="author"
                 defaultValue={post.author} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>

            <Label>Condition</Label>
            <div className="mb-3 rounded-xl bg-neutral-800 ">
            <Select className="mt-1.5 bg-neutral-800 px-3 py-3 text-white rounded-lg" name="condition" 
            value={post.book_condition} onChange={handleValueChange}
            >
                <option value="Brand new">Brand new</option>
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
                 defaultValue={post.location} onChange={handleValueChange}
                  className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
            
            </div>
                <Label>Price</Label>
                <div className="flex justify-center mb-3 space-x-3">
                <input placeholder="Asking Price" name="askPrice"
                 defaultValue={post.selling_price}
                  className="bg-neutral-800 w-full rounded-lg text-white p-2"
                   onChange={handleValueChange}
                   />
                <input placeholder="Last Price" name="lastPrice"
                 defaultValue={post.last_price}
                  className="bg-neutral-800 w-full rounded-lg text-white p-2" 
                  onChange={handleValueChange}
                  />
                </div>

                <Label>Quantity</Label>
                <div className="mb-3 rounded-lg bg-neutral-800 ">
                    <input placeholder="2" name="quantity"
                     defaultValue={post.quantity} onChange={handleValueChange}
                    className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                
                </div>

                <Label>Other details</Label>
                <div className="mb-3 rounded-lg bg-neutral-800 ">
                    <textarea rows={2}  placeholder="Other details..." name="description"
                     defaultValue={post.description} onChange={handleValueChange}
                    className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
                
                </div>
            
                <div className="mb-3 text-center rounded-xl default-yellow-bg px-3 py-2">
                    <button onClick={handlePostsEdit} type="submit" className="rounded-lg font-semibold text-center">UPDATE </button>
                </div>
                
        
            </div>

        </div>
       </div>
    </div>
  )
}

export default EditPost