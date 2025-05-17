import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ReactPaginate from "react-paginate";

export default function LandingPage() {
  const { equipmentData } = useSelector((state) => state.equipments);
  const results = equipmentData || [];

  const [selectedItem, setSelectedItem] = useState(null);
  const [previewImages, setPreviewImages] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handleThumbnailClick = (index, imageUrl) => {
    setPreviewImages((prev) => ({ ...prev, [index]: imageUrl }));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentItems = results.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
      {/* <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Equipment</h2>
        <ul className="space-y-2">
          <li className="bg-white p-4 rounded shadow">Excavator - Model X123</li>
          <li className="bg-white p-4 rounded shadow">Bulldozer - Cat D6</li>
          <li className="bg-white p-4 rounded shadow">Crane - Liebherr LTM</li>
        </ul>
      </div> */}
      <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">List of Equipments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item, index) => {
          const mainImage = previewImages[index] || item.photos?.[0];

          return (
            <div
              key={index}
              className="bg-white rounded shadow p-4 border cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={mainImage}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-1 capitalize">
                {item.equipmentType} ({item.condition})
              </p>
              <p className="text-sm text-gray-800 font-medium">{item.brand}</p>
              <p className="text-sm text-gray-600 mb-1">
                {item.yearManufactured} – ₹{item.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                📍 {item.location?.address}
              </p>

              {/* Badges */}
              <div className="flex gap-2 mb-2">
                {item.isVerified && (
                  <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
                {item.isSold && (
                  <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">
                    Sold
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap gap-2 mt-2">
                {item.photos?.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt={`Thumbnail ${i}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailClick(index, photo);
                    }}
                    className="w-12 h-12 object-cover rounded cursor-pointer border hover:border-indigo-500"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(results.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center mt-6"
        pageClassName="px-3 py-1 border border-gray-300 rounded-md mx-1"
        pageLinkClassName="text-gray-700"
        activeClassName="bg-blue-600 text-white"
        previousLabel="Previous"
        nextLabel="Next"
      />

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 max-w-2xl w-full rounded shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {selectedItem.equipmentType} ({selectedItem.condition}) —{" "}
              {selectedItem.brand}
            </p>
            <p className="text-sm text-gray-700 mb-3">{selectedItem.description}</p>

            <p className="text-sm font-medium mb-1">
              Year: {selectedItem.yearManufactured} — ₹
              {selectedItem.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              📍 {selectedItem.location?.address}
            </p>
            {/* {item.isVerified && (
  <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
    Verified
  </span>

)}
 {item.isSold && (
  <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">
    Sold
  </span>
)} */}
            {/* Swiper Carousel */}
            {/* <Swiper spaceBetween={10} slidesPerView={1}>
              {selectedItem.photos?.map((photo, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={photo}
                    alt={`Modal Photo ${i}`}
                    className="w-full h-60 object-cover rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper> */}
            <Swiper
  spaceBetween={10}
  slidesPerView={1}
  pagination={{ clickable: true }}
>
  {selectedItem.photos?.map((photo, i) => (
    <SwiperSlide key={i}>
      <img
        src={photo}
        alt={`Slide ${i}`}
        className="w-full h-60 object-cover rounded"
      />
    </SwiperSlide>
  ))}
</Swiper>

          </div>
        </div>
      )}
    </div>
    </div>
    
  );
}
