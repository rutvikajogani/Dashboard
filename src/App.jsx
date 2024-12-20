
import './App.css'
import React, { useState } from 'react';
import { Navbar } from './navbar'
import { Dashboard } from './assets/dashboard_svg'
import { Userdashboard } from './userdashboard'
import  BasicTable  from './list'




function App() {

 const [id,setId] =useState(null);
  return (
    <>
      <div className='dashboard'>
        <div className='dashboard1'>
          <h3>YOURLOGO</h3>
          <div className='Dashboard_logo'>
            <Dashboard></Dashboard>
            <h2> Dashboard</h2></div>
        </div>
        <div className='dashboard2'>
          <Navbar />
          <Userdashboard id={id} setId={setId}/>
          <BasicTable  setId={setId}/>
      </div>
      </div>
    </>
  )
}

export default App
