import React from 'react'
import Image from 'next/image'
import Img1 from '@/images/bid phone.png'
import Img2 from '@/images/The market phone .png'
import Img3 from '@/images/Purchase offer page.png'
import Img4 from '@/images/Deals phone.png'
import Img5 from '@/images/Account.png'
import Img6 from '@/images/Transactions phone.png'
import Img7 from '@/images/Library screen.png'
import Img8 from '@/images/links screen.png'

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
                    MAKE MONEY<br /> TRADING BOOKS<br />
                  </p>
                  <p className="text-md font-semibold text-white">
                    Buy, sell & exchange books on laibo.
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
                    CLOSE DEALS AND <br /> TRADE SECURELY<br />
                  </p>
                  <p className="text-md font-semibold text-white">
                    Once deals have been closed, Laibo holds the money and uses 2-way confirmations from the buyer and seller to ensure that trades are completed before
                    reimbursing or paying out funds.
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
                    Laibo generates receipts after every completed trade and keeps account of your transactions . You also get an overdraft if you trade consistently with laibo.
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
                    CURATE & BUILD<br /> YOUR LIBRARY.
                  </p>
                  <p className="text-md font-semibold text-white">
                    Laibo keeps track of the live market prices and the total market value of the books in your library
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
                 SHARE YOUR BOOKS<br /> WITH OTHERS
                  </p>
                  <p className="text-md font-semibold text-white">
                    Share links so others can view your books and trade with you.
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