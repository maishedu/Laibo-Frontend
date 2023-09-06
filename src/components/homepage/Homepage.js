import Image from 'next/image'
import HomeImage from '@/images/main page desktop_edited.jpg'
import Img from '@/images/homebg-removebg-preview.png'

function Homepage(props) {
    return (
        <main className="nc-PageContact overflow-hidden min-h-screen relative h-3/5">
            <Image src={HomeImage} className="relative  object-cover w-full h-screen"  alt="home-image" />
            <div className='hidden absolute inset-0 shadow-lg shadow-yellow lg:flex items-center justify-center '>
                <Image src={Img}   alt="home-image" />
            </div>
            <div className='absolute inset-10 flex justify-center items-center lg:hidden ' >
                <button className='p-2.5 w-36 font-medium text-sm rounded-md bg-green hover:bg-sky-900 hover:text-white text-white'>LOG IN</button>
            </div>
        </main>
    );
}

export default Homepage;