"use client"
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UpgradeUsageContext } from '@/app/(context)/UpgradeUsageCredit';
import { Button } from '@/components/ui/button'
import { checkUserSubscription } from '@/lib/action';
import Link from 'next/link';
import React, { useContext } from 'react'


function UsageTrack() {
  
  const {limit} = useContext(TotalUsageContext)
  const {upgradeWords} = useContext(UpgradeUsageContext)


  return (
    <div className='m-5'>
        <div className='bg-primary text-white p-3 rounded-lg'>
            <h2 className='font-medium'>Credits</h2>
            <div className='h-2 bg-[#8a5959] w-full rounded-full mt-3'>
                <div className='h-2 bg-white rounded-full'
                style={{
                    width:(limit || 0)/upgradeWords>1?100+"%":((limit || 0)/upgradeWords)*100+"%"
                }}
                ></div>
            </div>
            <h2 className='text-sm my-2'>{limit}/{upgradeWords} credit used</h2>
        </div>
        <Link href='/dashboard/billing'><Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button></Link>
    </div>
  )
}

export default UsageTrack