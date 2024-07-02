import { UserProfile } from '@clerk/nextjs'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  
  return <div>
      <div className='flex items-center justify-center h-full'>
        <UserProfile routing="hash"/>
    </div>
  </div>
}

export default page