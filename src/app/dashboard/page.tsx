"use client"
import React, { useState } from 'react'
import SearchSection from './components/SearchSection'
import TemplateListSection from './components/TemplateListSection'

function Dashboard() {
  const [userSearchInput,setUserSearchInput]=useState<string>()
  return (
    <div>
        {/* Search Section  */}
        <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)} />

        {/* Template List Section  */}
        <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard