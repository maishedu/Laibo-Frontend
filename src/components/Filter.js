import React, { useRef } from 'react';
import Label from './Label'
import Select from '@/shared/Select'
import Link from 'next/link'

const Filter = ({searchDetails,clear, handleValueChange,classes,enterButton}) => {
    return (
      <div className={`${classes} px-5 pt-6 lg:mt-12 pb-5 rounded sticky`}>
        <Label>Book Cover</Label>
     <div className="mb-3 rounded-xl bg-neutral-800 ">
     <Select className="mt-1.5 w-full bg-neutral-800 px-3 py-3 text-white rounded-lg" name="bookType" value={searchDetails.bookType} onChange={handleValueChange}>
       <option value="">Select Type</option>
       <option value="Paperback">Paperback</option>
       <option value="Hardcover">Hardcover</option>
     </Select>
     </div>

     <Label>Condition</Label>
       <div className="mb-3 rounded-xl bg-neutral-800 ">
       <Select className="mt-1.5 bg-neutral-800 px-3 py-3 text-white rounded-lg" name="condition" value={searchDetails.condition} onChange={handleValueChange}>
             <option value="">Select Condition</option>
             <option value="Mint"  >Mint</option>
             <option value="Good">Good</option>
             <option value="Ok">Ok</option>
             <option value="Bad">Bad</option>
           <option value="very-bad">Terrible</option>
       </Select>
     </div>

     {/* <Label>Location</Label>
       <div className="mb-3 rounded-lg bg-neutral-800 ">
         <input placeholder="Location" name="location" value={searchDetails.location} onChange={handleValueChange} className="text-white rounded-lg p-2 bg-neutral-800 w-full"  />
      
     </div> */}
        <Label>Price</Label>
        <div className="flex justify-center mb-3 space-x-3">
         <input placeholder="Min price" name="minPrice" value={searchDetails.minPrice} className="bg-neutral-800 w-full rounded-lg text-white p-2" onChange={handleValueChange}/>
         <input placeholder="Max price" name="maxPrice" value={searchDetails.maxPrice} className="bg-neutral-800 w-full rounded-lg text-white p-2" onChange={handleValueChange}/>
        </div>

        <div className="mb-3 cursor-pointer text-center rounded-xl default-yellow-bg px-3 py-2">
            <Link href={`/market/search/?query=${searchDetails.query}&customer_id=${searchDetails.customer_id}&bookType=${searchDetails.bookType}&condition=${searchDetails.condition}&location=${searchDetails.location}&maxPrice=${searchDetails.maxPrice}&minPrice=${searchDetails.minPrice}&page=1&limit=10`}>
                <button ref={enterButton} type="submit" className="rounded-lg text-center">Show results</button>
            </Link>
        </div>
        <div className="mb-3 text-center rounded-xl bg-white px-3 py-2">
            <button onClick={clear}  className="rounded-lg text-center">Clear Filter</button>
        </div>
   
   </div>
  )
}

export default Filter