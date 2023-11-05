'use client'
import React from 'react'
import Overdraft from './Overdraft'
import TransactionSummary from './TransactionSummary'
import Transaction from './Transactions'

const Account = () => {
  return (
    <div className="overflow-hidden py-16 bg-black min-h-screen relative h-2/4">
      <div className="px-4  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="lg:flex flex-col px-16 justify-end items-center  xl:flex-row ">
          <div className=' lg:flex '>
          <div className="w-full mb-12">
            <Overdraft/>
            <TransactionSummary/>
          </div>

          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <Transaction/>
            </div>
          </div>

          </div>
        </div>

    </div>
    </div>
  )
}

export default Account;