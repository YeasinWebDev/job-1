import React from 'react'
import useUser from '../../Hooks/useUser'
import { Link } from 'react-router-dom'
import UserRoute from '../../Route/UserRoute'
import AdminRoute from '../../Route/AdminRoute'
import AgencyRoute from '../../Route/AgencyRoute'

function Profile() {
  const [userData,refetch] = useUser()
  if(!userData.approved && userData.role !== 'admin'){
    return <h1 className='flex items-center justify-center font-semibold text-lg md:text-2xl pt-10'>Your account is not approved yet. Please wait.</h1>
  }
  return (
    <div className='xl:w-[60%] mx-auto relative'>
      {
        userData.role !== 'admin' && <h1 className='absolute right-0 py-3 text-xl'>Balance: <span className='text-xl font-semibold text-orange-600'>{userData?.balance}</span> BDT</h1>
      }
      <div className='flex items-center justify-center flex-col gap-2 pt-20'>
          <h1 className='text-3xl font-semibold'>{userData?.name}</h1>
          <h1 className='font-semibold text-xl'>Email: <span className='text-lg font-normal'>{userData?.email}</span></h1>
          <h1 className='font-semibold text-xl'>Mobile: <span className='text-lg font-normal'>{userData?.mobileNumber}</span></h1>
          <h1 className='font-semibold text-xl'>Role: <span className='text-lg font-semibold text-orange-600 '>"{userData?.role}"</span></h1>

        {userData.role === 'user' && <UserRoute refetch={refetch}/>}

        {userData.role === 'admin' && <AdminRoute/>}

        {userData.role === 'agency' && <AgencyRoute/>}


      </div>
    </div>
  )
}

export default Profile