import { useNavigate } from "react-router-dom";

const Equip = ({ equipment }) => {
  const {
    _id,
    name,
    brand,
    model,
    equipmentType,
    condition,
    price,
    photos = [],
    location,
    isVerified,
    isSold,
    isApproved,
  } = equipment;

  const mainPhoto = photos[0];
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/equipmentcard/${_id}`)}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
    >
      <img
        src={mainPhoto}
        alt={name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Brand:</strong> {brand} | <strong>Model:</strong> {model}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Type:</strong> {equipmentType}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Condition:</strong> {condition}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Price:</strong> ₹{price.toLocaleString()}
        </p>

        <div className="flex gap-2 flex-wrap">
          <span className={`px-2 py-1 rounded text-xs ${isVerified ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
            {isVerified ? 'Verified' : 'Not Verified'}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${isSold ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'}`}>
            {isSold ? 'Sold' : 'Available'}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${isApproved ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
            {isApproved ? 'Approved' : 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
};



export default Equip;

