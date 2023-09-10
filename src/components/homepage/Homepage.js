import Image from 'next/image'
import HomeImage from '@/images/main page desktop_edited.jpg'
import Img from '@/images/logo4 copy.png'
import Link from 'next/link';

function Homepage(props) {
    return (
        <main className="nc-PageContact overflow-hidden min-h-screen relative h-3/5">
            <Image src={HomeImage} className="relative  object-cover w-full h-screen"  alt="home-image" />
            <div className='hidden absolute inset-0 shadow-lg shadow-yellow lg:flex items-center justify-center '>
                <Image src={Img} className='w-64 h-64'   alt="home-image" />
            </div>
            <div className='absolute inset-10 flex justify-center items-center lg:hidden ' >
                <Link href={'/login'}>
                <button className='p-2.5 w-36 font-medium text-sm rounded-md bg-green hover:bg-sky-900 hover:text-white text-white'>LOG IN</button>
                </Link>
               
            </div>
        </main>
    );
}

export default Homepage;