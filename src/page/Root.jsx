import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../component/Nav'

function Root() {
  return (
    <div className='px-10 py-3'>
        <Nav/>
        <Outlet/>
    </div>
  )
}

export default Root