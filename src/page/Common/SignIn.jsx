

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const SignIn = () => {
  const [emailOrMobile, setEmailOrMobile] = useState(''); 
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrMobile, pin }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Redirect to the desired route after successful login
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="flex items-center justify-center text-4xl font-bold">Sign In</h2>
      <div className="flex items-center flex-col pt-10">
        <form onSubmit={handleSubmit} className="w-fit border-2 p-10 rounded-xl border-black">
          <div className='border-2  w-fit p-3 rounded-xl mb-2 border-black'>
            <label htmlFor="emailOrMobile" className='font-semibold text-lg'>Email or Mobile Number:</label>
            <input
              type="text"
              id="identifier"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              required
              className='border-b-2 pl-2 outline-none'
            />
          </div>
          <div className='border-2  w-fit p-3 rounded-xl mb-2 border-black'>
            <label htmlFor="pin" className='font-semibold text-lg'>Pin:</label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className='border-b-2 pl-2 outline-none'
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className='btn bg-blue-500 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center w-full'>Sign In</button>

          <h1 className='flex items-center justify-center pt-4 font-semibold'>Don't Have an Account <Link to={'/signup'} className='text-blue-600 font-semibold pl-4'>SignUp</Link></h1>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
