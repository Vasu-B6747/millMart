
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Gallerypage from './pages/Gallerypage';
// import Contactpage from './pages/Contactpage'
// import Footerpage from './pages/Footerpage';
// import Pricepage from './pages/Pricepage'
// import Heropage from './pages/Heropage'
import 'swiper/css';
import 'swiper/css/pagination';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '₹10,000 - ₹50,000', min: 10000, max: 50000 },
  { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
  { label: '₹100,000 - ₹200,000', min: 100000, max: 200000 },
  { label: '₹200,000 - ₹500,000', min: 200000, max: 500000 },
  { label: '₹500,000 - ₹1,000,000', min: 500000, max: 1000000 },
];

export default function LandingPage() {
  const { equipmentData } = useSelector((state) => state.equipments);
  const results = equipmentData || [];

  const [selectedItem, setSelectedItem] = useState(null);
  const [previewImages, setPreviewImages] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);
  const itemsPerPage = 12;

  const handlePageChange = ({ selected }) => setCurrentPage(selected);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };
  const handleRangeChange = (e) => {
    const range = priceRanges.find((r) => r.label === e.target.value);
    setSelectedRange(range);
    setCurrentPage(0);
  };

  const filteredItems = results.filter((item) => {
    const matchesText =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.equipmentType.toLowerCase().includes(search.toLowerCase()) ||
      item.condition.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === '' || item.location?.address?.toLowerCase().includes(location.toLowerCase());

    const matchesPrice =
      item.price >= selectedRange.min && item.price <= selectedRange.max;

    return matchesText && matchesLocation && matchesPrice;
  });

  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Top Bar */}
      <div className="bg-gray-700 text-white px-6 py-4 flex flex-wrap justify-between items-center gap-2 flex-shrink-0">
        <div>
          {/* <img className="h-20 rounded w-full object-cover object-center mb-6" src="src/assets/download (2).png" alt="content"/> */}
          <h1 className="text-[2rem] font-bold text-white">Millmart</h1>
          <h6 className="text-[1rem] font-bold text-red-300">Buy/Sell & Upgrade Your Mill</h6>
        </div>
        <input
          className="w-40 md:w-64 px-3 py-1 rounded shadow text-black"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search name, type, condition..."
          className="w-40 md:w-64 px-3 py-1 rounded shadow text-black"
        />
        <select
          value={selectedRange.label}
          onChange={handleRangeChange}
          className="px-3 py-1 border rounded shadow text-black"
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
       
        <div className="flex gap-3">
  <Link
    to="/login"
    className="px-4 py-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-200 text-sm font-medium"
  >
    Login
  </Link>
  <Link
    to="/register"
    className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 text-sm font-medium"
  >
    Register
  </Link>
</div>

      </div>

      {/* Scrollable Equipment Section */}
      <div className="flex-1 overflow-auto p-4 bg-gray-100 w-full">
      <div className="flex-1 overflow-auto p-4 bg-gray-100 w-full">
        {/* <Heropage/> */}
        <div className="max-w-screen-2xl mx-auto">
          {/* <h2 className="text-2xl font-bold mb-6">List of Equipments</h2> */}

          {currentItems.length === 0 ? (
            <p className="text-center text-gray-500">No equipments found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((item, index) => {
                const mainImage = previewImages[index] || item.photos?.[0];
                return (
                  <div
                    key={index}
                    className="bg-gray-300 rounded shadow p-4 border cursor-pointer hover:shadow-md transition"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img
                      src={mainImage}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 capitalize">{item.equipmentType} ({item.condition})</p>
                    <p className="text-sm font-medium">{item.brand}</p>
                    <p className="text-sm">₹{item.price.toLocaleString()} ({item.yearManufactured})</p>
                    <p className="text-xs text-gray-500">📍 {item.location?.address}</p>
                    <div className="flex gap-2 mt-2">
                      {item.isVerified && (
                        <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                      )}
                      {item.isSold && (
                        <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">Sold</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredItems.length > itemsPerPage && (
            <ReactPaginate
              pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center mt-6"
              pageClassName="mx-1 px-3 py-1 border rounded"
              activeClassName="bg-blue-600 text-white"
              previousLabel="Previous"
              nextLabel="Next"
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold">{selectedItem.title}</h3>
            <p className="text-sm mb-2">{selectedItem.equipmentType} ({selectedItem.condition}) — {selectedItem.brand}</p>
            <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
              {selectedItem.photos?.map((photo, i) => (
                <SwiperSlide key={i}>
                  <img src={photo} alt={`Slide ${i}`} className="w-full h-64 object-cover rounded" />
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="mt-2 text-sm">{selectedItem.description}</p>
            <p className="mt-1 text-sm">📍 {selectedItem.location?.address}</p>
            <p className="text-md font-semibold mt-2">₹{selectedItem.price.toLocaleString()}</p>
          </div>
           
        </div>
      )}
      <div>
     {/* <Gallerypage/>
     <Contactpage/>
     <Footerpage/>
     <Pricepage /> */}
    </div>  
      </div>
      
    </div>
    
  );
}



