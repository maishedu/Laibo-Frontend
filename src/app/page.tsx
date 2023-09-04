import Image from 'next/image'
import HomeImage from '@/images/main page desktop_edited.jpg'
import Img from '@/images/homebg-removebg-preview.png'

export default function Home() {
  return (
    <main className="nc-PageContact overflow-hidden min-h-screen relative">
      <Image src={HomeImage} className="relative  object-cover w-full h-screen"  alt="home-image" />
      <div className='absolute inset-0 shadow-lg shadow-yellow flex items-center justify-center '>
        <Image src={Img}   alt="home-image" />
      </div>
    </main>
  )
}
