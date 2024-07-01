"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC, useState } from 'react'
import FormSection from '../components/FormSection'
import OutputSection from '../components/OutputSection'
import { ArrowLeft } from 'lucide-react'
import Template from '@/app/(data)/Template'
import { TEMPLATE } from '../../components/TemplateListSection'
import { chatSession } from '@/utils/AiModel'
import { connectToDB } from '@/utils/database'

interface PROPS{
  params:{
      'template':string
  }
}

const Page = (props:PROPS) => {

  const [loading,setLoading]=useState(false);
  const [aiOutput,setAiOutput]=useState<string>('');
  const [outputAIData, setOutputAIData] = useState<string>("")


  const selectedTemplate : TEMPLATE | undefined = Template?.find((item)=>item.slug==props.params['template']);
  const generateAIContent = async (formData:any) => {

    setLoading(true)
    try {
      connectToDB();
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
      const sendMessageToAI = await chatSession.sendMessage(FinalAIPrompt);
      if (sendMessageToAI && sendMessageToAI.response) {
        const responseText = await sendMessageToAI.response.text(); // Ensure this is awaited
        setOutputAIData(responseText);
      } else {
        console.log("Response or sendMessageToAI is undefined");
      }
    } catch (error) {
      console.error("Error in generateAIContent:", error);
    }
    setLoading(false);
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