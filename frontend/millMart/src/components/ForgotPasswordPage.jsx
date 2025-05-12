import { useState } from 'react';
import axios from '../configure/baseURL'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const sendLink=await axios.post('forgotpassword',{email})
        console.log(sendLink.data)
    }catch(err){
        console.log(err)
    }
    // Call your backend API here to send reset link
    console.log("Reset password link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-6">Forgot Password</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
