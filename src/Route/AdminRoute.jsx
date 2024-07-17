import React from 'react'
import { Link } from 'react-router-dom'

function AdminRoute() {
  return (
    <div className='flex items-center justify-center gap-2 pt-5 flex-wrap'>
          <Link to={'/allUser'} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All User</Link>
          <Link to={'/allTransAdmin'} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All Transactions </Link>
        </div>
  )
}

export default AdminRoute