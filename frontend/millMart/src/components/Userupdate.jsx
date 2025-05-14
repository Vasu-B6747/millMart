import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from '../configure/baseURL'; // Make sure axios is configured with baseURL & token
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser } from '../slices/userSlice';

export default function UserUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {userData}=useSelector((state)=>{
    return state.user
  })
// console.log(users)
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });
  const [currentUser,setCurrentUser]=useState(null)
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // Optional: Load existing user data for pre-filling
//  useEffect(() => {
//   if (id && userData) {
//     setUser({
//       name: userData.name || '',
//       email: userData.email || '',
//       address: userData.address || '',
//       password: '' // Do NOT prefill password fields for security
//     });
//   }
// }, [id, userData]);
useEffect(() => {
const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/${id}`,{headers:{Authorization:localStorage.getItem('token')}});
         setUser({
      name: userData.name || '',
      email: userData.email || '',
      address: userData.address || '',
      password: '' // Do NOT prefill password fields for security
    });
        setCurrentUser(response.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id]);
console.log(currentUser)
   const handleChange = (e) => {
    const { name, value } = e.target;
      setUser(prev => ({ ...prev, [name]: value }));
    }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setClientErrors({});
    setServerErrors(null);

    const errors = {};
    if (!user.name.trim()) errors.name = 'Name is required';
    if (!user.email.trim()) errors.email = 'Email is required';
    if (!user.address.trim()) errors.address = 'Address is required';
    // if (!user.password.trim()) errors.address = 'Password is required';
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      setLoading(false);
      return;
    }
    
    const userObj={...currentUser,name:user.name,email:user.email,address:user.address,password:user.password}
    
    const resetForm=()=>{
        setUser({name:'',address:'',email:'',password:''})
    }
    // console.log(userObj)
    dispatch(updateUser({userObj,resetForm}))
    alert('Your account info was updated. Please log in again.');
    localStorage.removeItem('token');
    setLoading(false);
    navigate('/login');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      )}

      <div className="w-full max-w-md p-8 bg-white rounded shadow-md relative z-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

        {serverErrors && (
          <div className="mb-4 text-red-600 text-sm">
            <p>Errors:</p>
            <ul className="list-disc list-inside">
              {serverErrors.map((err, i) => <li key={i}>{err.msg || err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {clientErrors.name && <p className="text-red-500 text-sm">{clientErrors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {clientErrors.email && <p className="text-red-500 text-sm">{clientErrors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Password (optional)</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {clientErrors.address && <p className="text-red-500 text-sm">{clientErrors.address}</p>}
          </div>

          
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            disabled={loading}
          >
            Update
          </button>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition mt-5"
            onClick={()=>navigate('/dashboard/account')}
          >
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
