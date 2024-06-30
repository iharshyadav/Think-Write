import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
import Template from '@/app/(data)/Template'

export interface TEMPLATE{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:FORM[]
}

export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

function TemplateListSection({userSearchInput}:any) {

  


  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
        {Template.map((item:TEMPLATE,index:number)=>(
            <TemplateCard key={index} {...item} />
        ))}
    </div>
  )
}

export default TemplateListSection