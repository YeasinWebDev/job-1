import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Auth/ContextProvider';
import useUser from '../../Hooks/useUser';
import toast from 'react-hot-toast';

function AllTransactions() {
  const axiosSecure = useAxiosSecure()
  const [userData] = useUser()

  const { data: userdata = [], isLoading: isUserLoading, refetch } = useQuery({
    queryKey: ['AgancyTrans'],
    queryFn: async () => {
      const response = await axiosSecure.get(`/agency`);
      return response.data;
    }
  });


  const handelApproved = async(email,amount,id) => {
    
    if(userData?.balance < amount){
     return toast.error("Don't have enough money")
    }

    const data ={email,amount, agencyEmail: userData?.email,id}

    const res = await axiosSecure.post('/agency/approve', data)
    if(res.data.matchedCount>0){
      toast.success("Transaction Approved")
      refetch()
    }
  }

  if(isUserLoading){
    return <p>Loading...</p>
  }
  

  return (
    <div>
      <h1 className='flex items-center justify-center font-bold text-2xl pt-5'>All Transactions</h1>

      <div className='lg:w-[85%] mx-auto pt-10'>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className='border-b-2 border-black'>
                <th></th>
                <th className='font-semibold text-lg'>Name</th>
                <th className='font-semibold text-lg'>Amount</th>
                <th className='font-semibold text-lg'>Type</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                userdata?.map((user, i) => (
                  <tr key={i} className='border-b-2 border-black py-2'>
                    <th className='font-semibold text-lg'>{i + 1}</th>
                    <td className='font-semibold text-lg'>{user?.name}</td>
                    <td className='font-semibold text-lg'>{user?.amount}</td>
                    <td className='font-semibold text-lg'>{user?.type}</td>
                    <button onClick={() => handelApproved(user?.email,user?.amount,user?._id)} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Approved</button>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllTransactions