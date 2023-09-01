import Image from 'next/image'
import HomeImage from '@/images/main page desktop_edited.jpg'
import Img from '@/images/homebg.jpg'

export default function Home() {
  return (
    <main className="nc-PageContact overflow-hidden min-h-screen relative">
      <Image src={HomeImage} className="absolute inset-0 object-cover w-full min-h-screen"  alt="home-image" />
      {/* <div className='relative mb-32 flex self-center max-w-5xl mx-auto'>
      <Image src={Img} className="absolute inset-0 "  alt="home-image" />
      </div> */}
    </main>
  )
}
