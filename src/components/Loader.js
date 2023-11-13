import React from 'react'
import {PropagateLoader} from 'react-spinners';

const Loader = () => {
  return (
    <div className='relative ml-10 '>
        <PropagateLoader
        color='yellow'
        size={10}
        />
        
    </div>
  )
}

export default Loader;