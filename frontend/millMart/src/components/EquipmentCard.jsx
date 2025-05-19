import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEquipment } from '../slices/equipmentSlice';

const EquipmentCard = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { id } = useParams();

  const { equipment } = useSelector((state) => state.equipments);
  const { userData } = useSelector((state) => state.user);

  const [mainPhoto, setMainPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchEquipment(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!mainPhoto && equipment?.photos?.length > 0) {
      setMainPhoto(equipment.photos[0]);
    }
  }, [equipment, mainPhoto]);

  if (!equipment || !equipment.photos || equipment.photos.length === 0 || !mainPhoto) {
    return <div>Loading...</div>;
  }

  const {
    title,
    brand,
    model,
    equipmentType,
    condition,
    yearManufactured,
    price,
    location,
    description,
    seller,
    photos,
    isVerified,
    isSold,
    isApproved,
    createdAt,
    _id,
  } = equipment;

  // Placeholder handlers – replace with actual logic
  const onVerify = (id) => console.log('Verify:', id);
  const onMarkSold = (id) => console.log('Mark as Sold:', id);
  const onApprove = (id) => console.log('Approve:', id);
  const onDelete = (id) => console.log('Delete:', id);
  const onEdit = (id) =>{
    navigate(`/dashboard/equipment/${id}`)
  }
  const onMessage = (id) => console.log('Message Seller:', id);
  const onOrder = (id) => console.log('Order Equipment:', id);

  // Determine role and ownership
  const isAdmin = userData?.role === 'admin';
  const isSeller = userData?._id === seller?._id;
  const isBuyer = userData?.role === 'buyer' && !isSeller;

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-6 flex flex-col md:flex-row mt-8 ml-5 mr-10">
      {/* Image Section */}
      <div className="md:w-1/3 mb-4 md:mb-0">
        <img
          src={mainPhoto}
          alt={title}
          className="rounded-md w-full h-64 object-cover mb-2"
        />
        <div className="flex gap-2 flex-wrap">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                photo === mainPhoto ? 'border-indigo-500' : 'border-transparent'
              }`}
              onClick={() => setMainPhoto(photo)}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="md:ml-6 flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600"><strong>Brand:</strong> {brand}</p>
        <p className="text-gray-600"><strong>Model:</strong> {model}</p>
        <p className="text-gray-600"><strong>Type:</strong> {equipmentType}</p>
        <p className="text-gray-600"><strong>Condition:</strong> {condition}</p>
        <p className="text-gray-600"><strong>Manufactured:</strong> {yearManufactured}</p>
        <p className="text-gray-600"><strong>Price:</strong> ₹{price.toLocaleString()}</p>
        <p className="text-gray-600"><strong>Location:</strong> {location?.address}</p>
        <p className="text-gray-600"><strong>Description:</strong> {description}</p>
        <p className="text-gray-600"><strong>Seller:</strong> {seller?.name} ({seller?.email})</p>
        <p className="text-sm text-gray-400">Created on: {new Date(createdAt).toLocaleDateString()}</p>

        {/* Role-Based Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          {isAdmin && (
            <>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded" onClick={() => onDelete(_id)}>🗑 Delete</button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded" onClick={() => onVerify(_id)}>✔ Verify</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded" onClick={() => onMarkSold(_id)}>🚚 Mark as Sold</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded" onClick={() => onApprove(_id)}>✅ Approve</button>
            </>
          )}

          {isSeller && (
            <>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded" onClick={() => onEdit(_id)}>✏️ Edit</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded" onClick={() => onMarkSold(_id)}>🚚 Mark as Sold</button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded" onClick={() => onDelete(_id)}>🗑 Delete</button>
            </>
          )}

          {isBuyer && (
            <>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded" onClick={() => onMessage(seller?._id)}>💬 Message</button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded" onClick={() => onOrder(_id)}>🛒 Order</button>
            </>
          )}
        </div>

        {/* Status Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded text-sm ${isVerified ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
            {isVerified ? 'Verified' : 'Not Verified'}
          </span>
          <span className={`px-2 py-1 rounded text-sm ${isSold ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'}`}>
            {isSold ? 'Sold' : 'Not Sold'}
          </span>
          <span className={`px-2 py-1 rounded text-sm ${isApproved ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
            {isApproved ? 'Approved' : 'Not Approved'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;

