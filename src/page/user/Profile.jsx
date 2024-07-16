import React from 'react'
import useUser from '../../Hooks/useUser'

function Profile() {
  const [userData] = useUser()
  if(!userData.approved && userData.role === 'user'){
    return <h1 className='flex items-center justify-center font-semibold text-lg md:text-2xl pt-10'>Your account is not approved yet. Please wait.</h1>
  }
  return (
    <div className='xl:w-[60%] mx-auto relative'>
      {
        !userData.role === 'admin' && <h1 className='absolute right-0 py-3 text-xl'>Balance: <span className='text-xl font-semibold text-orange-600'>{userData?.balance}</span> BDT</h1>
      }
      <div className='flex items-center justify-center flex-col gap-2 pt-20'>
          <h1 className='text-3xl font-semibold'>{userData?.name}</h1>
          <h1 className='font-semibold text-xl'>Email: <span className='text-lg font-normal'>{userData?.email}</span></h1>
          <h1 className='font-semibold text-xl'>Mobile: <span className='text-lg font-normal'>{userData?.mobileNumber}</span></h1>
          <h1 className='font-semibold text-xl'>Role: <span className='text-lg font-semibold text-orange-600 '>"{userData?.role}"</span></h1>

        {userData.role === 'user' && <div className='flex items-center justify-center gap-2 pt-5 flex-wrap'>
          <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Send Money</button>
          <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Cash-Out</button>
          <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Cash-in</button>
          <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>History</button>
        </div>}

        {userData.role === 'admin' && <div className='flex items-center justify-center gap-2 pt-5 flex-wrap'>
          <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All User</button>
          <button className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>All Transactions </button>
        </div>}


      </div>
    </div>
  )
}

export default Profile