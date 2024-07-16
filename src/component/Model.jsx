import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useUser from '../Hooks/useUser';
import bcrypt from 'bcryptjs'

const Modal = ({ isOpen, onClose, onCashIn ,type}) => {
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [userData] = useUser()

  const handleCashIn = () => {
    if (!/^\d{6}$/.test(pin)) {
      toast.error('PIN must be a 6-digit number');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error('Amount must be a positive number');
        return;
      }

    bcrypt.compare(pin, userData?.pin, (err, isMatch) => {
        if (err) {
          toast.error('Error verifying PIN');
          return;
        }
        if (!isMatch) {
          toast.error('Invalid PIN');
          return;
        }
        onCashIn(userData?.name,userData?.email, amount, type, email);
        setPin('');
        setAmount('');
        setEmail('');
        onClose();
      });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">{type}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">6-digit PIN:</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {
           type === 'Send Money' && <div className="mb-4">
            <label className="block text-sm font-medium mb-1">to</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          }
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleCashIn}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Cash In
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
