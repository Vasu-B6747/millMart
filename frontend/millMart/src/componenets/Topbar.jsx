export default function Topbar() {
    return (
      <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">Welcome to Dashboard</h1>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="border px-2 py-1 rounded-md" />
          <img src="https://via.placeholder.com/30" className="rounded-full" alt="user" />
        </div>
      </header>
    );
  }
  