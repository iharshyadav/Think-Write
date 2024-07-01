"use client"
import { FC, useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface OutputSectionProps {
  outputAIData: string
}

const OutputSection: FC<OutputSectionProps> = ({outputAIData}) => {

    const editorRef:any = useRef<Editor>()

    
  useEffect(() => {

    const editorInstannce = editorRef.current.getInstance();
    editorInstannce.setMarkdown(outputAIData)

  },[outputAIData])
  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-semibold text-lg'>Your Result</h2>
        <Button className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(outputAIData)}
        ><Copy className='w-4 h-4'/> Copy </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  );
}

export default OutputSection