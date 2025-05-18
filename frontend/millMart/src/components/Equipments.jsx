import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function Equipments(){
  const navigate=useNavigate()
    const {equipmentData}=useSelector((state)=>{
        return state.equipments
    })
    const {userData}=useSelector((state)=>{
      return state.user
    })
    console.log(equipmentData)
    const handleVerify = (id) => {
    console.log("Verify", id);
    // Dispatch verify action here
  };

  const handleMarkSold = (id) => {
    console.log("Mark as Sold", id);
    // Dispatch sold action here
  };

  const handleApprove = (id) => {
    console.log("Approve", id);
    // Dispatch approve action here
  };
    return(
        
         <div className="p-6">
          <div><button onClick={()=>navigate('/dashboard/equipments/approve')}>Approve/verify Equips</button></div>
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">List of Equipments</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-600">
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Seller</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">Brand</th>
              <th className="border px-4 py-2 text-left">Model</th>
              <th className="border px-4 py-2 text-left">YoM</th>
              <th className="border px-4 py-2 text-left">Condition</th>
              <th className="border px-4 py-2 text-left">Price (₹)</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-left">Photo</th>
              <th className="border px-4 py-2 text-left">Status</th>
             {userData.role=='seller' &&<th className="border px-4 py-2 text-left">Actions</th>}
             <th className="border px-4 py-2 text-left">Info</th>
            </tr>
          </thead>
          <tbody>
            {equipmentData?.map((ele) => (
              <tr key={ele._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{ele.title}</td>
                <td className="border px-4 py-2">{ele.seller?.name}</td>
                <td className="border px-4 py-2">{ele.equipmentType}</td>
                <td className="border px-4 py-2">{ele.brand}</td>
                <td className="border px-4 py-2">{ele.model}</td>
                <td className="border px-4 py-2">{ele.yearManufactured}</td>
                <td className="border px-4 py-2 capitalize">{ele.condition}</td>
                <td className="border px-4 py-2">{ele.price.toLocaleString()}</td>
                <td className="border px-4 py-2">{ele.location?.address}</td>
                <td className="border px-4 py-2">
                  <img
                    src={ele.photos?.[0]}
                    alt={ele.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
               <td className="border px-4 py-2 space-y-1">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${ele.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {ele.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                  <br />
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${ele.isSold ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>
                    {ele.isSold ? 'Sold' : 'Not Sold'}
                  </span>
                  <br />
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${ele.isApproved ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
                    {ele.isApproved ? 'Approved' : 'Not Approved'}
                  </span>
                </td>
               {userData.role=='seller'&& <td className="border px-4 py-2 space-x-1">
                  <button
                    onClick={() => handleVerify(ele._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                  >
                    ✔ Verify
                  </button>
                  <button
                    onClick={() => handleMarkSold(ele._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                  >
                    🚚 Sold
                  </button>
                  <button
                    onClick={() => handleApprove(ele._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                  >
                    ✅ Approve
                  </button>
                </td>}
                <td className="border px-4 py-2"> <button
                    onClick={() => navigate(`/dashboard/equipments/equipmentcard/${ele._id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                  >
                    Info
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}











// import { useSelector } from "react-redux";
// import { useState } from "react";

// export default function Equipments() {
//   const { equipmentData } = useSelector((state) => state.equipments);
//   const results = equipmentData?.results || [];

//   const [selectedItem, setSelectedItem] = useState(null); // For modal
//   const [previewImages, setPreviewImages] = useState({}); // Track active preview image per item

//   const handleThumbnailClick = (index, imageUrl) => {
//     setPreviewImages((prev) => ({ ...prev, [index]: imageUrl }));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">List of Equipments</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {results.map((item, index) => {
//           const mainImage = previewImages[index] || item.photos?.[0];

//           return (
//             <div
//               key={index}
//               className="bg-white rounded shadow p-4 border cursor-pointer hover:shadow-md transition"
//               onClick={() => setSelectedItem(item)}
//             >
//               <img
//                 src={mainImage}
//                 alt={item.title}
//                 className="w-full h-48 object-cover rounded mb-3"
//               />

//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-sm text-gray-600 mb-1 capitalize">
//                 {item.equipmentType} ({item.condition})
//               </p>
//               <p className="text-sm text-gray-800 font-medium">{item.brand}</p>
//               <p className="text-sm text-gray-600 mb-1">
//                 {item.yearManufactured} – ₹{item.price.toLocaleString()}
//               </p>
//               <p className="text-xs text-gray-500 mb-2">📍 {item.location?.address}</p>

//               {/* Thumbnails */}
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {item.photos?.map((photo, i) => (
//                   <img
//                     key={i}
//                     src={photo}
//                     alt={`Thumbnail ${i}`}
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent modal from opening
//                       handleThumbnailClick(index, photo);
//                     }}
//                     className="w-12 h-12 object-cover rounded cursor-pointer border hover:border-indigo-500"
//                   />
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 max-w-2xl w-full rounded shadow-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
//               onClick={() => setSelectedItem(null)}
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
//             <p className="text-sm text-gray-600 mb-2">
//               {selectedItem.equipmentType} ({selectedItem.condition}) — {selectedItem.brand}
//             </p>
//             <p className="text-sm text-gray-700 mb-3">{selectedItem.description}</p>

//             <p className="text-sm font-medium mb-1">
//               Year: {selectedItem.yearManufactured} — ₹{selectedItem.price.toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               📍 {selectedItem.location?.address}
//             </p>

//             <div className="grid grid-cols-2 gap-4">
//               {selectedItem.photos?.map((photo, i) => (
//                 <img
//                   key={i}
//                   src={photo}
//                   alt={`Modal Photo ${i}`}
//                   className="w-full h-40 object-cover rounded"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import ReactPaginate from "react-paginate";

// export default function Equipments() {
//   const { equipmentData } = useSelector((state) => state.equipments);
//   const results = equipmentData?.results || [];

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [previewImages, setPreviewImages] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 6;

//   const handleThumbnailClick = (index, imageUrl) => {
//     setPreviewImages((prev) => ({ ...prev, [index]: imageUrl }));
//   };

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const currentItems = results.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">List of Equipments</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentItems.map((item, index) => {
//           const mainImage = previewImages[index] || item.photos?.[0];

//           return (
//             <div
//               key={index}
//               className="bg-white rounded shadow p-4 border cursor-pointer hover:shadow-md transition"
//               onClick={() => setSelectedItem(item)}
//             >
//               <img
//                 src={mainImage}
//                 alt={item.title}
//                 className="w-full h-48 object-cover rounded mb-3"
//               />
//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-sm text-gray-600 mb-1 capitalize">
//                 {item.equipmentType} ({item.condition})
//               </p>
//               <p className="text-sm text-gray-800 font-medium">{item.brand}</p>
//               <p className="text-sm text-gray-600 mb-1">
//                 {item.yearManufactured} – ₹{item.price.toLocaleString()}
//               </p>
//               <p className="text-xs text-gray-500 mb-2">
//                 📍 {item.location?.address}
//               </p>

//               {/* Badges */}
//               <div className="flex gap-2 mb-2">
//                 {item.isVerified && (
//                   <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
//                     Verified
//                   </span>
//                 )}
//                 {item.isSold && (
//                   <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">
//                     Sold
//                   </span>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {item.photos?.map((photo, i) => (
//                   <img
//                     key={i}
//                     src={photo}
//                     alt={`Thumbnail ${i}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleThumbnailClick(index, photo);
//                     }}
//                     className="w-12 h-12 object-cover rounded cursor-pointer border hover:border-indigo-500"
//                   />
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       <ReactPaginate
//         pageCount={Math.ceil(results.length / itemsPerPage)}
//         pageRangeDisplayed={5}
//         marginPagesDisplayed={2}
//         onPageChange={handlePageChange}
//         containerClassName="flex justify-center mt-6"
//         pageClassName="px-3 py-1 border border-gray-300 rounded-md mx-1"
//         pageLinkClassName="text-gray-700"
//         activeClassName="bg-blue-600 text-white"
//         previousLabel="Previous"
//         nextLabel="Next"
//       />

//       {/* Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 max-w-2xl w-full rounded shadow-lg relative overflow-y-auto max-h-[90vh]">
//             <button
//               className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
//               onClick={() => setSelectedItem(null)}
//             >
//               &times;
//             </button>

//             <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
//             <p className="text-sm text-gray-600 mb-2">
//               {selectedItem.equipmentType} ({selectedItem.condition}) —{" "}
//               {selectedItem.brand}
//             </p>
//             <p className="text-sm text-gray-700 mb-3">{selectedItem.description}</p>

//             <p className="text-sm font-medium mb-1">
//               Year: {selectedItem.yearManufactured} — ₹
//               {selectedItem.price.toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               📍 {selectedItem.location?.address}
//             </p>
//             {/* {item.isVerified && (
//   <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
//     Verified
//   </span>

// )}
//  {item.isSold && (
//   <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">
//     Sold
//   </span>
// )} */}
//             {/* Swiper Carousel */}
//             {/* <Swiper spaceBetween={10} slidesPerView={1}>
//               {selectedItem.photos?.map((photo, i) => (
//                 <SwiperSlide key={i}>
//                   <img
//                     src={photo}
//                     alt={`Modal Photo ${i}`}
//                     className="w-full h-60 object-cover rounded"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper> */}
//             <Swiper
//   spaceBetween={10}
//   slidesPerView={1}
//   pagination={{ clickable: true }}
// >
//   {selectedItem.photos?.map((photo, i) => (
//     <SwiperSlide key={i}>
//       <img
//         src={photo}
//         alt={`Slide ${i}`}
//         className="w-full h-60 object-cover rounded"
//       />
//     </SwiperSlide>
//   ))}
// </Swiper>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

