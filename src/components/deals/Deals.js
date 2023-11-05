import React from 'react'
import DealsSlider from './DealsSlider'

const Deals = () => {
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-20">
       <div className="mx-auto  text-center items-center">

      

        <DealsSlider/>
        {/* <div className='mb-4'>
        <button className='bg-red-600 tracking-tight text-white p-1 text-xs rounded-lg w-28'>NEW OFFER!</button>
        </div> */}
        {/* <div className=" mb-5 md:mx-auto sm:text-center ">
          <div className="flex">
            <img
              className="object-cover w-10 h-10 mr-4 rounded-2xl shadow"
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
            <div className="flex flex-col justify-center">
              <p className=" text-white font-semibold">Marta Clermont</p>
            </div>
          </div>
        </div> */}
        {/* <div className="mb-4 transition-shadow duration-300 hover:shadow-xl lg:mb-6">
          <img
            className="object-cover w-56 h-32 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
            src="https://images.pexels.com/photos/3727459/pexels-photo-3727459.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
        </div>

        <div className='bg-neutral-800 p-3 w-56 rounded-lg text-white font-semibold'>
          <p>Mkt : <span className='default-green'> 700</span> </p>
          <p >Ask : 600</p>
          <p>Offer : 550</p>

        </div>

        <div className='mt-4 flex space-x-5 font-semibold'>
          <button className='default-green-bg text-white p-2 rounded-lg w-24'>Deal</button>
          <button className='bg-red-600 text-white p-2 rounded-lg w-24'>No deal</button>
        </div> */}
       
       </div>
      </div>
    </div>
  )
}

export default Deals;