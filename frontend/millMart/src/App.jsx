import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Millmart from './componenets/Millmart';
import Login from './componenets/Login';
import Register from './componenets/Register';
import LandingPage from './componenets/LandingPage';

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={isLoggedIn ? <Millmart /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
