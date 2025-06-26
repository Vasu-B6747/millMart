import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail } from 'validator';
import { login } from '../slices/userSlice';
import {Eye,EyeOff} from 'lucide-react'
import axios from '../configure/baseURL'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass,setShowPass]=useState(false)
  const [clientErrors, setClientErrors] = useState({}); 
  const [serverErrors, setServerErrors] = useState(null); 
  const navigate = useNavigate(); 
  const dispatch=useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here
    const errors={}
    if(email.trim().length === 0) {
                errors.email = 'email is required'; 
            } else if(!isEmail(email)) { // check email format
                errors.email = 'email is invalid'; 
            }
    
            if(password.trim().length === 0) {
                errors.password = 'password is required'; 
            } else if(password.trim().length < 8 || password.trim().length > 128) {
                errors.password = 'password should be between 8 to 128 characters'; 
            }
            if(Object.keys(errors).length > 0) {
                setClientErrors(errors); 
            } else {
                const formData = {
                    email: email,
                    password: password
                }
                try {
                    const response = await axios.post('login', formData)
                    console.log(response.data); 
                    localStorage.setItem('token',response.data)
                    const userResponse=await axios.get('profile',{headers:{Authorization:localStorage.getItem('token')}})
                    console.log(userResponse.data)
                    dispatch(login(userResponse.data))
                    // navigate('/account'); 
                } catch(err) {
                    console.log(err)
                    setServerErrors(err.response.data.error); 
                    setClientErrors({}); 
                }
            }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
         { (serverErrors &&typeof serverErrors=='object')&&(<ul>
                        { serverErrors.length>0 &&serverErrors.map((err, i) => {
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul>)}
            {(serverErrors&&typeof serverErrors=='string')&&<div>
                    {/* <h3>These error/s prohibitted the form from being saved: </h3> */}
                   <h2>{serverErrors}</h2>
                </div> }
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             { clientErrors.email && <p style={{color:'red'}}> { clientErrors.email } </p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <Eye /> : <EyeOff />}
              </span>
          </div>
  {clientErrors.password && (
    <p style={{ color: "red" }}>{clientErrors.password}</p>
  )}
</div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">Sign Up</a>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          forgotPassword?{' '}
          <a href="/forgot" className="text-indigo-600 hover:underline">Click here</a>
        </p>
      </div>
    </div>
  );
}
