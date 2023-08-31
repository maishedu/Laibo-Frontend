import Image from 'next/image'
import HomeImage from '@/images/main page desktop_edited.jpg'

export default function Home() {
  return (
    <main className="lg:min-h-screen  items-center ">
     <Image src={HomeImage}className='object-fit'  alt="home-image" />
    </main>
  )
}
