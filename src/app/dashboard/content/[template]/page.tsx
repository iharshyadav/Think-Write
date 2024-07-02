"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC, useContext, useEffect, useState } from 'react'
import FormSection from '../components/FormSection'
import OutputSection from '../components/OutputSection'
import { ArrowLeft } from 'lucide-react'
import Template from '@/app/(data)/Template'
import { TEMPLATE } from '../../components/TemplateListSection'
import { chatSession } from '@/utils/AiModel'
import {connectToDB} from '@/utils/database'
import AISchemaDB from '@/utils/schema'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { countWords } from '@/lib/action'
// import AISchemaDB from '@/utils/schema'

interface PROPS{
  params:{
      'template':string
  }
}

const Page = (props:PROPS) => {

  const [loading,setLoading]=useState(false);
  const [outputAIData, setOutputAIData] = useState<string>("")
  const {limit, setLimit} = useContext(TotalUsageContext)
  const router = useRouter();

  const { user } = useUser()

  const render = async () =>{
    const track : number | undefined = await countWords();
    setLimit(track)
    console.log(track)
  }

  useEffect(() => {
    render();
  },[])


  const selectedTemplate : TEMPLATE | undefined = Template?.find((item)=>item.slug==props.params['template']);
  const generateAIContent = async (formData:any) => {

    setLoading(true)
    try {
      if(limit >= 10000){
        console.log("error to generate")
        setLoading(false)
        router.push('/dashboard/billing')
        return
      }
      
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
      const sendMessageToAI = await chatSession.sendMessage(FinalAIPrompt);
      
        const responseText = await sendMessageToAI?.response.text(); // Ensure this is awaited
         setOutputAIData(responseText);
        // console.log(outputAIData)
        const parsedFormData = JSON.parse(JSON.stringify(formData));
        await saveToDB(parsedFormData, responseText, selectedTemplate?.slug);
        render();
    } catch (error) {
      console.error("Error in generateAIContent:", error);
    }
  }

  const saveToDB = async (formData:any , aiResponse:string,slug:any) => {

   try {
    await connectToDB();
    console.log("first")
    const {input1 , input2} = formData;
    console.log(input1,input2,slug,aiResponse)
    await axios.post('/api/appli',{
      input1,
      input2,
      aiResponse,
      slug,
      user:user?.primaryEmailAddress?.emailAddress
    }).then(() => {
      console.log("success")
    setLoading(false);
    }).catch((e:any) => {
      console.log(e)
    })
    // const dbAI = await AISchemaDB.create({
    //   niche: input1,
    //   outline: input2,
    //   aiResponse,
    //   slug,
    //   // createdBy : "hatsh"
    // });

    // console.log(dbAI)
   } catch (error) {
    console.log("failed to save data")
   }
  }
  return (
    <div className='p-5'>
    <Link href={"/dashboard"}>
        <Button> <ArrowLeft /> Back</Button>
    </Link>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
        {/* FormSection  */}
            <FormSection 
            userFormInput={(v:any) => generateAIContent(v)}
            loading={loading}
            selectedTemplate={selectedTemplate}
            />
        {/* OutputSection  */}
        <div className='col-span-2'>
            <OutputSection outputAIData={outputAIData}  />
            </div>
    </div>
</div>
  )
}

export default Page