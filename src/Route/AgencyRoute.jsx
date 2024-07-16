import React from 'react'

function AgencyRoute() {
    return (
        <div className='flex items-center justify-center gap-2 pt-5 flex-wrap'>
            <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All Transactions </button>
            <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All History </button>
        </div>
    )
}

export default AgencyRoute