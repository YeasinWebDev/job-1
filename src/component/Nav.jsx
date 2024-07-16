import React, { useContext } from 'react'
import { AuthContext } from '../Auth/ContextProvider'
import useUser from '../Hooks/useUser'
import { Link } from 'react-router-dom'

function Nav() {
  const data = useContext(AuthContext)
  const [userdata] = useUser()
  console.log(userdata)
  // console.log(data.user?.email)
  return (
    <div className='flex items-center justify-between border-b-2 pb-2 border-black'>
        <h1 className='font-bold text-xl'>Pocket Pay</h1>
        <div>
            <ul className='flex items-center justify-center gap-3 font-semibold'>
                <Link>Dashboard</Link>
                <Link to={'/'}>SignIn</Link>
            </ul>
        </div>
    </div>
  )
}

export default Nav