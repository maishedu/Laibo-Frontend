import Image from 'next/image'
import HomeImage from '@/images/main page desktop_edited.jpg'

export default function Home() {
  return (
    <main className=" min-h-screen  items-center ">
     <Image src={HomeImage} alt="home-image" />
    </main>
  )
}
