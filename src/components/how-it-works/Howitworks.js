import React from 'react'
import './how-it-works.css'
import Image from 'next/image'
import Img1 from '@/images/bid phone.png'
import Img2 from '@/images/The market phone .png'
import Img3 from '@/images/Purchase offer page.png'
import Img4 from '@/images/Deals phone.png'
import Img5 from '@/images/Account phone.png'
import Img6 from '@/images/Transactions phone.png'
import Img7 from '@/images/Stock value.png'
import Img8 from '@/images/share link.png'

function Howitworks() {
  return (
    <div className={` overflow-hidden bg-neutral-700 min-h-screen relative`}>
      <div className="container py-16  relative mb-32  self-center  max-w-5xl mx-auto">

      <div className="px-4 flex justify-center py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg gap-2 lg:grid-cols-2 sm:mx-auto">
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div>
                  <p className="mb-4 text-4xl font-semibold default-yellow ">
                    RAHISISHA BIZ. <br /> TUMIA LAIBO <br /> KUUZA VITABU!
                  </p>
                  <p className="text-md font-semibold text-white">
                    Buy, sell, borrow and exchange books <br/> with other  users on laibo.
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Image src={Img1} className='w-48' alt="image 1" />
              <Image src={Img2} className='w-48' alt="image 2" />
            </div>
          </div>
        </div>

        <div className="flex justify-center px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg gap-2 lg:grid-cols-2 sm:mx-auto">
          <div className="grid  grid-cols-2 gap-5">
              <Image src={Img3} className='w-48 ' alt="image 3" />
              <Image src={Img4} className='w-48' alt="image 4" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div>
                  <p className="mb-4 text-4xl font-semibold default-yellow ">
                    DEALS ZAKO <br /> HAZITAWAI FAIL <br /> KU GO-THRU
                  </p>
                  <p className="text-md font-semibold text-white">
                    Once umesha kubali offer ya customer, tunahold <br/> pesa yake ndio akujie kitabu. Lazima niconfirm <br/>
                    kama hio trade imetake place ndio turelease funds <br/> kwa account yako.
                    
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div className=" flex justify-center px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg gap-2 lg:grid-cols-2 sm:mx-auto">
            <div className="flex flex-col justify-center">
              <div className="flex">
                <div>
                  <p className="mb-4 text-4xl font-semibold default-yellow ">
                    HAPO KWA<br /> ACCOUNTS, <br /> USIWORRY...
                  </p>
                  <p className="text-md font-semibold text-white">
                    We keep track of all your key accounting <br/> information na tunakuwekea marisiti. <br/>
                    Pia tunakupatia loan.
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Image src={Img5} className='w-48' alt="image 5" />
              <Image src={Img6} className='w-48' alt="image 6" />
            </div>
          </div>
        </div>

        <div className="px-4 flex justify-center py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg  lg:grid-cols-2 sm:mx-auto">
          <div className="flex  ">
              <Image src={Img7}  className='h-full w-48' alt="image 7" />
          </div>
            <div className="flex flex-col justify-center">
              <div className="flex ">
                <div>
                  <p className="mb-4 text-4xl font-semibold default-yellow ">
                    JUA VALUE<br /> YA STOCK<br /> YAKO.
                  </p>
                  <p className="text-md font-semibold text-white">
                    Post your books on Laibo to find out the total <br/> 
                    value of your stock and live market prices <br/>
                    of each of your books.
                    
                  </p>
                </div>
              </div>
            </div>
           
          </div>
        </div>

        <div className=" flex justify-center px-4 py-16 mx-auto  md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg gap-2 lg:grid-cols-2 sm:mx-auto">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <div>
                  <p className="mb-4 text-4xl font-semibold default-yellow ">
                   UZIA WATU<br /> WENGI ZAIDI!
                  </p>
                  <p className="text-md font-semibold text-white">
                    Sambaza malinks kila mahali kwa internet <br/> ndio kila mtu acheki vitabu zako.
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="flex ">
              <Image src={Img8} className='w-48' alt="image 8" />
            </div>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Howitworks