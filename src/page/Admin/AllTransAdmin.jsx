import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

function AllTransAdmin() {
    const axiosSecure = useAxiosSecure()

    const { data: userdata = [], isLoading: isUserLoading, refetch } = useQuery({
        queryKey: ['AgancyHis'],
        queryFn: async () => {
          const response = await axiosSecure.get(`/agencyHis`);
          return response.data;
        }
      });
  return (
    <div>
        <h1 className='flex items-center justify-center font-bold text-lg md:text-2xl pt-10'>All Transactions</h1>

        <div className='lg:w-[85%] mx-auto pt-10'>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className='border-b-2 border-black'>
                <th></th>
                <th className='font-semibold text-lg'>Name</th>
                <th className='font-semibold text-lg'>Amount</th>
                <th className='font-semibold text-lg'>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                userdata?.slice(0,20).map((user, i) => (
                  <tr key={i} className='border-b-2 border-black py-2'>
                    <th className='font-semibold text-lg'>{i + 1}</th>
                    <td className='font-semibold text-lg'>{user?.name}</td>
                    <td className='font-semibold text-lg'>{user?.amount}</td>
                    <td className='font-semibold text-lg'>{user?.type}</td>
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

export default AllTransAdmin