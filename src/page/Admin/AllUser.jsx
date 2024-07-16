import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../component/LoadingSpinner';
import toast from 'react-hot-toast';

function AllUser() {
    const axiosSecure = useAxiosSecure()
    const { data: userdata = [],refetch, isLoading: isUserLoading } = useQuery({
        queryKey: ['AllUsers'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/admin/users`);
            return response.data;
        }
    });

    const handelchange = (val,id) => {
        axiosSecure.put(`/admin/users/${id}`, { approved: val })
        .then(res => {
            refetch(),
            toast.success("User status updated successfully!")
        })
        .catch(err => toast.error(err.message))
        
    }


if(isUserLoading){
    return <LoadingSpinner/>
}



    return (
        <div className='xl:w-[60%] mx-auto'>
            <h1 className='text-3xl font-semibold flex items-center justify-center py-10'>AllUser</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th className='text-lg'>Name</th>
                                <th className='text-lg'>Role</th>
                                <th className='text-lg'>Approved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userdata.map((user, index) => (
                                    <tr className='font-semibold  text-lg' key={index}>
                                        <td className='font-semibold  text-lg'>{index + 1}</td>
                                        <td className='font-semibold  text-lg'>{user.name}</td>
                                        <td className='font-semibold  text-lg'>{user.role}</td>
                                        <td className='font-semibold  text-lg'>{user.approved ? <span className='text-green-600'>Yes</span> : <span className='text-red-600'>No</span>}</td>
                                        <td><button onClick={() => handelchange(true, user._id)} className='btn text-lg bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>activate </button></td>
                                        <td><button onClick={() => handelchange(false, user._id)} className='btn text-lg bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>block</button></td>
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

export default AllUser