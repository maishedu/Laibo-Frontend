import React from 'react'
import OffersSlider from './OffersSlider';

const Offers = () => {
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4 py-16 mx-auto flex justify-center  md:px-24 lg:px-8 lg:py-20">
       <div className="mx-auto  text-center items-center">

        <OffersSlider/>

       </div>
      </div>
    </div>
  )
}

export default Offers;