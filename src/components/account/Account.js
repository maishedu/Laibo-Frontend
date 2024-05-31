'use client'
import React from 'react'
import Overdraft from './Overdraft'
import TransactionSummary from './TransactionSummary'
import Transaction from './Transactions'
import Link from 'next/link'

const Account = () => {
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-8  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className=" lg:flex flex-col  justify-center  items-center  xl:flex-row ">
          <div className='lg:flex justify-center '>
          <div className="w-full mb-12">
            <Overdraft/>
            <TransactionSummary/>
            <div className='mt-4'>
              <Link href={'/apply-loan-overdraft'} className='text-blue-700 font-semibold underline'>Apply for traders overdraft</Link>
            </div>
          </div>

          {/* <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <Transaction/>
            </div>
          </div> */}

          </div>
        </div>

    </div>
    </div>
  )
}

export default Account;