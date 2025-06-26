// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector,useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchUserAccount } from './slices/userSlice';
// import { fetchEquipments } from './slices/equipmentSlice';
// import Millmart from './components/Millmart';
// import Login from './components/Login';
// import Register from './components/Register';
// import LandingPage from './components/LandingPage';
// import Profile from './components/Profile';
// import ForgotPassowrd from './components/ForgotPasswordPage';
// import ResetPassword from './components/ResetPassword';
// import Allusers from './components/Allusers';
// import UserUpdateForm from './components/Userupdate';
// import ActivateUser from './components/ActiveUsers';
// import EquipmentForm from './components/EquipmentForm';
// import Equipments from './components/Equipments';
// import EquipmentCard from './components/EquipmentCard';
// import ApproveEquips from './components/ApproveEquips';
// import MyEquipments from './components/MyEquipments';
// import Chat from './components/Chat';
// import EquipmentSearch from './components/Search';
// import NearbyEquipmentSearch from './components/Nearby';
// import Home from './components/Home';
// import LandPage from './components/LandPage';

// function App() {
//   const { isLoggedIn } = useSelector((state) => state.user);
//   const dispatch=useDispatch()
//    useEffect(()=>{
//               if(localStorage.getItem('token')){
//                   dispatch(fetchUserAccount())
                  
//               }
//               dispatch(fetchEquipments())
//           },[dispatch])

//   return (
//     <>
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
//       <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
//       <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
//       <Route path='/forgot' element={<ForgotPassowrd/>} />
//       <Route path='/reset/:token' element={<ResetPassword/>} />

//       {/* Protected Routes */}
//       <Route path="/" element={isLoggedIn ? <Millmart /> : <Navigate to="/" />}>
//         {/* Nested routes that render inside MainContent */}
//         <Route path="users" element={<Allusers />} />
//         <Route path="account" element={<Profile />} />
//         <Route path="userUpdate/:id" element={<UserUpdateForm />} />
//         <Route path="users/activate" element={<ActivateUser/>} />
//         <Route path="equipment" element={<EquipmentForm/>} />
//         <Route path="equipments" element={<Equipments/>} />
//         <Route path="equipments/equipmentcard/:id" element={<EquipmentCard/>} />
//         <Route path="equipments/approve" element={<ApproveEquips/>} />
//         <Route path="mylist" element={<MyEquipments/>} />
//         <Route path="equipment/:id" element={<EquipmentForm/>} />
//         <Route path="chat/:id" element={<Chat/>} />
//         <Route path="chat" element={<Chat/>} />
//         <Route path="search" element={<EquipmentSearch/>} />
//         <Route path="location" element={<NearbyEquipmentSearch/>} />
//         <Route path='home' element={<Home/>}/>
//         <Route path="home/equipmentcard/:id" element={<EquipmentCard/>} />
//       </Route>
//     </Routes>
//      <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

// export default App;
import { ToastContainer } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserAccount } from './slices/userSlice';
import { fetchEquipments } from './slices/equipmentSlice';

import Millmart from './components/Millmart';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPasswordPage';
import ResetPassword from './components/ResetPassword';
import Allusers from './components/Allusers';
import UserUpdateForm from './components/Userupdate';
import ActivateUser from './components/ActiveUsers';
import EquipmentForm from './components/EquipmentForm';
import Equipments from './components/Equipments';
import EquipmentCard from './components/EquipmentCard';
import ApproveEquips from './components/ApproveEquips';
import MyEquipments from './components/MyEquipments';
import Chat from './components/Chat';
import EquipmentSearch from './components/Search';
import NearbyEquipmentSearch from './components/Nearby';
import Home from './components/Home';
import LandPage from './components/LandPage';
import RazorpayCheckout from './components/Payment';
import ReviewForm from './components/Review';
import Messages from './components/Messages';
import Paymentpage from './components/Paymentpage';
import { fetchAllpayments, userPayments } from './slices/paymentSlice';

function App() {
  const { isLoggedIn,userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount());
    }
    dispatch(fetchEquipments());
    // dispatch(fetchAllpayments())
  }, [dispatch]);
useEffect(()=>{
if(userData&&userData.role=='admin'){
  dispatch(fetchAllpayments())
}
},[userData])
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isLoggedIn ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        {isLoggedIn && (
          <Route path="/" element={<Millmart />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="/users" element={<Allusers />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/account/userUpdate/:id" element={<UserUpdateForm />} />
            <Route path="/users/activate" element={<ActivateUser />} />
            <Route path="/mylist/equipment" element={<EquipmentForm />} />
            <Route path="/dashboard/equipments" element={<Equipments />} />
            <Route path="/equipments/equipmentcard/:id" element={<EquipmentCard />} />
            <Route path="/equipments/approve" element={<ApproveEquips />} />
            <Route path="/dashboard/mylist" element={<MyEquipments />} />
            <Route path="/dashboard/equipment/:id" element={<EquipmentForm />} />
            <Route path="/equipment/chat/:recId/:id" element={<Chat />} />
            <Route path="/chat" element={<Messages />} />
            <Route path="/search" element={<EquipmentSearch />} />
            <Route path="/location" element={<NearbyEquipmentSearch />} />
            <Route path="home" element={<Home />} />
            <Route path="/dashboard/equipmentcard/:id" element={<EquipmentCard />} />
            <Route path='/payment/:id' element={<RazorpayCheckout/>}/>
            <Route path='/review/:id' element={<ReviewForm/>}/>
            <Route path='/review' element={<ReviewForm/>}/>
            <Route path='/transactions' element={<Paymentpage/>}/>
          </Route>
        )}
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
