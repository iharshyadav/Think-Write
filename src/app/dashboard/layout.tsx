"use client"
import React, { useState } from 'react'
import SideNav from './components/SideNav';
import Header from './components/Header';

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {


  return (
   
    <div className='bg-slate-100 min-h-screen'>
        <div className='md:w-64 hidden md:block fixed'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
          <Header/>
        {children}
        </div>
      <div>
      {/* <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="tubegurujiw" data-description="Support me on Buy me a coffee!" data-message="You can buy me coffee , If you like this app" data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script> */}
      </div>
    </div>
  )
}

export default layout