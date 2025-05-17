import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserAccount } from './slices/userSlice';
import { fetchEquipments } from './slices/equipmentSlice';
import Millmart from './components/Millmart';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import ForgotPassowrd from './components/ForgotPasswordPage';
import ResetPassword from './components/ResetPassword';
import Allusers from './components/Allusers';
import UserUpdateForm from './components/Userupdate';
import ActivateUser from './components/ActiveUsers';
import EquipmentForm from './components/EquipmentForm';
import Equipments from './components/Equipments';
import EquipmentCard from './components/EquipmentCard';
import ApproveEquips from './components/ApproveEquips';

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch=useDispatch()
   useEffect(()=>{
              if(localStorage.getItem('token')){
                  dispatch(fetchUserAccount())
                  
              }
              dispatch(fetchEquipments())
          },[dispatch])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path='/forgot' element={<ForgotPassowrd/>} />
      <Route path='/reset/:token' element={<ResetPassword/>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={isLoggedIn ? <Millmart /> : <Navigate to="/" />}>
        {/* Nested routes that render inside MainContent */}
        <Route path="users" element={<Allusers />} />
        <Route path="account" element={<Profile />} />
        <Route path="userUpdate/:id" element={<UserUpdateForm />} />
        <Route path="users/activate" element={<ActivateUser/>} />
        <Route path="equipment" element={<EquipmentForm/>} />
        <Route path="equipments" element={<Equipments/>} />
        <Route path="equipmentcard" element={<EquipmentCard/>} />
        <Route path="equipments/approve" element={<ApproveEquips/>} />
      </Route>
    </Routes>
  );
}

export default App;
