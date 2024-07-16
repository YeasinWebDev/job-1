import React, { useState } from 'react'
import Modal from '../component/Model';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

function UserRoute() {
    const axiosSecure = useAxiosSecure()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState('');

    // const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handelclick = (type) =>{
        setIsModalOpen(true);
        setType(type);
    }
const handleCashIn = async(name,email,amount,type,toemail) =>{
    console.log(name,email,amount,type,toemail);
    const data = {
        name,
        email,
        amount:Number(amount),
        approved:false,
        type,
    }
    const data2 = {
        name,
        email,
        amount:Number(amount),
        type,
        toemail
    }

    if(type === 'Cash-in') {
        try {
            const res = await axiosSecure.post('/cashIn', data)
            toast.success('Cash-in Request Send')
        } catch (error) {
            toast.error(error.massage)
        }
    }else if(type === 'Cash-out'){
        try {
            const res = await axiosSecure.post('/cashOut', data)
            toast.success('Cash-out Request Send')
        } catch (error) {
            toast.error(error.massage)
        }
    }else if(type === 'Send Money'){
        try {
            const res = await axiosSecure.post('/sendMoney', data2)
            toast.success('Send Money Successful')
        } catch (error) {
            toast.error(error.massage)
        }
    }
}

    return (
        <div className='flex items-center justify-center gap-2 pt-5 flex-wrap'>
            <button onClick={() => handelclick('Send Money')} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Send Money</button>
            <button onClick={() => handelclick("Cash-Out")} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Cash-Out</button>
            <button onClick={() => handelclick("Cash-in")} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>Cash-in</button>
            <button onClick={() => handelclick()} className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center hover:bg-blue-800'>History</button>
            <Modal isOpen={isModalOpen} type={type} onClose={handleCloseModal} onCashIn={handleCashIn} />
        </div>
    )
}

export default UserRoute