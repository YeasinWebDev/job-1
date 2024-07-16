import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth/ContextProvider'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
const useAxiosSecure = () => {
  const { LogOut } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        // console.log('error tracked in the interceptor', error)
        if (error.response.status === 401 || error.response.status === 403) {
          await LogOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [LogOut, navigate])

  return axiosSecure
}

export default useAxiosSecure
