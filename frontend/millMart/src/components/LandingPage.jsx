import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-indigo-600">Millmart</h1>
        <div>
          <Link to="/login" className="text-indigo-600 mx-2 hover:underline">Login</Link>
          <Link to="/register" className="text-indigo-600 mx-2 hover:underline">Register</Link>
        </div>
      </div>

      {/* Equipment List Placeholder */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Equipment</h2>
        <ul className="space-y-2">
          <li className="bg-white p-4 rounded shadow">Excavator - Model X123</li>
          <li className="bg-white p-4 rounded shadow">Bulldozer - Cat D6</li>
          <li className="bg-white p-4 rounded shadow">Crane - Liebherr LTM</li>
        </ul>
      </div>
    </div>
  );
}
