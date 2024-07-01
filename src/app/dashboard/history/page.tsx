import Template from '@/app/(data)/Template'
import { Button } from '@/components/ui/button'
// import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TEMPLATE } from '../components/TemplateListSection'
import { connectToDB } from '@/utils/database'
import AISchemaD from '@/utils/schema'
// import CopyButton from './_components/CopyButton'

export interface HISTORY{
    aiResponse:string,
    niche:string,
    slug:string,
    outline:string
    user:string
}
 async function History() {

  // const [historyData, setHistoryData] = useState([]);
    
  //  useEffect(() => {

  //   const HistoryList = async () => {
  //       await connectToDB();
        const users=await currentUser();
  //       const data:History[] = AISchemaDB.findOne({
  //         users
  //       })

  //       const { aiResponse , input1 ,slug ,input2 , user} = data;

  //       console.log(aiResponse,input1,input2,slug,user)

  //       setHistoryData([data]);
  //   }
  //   HistoryList();
  //  },[])

  // console.log(users?.emailAddresses[0].emailAddress)

  const user = users?.emailAddresses[0].emailAddress;

  console.log(user)

  await connectToDB();

  const HistoryList:HISTORY[] | null = await AISchemaD?.findOne({
    user
  })

  console.log(HistoryList)
    const GetTemplateName=(slug:string)=>{

        const template:TEMPLATE|any=Template?.find((item)=>item.slug==slug)
        return template;
    }
  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
        <h2 className='font-bold text-3xl'>History</h2>
        <p className='text-gray-500'>Search your previously generate AI content</p>
        <div className='grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3'>
            <h2 className='col-span-2'>TEMPLATE</h2>
            <h2 className='col-span-2'>AI RESP</h2>
            <h2>DATE</h2>
            <h2>WORDS</h2>
            <h2>COPY</h2>
        </div>
        {HistoryList?.map((item:HISTORY,index:number)=>(
            <>
            <div className='grid grid-cols-7 my-5 py-3 px-3'>
            <h2 className='col-span-2 flex gap-2 items-center'>
                <Image src={GetTemplateName(item?.slug)?.icon} width={25} height={25} alt='icon' />
                {GetTemplateName(item.slug)?.name}
            </h2>
            <h2 className='col-span-2 line-clamp-3 mr-3'>{item?.aiResponse}</h2>
            {/* <h2>{item.cr}</h2> */}
            <h2>{item?.aiResponse.length}</h2>
            <h2>
              {/* <CopyButton aiResponse={item.aiResponse} /> */}
            </h2>
        </div>
        <hr/>
            </>
        ))}
    </div>
  )
}

export default History