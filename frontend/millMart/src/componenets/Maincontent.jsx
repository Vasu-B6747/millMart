export default function MainContent() {
    return (
      <main className="p-6 overflow-y-auto flex-1">
        <div className="text-2xl font-semibold mb-4">Dashboard Overview</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Total Listings</div>
          <div className="bg-white p-4 rounded shadow">Messages</div>
          <div className="bg-white p-4 rounded shadow">Visitors</div>
        </div>
      </main>
    );
  }
  