import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Auth/ContextProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        pin: '',
        mobileNumber: '',
        email: '',
    });

    const axiosCommon = useAxiosCommon()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, pin, mobileNumber, email } = formData;

        if (!/^\d{6}$/.test(pin)) {
            setError('PIN must be a 5-digit number');
            return;
        }

        try {
            const result = await createUser(email, pin)
            const response = await axiosCommon.post('/user', {
                name,
                pin,
                mobileNumber,
                email,
                approved:false,
                balance:0,
                role: "user"
            });
            console.log(response)
            toast.success("Sign Up successfully!");
            navigate('/profile')

        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up. Please try again.');
        }
    };

    return (
        <div className="signup-container pt-5">
            <h2 className='flex items-center justify-center text-4xl font-bold'>Sign Up</h2>
            <div className='flex items-center flex-col pt-10'>
                <form onSubmit={handleSubmit} className='w-fit border-2 p-10 rounded-xl border-black'>
                    <div className='border-2  w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='border-b-2 pl-2 outline-none'
                        />
                    </div>
                    <div className='border-2  w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>6-digit PIN:</label>
                        <input
                            type="password"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            required
                            className='border-b-2 pl-2 outline-none'
                        />
                    </div>
                    <div className='border-2  w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>Mobile Number:</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            className='border-b-2 pl-2 outline-none'
                        />
                    </div>
                    <div className='border-2  w-fit p-3 rounded-xl mb-2 border-black'>
                        <label className='font-semibold text-lg'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='border-b-2 pl-2 outline-none'
                        />
                    </div>
                    <button type="submit" className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center w-full'>Sign Up</button>

                    <h1 className='flex items-center justify-center pt-4 font-semibold'>Already Have an Account <Link to={'/'} className='text-blue-600 font-semibold pl-4'>SignIn</Link></h1>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
