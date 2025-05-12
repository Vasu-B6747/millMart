import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../slices/userSlice';
import axios from '../configure/baseURL'
import { isEmail } from 'validator';
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
 const [name,setName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [address,setAddress]=useState('')
 const [profilePic,setProfile]=useState('')
 const [role,setRole]=useState('')
 const [clientErrors,setClientErrors]=useState({})
 const [serverErrors,setServerErrors]=useState(null)


  const handleSubmit = async(e) => {
    e.preventDefault();
    const resetForm=()=>{
      setName('')
      setEmail('')
      setPassword('')
      setAddress('')
      setRole('')
      setProfile('')
    }
    
     const errors = {}; 
            if(name.trim().length===0){
                errors.name='name is required'
            }
            if(!role){
                errors.role='please select role'
            }
    
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
            if(address.trim().length==0){
              errors.address='Address is required'
            }
    // console.log(formData)
    if(Object.keys(errors).length>0){
      setClientErrors(errors)
    }else{
    //   const formData={
    //   name,email,password,address,role,profilePic
    // }
      // dispatch(createUser({formData,resetForm}))
      // // console.log(formData)
      // setClientErrors({})
      // alert('registeration is successfully')
      // navigate('/login')
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("role", role);
      formData.append("profilePic", profilePic);
       try {
                      // console.log(formData)
            const response = await axios.post('register', formData)
            console.log(response.data); 
            alert('registeration is successfully')
            navigate('/login'); 
       } catch(err) {
            console.log(err)
            setServerErrors(err.response.data.error); 
            setClientErrors({}); 
       }
    }
    
    
  };

  return (
    <div
  className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('https://media.istockphoto.com/id/471247018/photo/landscape-shot-rice-mill-with-reflection-and-sunset.jpg?s=612x612&w=0&k=20&c=VlNF6AvnJCzSlRiGLUdDca60A7vdsQW2N-lTtqMfdBw=')"
  }}
>

      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Create Account</h2>
         { serverErrors && (
                <div>
                    <h3>These error/s prohibitted the form from being saved: </h3>
                    <ul>
                        { serverErrors.map((err, i) => {
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul>
                </div> 
            )}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
            {clientErrors.name&&<p style={{color:'red'}}>{clientErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
            {clientErrors.email&&<p style={{color:'red'}}>{clientErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
            {clientErrors.password&&<p style={{color:'red'}}>{clientErrors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="profilePic" className="block text-sm font-semibold text-gray-600">ProfilePic</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              // value={profilePic}
               accept="image/*"
              onChange={e => setProfile(e.target.files[0])}
              // onChange={e=>setProfile(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
          </div>
          <div className="mb-4">
  <label className="block text-sm font-semibold text-gray-600 mb-2">Select Role</label>
  <div className="flex space-x-6">
    <label className="flex items-center text-sm font-semibold text-gray-700">
      <input
        type="radio"
        id="seller"
        name="role"
        checked={role === 'seller'}
        onChange={() => setRole("seller")}
        className="mr-2"
      />
      Seller
    </label>

    <label className="flex items-center text-sm font-semibold text-gray-700">
      <input
        type="radio"
        id="buyer"
        name="role"
        checked={role === 'buyer'}
        onChange={() => setRole("buyer")}
        className="mr-2"
      />
      Buyer
    </label>
  </div>
  {clientErrors.role&&<p style={{color:'red'}}>{clientErrors.role}</p>}
</div>
<div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-600">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={e=>setAddress(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              
            />
            {clientErrors.address&&<p style={{color:'red'}}>{clientErrors.address}</p>}
</div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
