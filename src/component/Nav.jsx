import React, { useContext } from 'react'
import { AuthContext } from '../Auth/ContextProvider'
import useUser from '../Hooks/useUser'
import { Link } from 'react-router-dom'

function Nav() {
  const {LogOut} = useContext(AuthContext)
  const [userdata] = useUser()
  return (
    <div className='flex items-center justify-between border-b-2 pb-2 border-black'>
        <Link to={'/profile'} className='font-bold text-xl'>Pocket Pay</Link>
        <div>
            <ul className='flex items-center justify-center gap-3 font-semibold cursor-pointer'>
              {
                userdata.role? <button className='btn bg-blue-500 hover:bg-blue-800 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center' onClick={() => LogOut()}>LogOut</button>: <Link to={'/'} className='btn bg-blue-500 hover:bg-blue-800 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center'>SignIn</Link>
              }
                
            </ul>
        </div>
    </div>
  )
}

export default Nav