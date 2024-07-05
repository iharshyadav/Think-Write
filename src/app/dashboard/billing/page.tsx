"use client"
import { Button } from '@/components/ui/button'
import { saveSubcription } from '@/lib/action'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Script from 'next/script'
import { FC, useState } from 'react'

interface pageProps {
  
}

const Billing: FC<pageProps> = ({}) => {

  const [loading,setLoading]=useState(false);

  const CreateSubscription=()=>{
    setLoading(true)
    axios.post('/api/create-subscription',{})
    .then(resp=>{
      console.log(resp.data);
      OnPayment(resp.data.id)
    },(error)=>{
      setLoading(false);
    })
  }

  const loadScript = (src:any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const OnPayment=async(subId:string)=>{
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
   );

   if (!res) {
      alert("Razropay failed to load!!");
      return;
  }
    const options={
      "key":process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id":subId,
      "name":'Think-Write App',
      description:'Monthly Subscription',
      handler:async(resp:any)=>{
        console.log(resp);
        if(resp)
          {
            const status = await saveSubcription(resp?.razorpay_payment_id)
            if(status === true) {
                  if (typeof window !== 'undefined') {
                    // @ts-ignore
                    window.location.reload();
                  }
            }
          }
        setLoading(false);
      }
    }
 
    try{
    // @ts-ignore 
    const rzp=new window.Razorpay(options);
    rzp.open();
    }
    catch(e)
    {
        console.log("Try Again...",e);
        setLoading(false);
    }
  }
  
  

  return (
    <div>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <h2 className='text-center font-bold text-3xl my-3'>Upgrade With Monthly Plan</h2>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">

  <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
    <div className="text-center">
      <h2 className="text-lg font-medium text-gray-900">
        Free
        <span className="sr-only">Plan</span>
      </h2>

      <p className="mt-2 sm:mt-4">
        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> FREE </strong>

        <span className="text-sm font-medium text-gray-700">/month</span>
      </p>
    </div>

    <ul className="mt-6 space-y-2">
      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> 10,000 Words/Month </span>
      </li>

      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> 50+ Content Templates </span>
      </li>

      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> Unlimted Download & Copy </span>
      </li>

      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> 1 Month of History </span>
      </li>
    </ul>

    <a
      href="#"
      className="mt-8 block rounded-full 
      border border-indigo-600 
      px-12 py-1 text-center text-sm font-medium bg-indigo-500 text-white
        hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    >
      Currently Active Plan
    </a>
  </div>
  <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
    <div className="text-center">
      <h2 className="text-lg font-medium text-gray-900">
        Monthly
        <span className="sr-only">Plan</span>
      </h2>

      <p className="mt-2 sm:mt-4">
        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 1000₹ </strong>

        <span className="text-sm font-medium text-gray-700">/month</span>
      </p>
    </div>

    <ul className="mt-6 space-y-2">
      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> 1,00,000 Words/Month  </span>
      </li>

      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> 50+ Template Access </span>
      </li>

      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> Unlimated Download & Copy  </span>
      </li>

      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-indigo-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

        <span className="text-gray-700"> 1 Year of History </span>
      </li>
    </ul>
    <Button
      disabled={loading}
      onClick={()=>CreateSubscription()}
      className='w-full rounded-full mt-5 p-6'
      variant='outline'
    >
      Get Started
      {loading&&<Loader2Icon className='animate-spin'/>}
      {/* {userSubscription?'Active Plan':  'Get Started'} */}
    </Button>
  </div>
</div>
</div>
  </div>
  )
}

export default Billing