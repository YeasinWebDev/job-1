import React from 'react'
import { Link } from 'react-router-dom'

function AgencyRoute() {
    return (
        <div className='flex items-center justify-center gap-2 pt-5 flex-wrap'>
            <Link to={'/agencyTrans'} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All Transactions </Link>

            <Link to={'/agencyHis'} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All History </Link>
        </div>
    )
}

export default AgencyRoute