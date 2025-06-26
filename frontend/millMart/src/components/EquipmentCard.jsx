import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImageOff } from "lucide-react";
import { fetchEquipment,deleteEquipment,verifyEquipments,markSold,approveEquipments } from '../slices/equipmentSlice';

const EquipmentCard = () => {
  const [loadingAction, setLoadingAction] = useState(null);
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
  if (equipment?.photos?.length > 0) {
    setMainPhoto(equipment.photos[0]);
  }
}, [equipment?.photos]);

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
  const onVerify = (id) => {
     setLoadingAction('verify')
  dispatch(verifyEquipments(id))
    .unwrap()
    .then(() => {
      toast.success('Equipment verified successfully!');
      dispatch(fetchEquipment(id))
      navigate('/dashboard/equipments');
    })
    .catch(() => {
      toast.error('Verification failed.');
    })
    .finally(() => setLoadingAction(null));
};

const onMarkSold = (id) => {
  setLoadingAction('sold')
  dispatch(markSold(id))
    .unwrap()
    .then(() => {
      toast.success('Equipment marked as sold!');
      dispatch(fetchEquipment(id))
      navigate('/dashboard/equipments');
    })
    .catch(() => {
      toast.error('Marking as sold failed.');
    })
    .finally(() => setLoadingAction(null));
};

const onApprove = (id) => {
  setLoadingAction('approve')
  dispatch(approveEquipments(id))
    .unwrap()
    .then(() => {
      toast.success('Equipment approved successfully!');
      dispatch(fetchEquipment(id))
      navigate('/dashboard/equipments');
      
    })
    .catch(() => {
      toast.error('Approval failed.');
    })
    .finally(() => setLoadingAction(null));
};

const onDelete = (id) => {
  setLoadingAction('delete')
  dispatch(deleteEquipment(id))
    .unwrap()
    .then(() => {
      if (userData.role === 'admin') {
        toast.success('Equipment deleted successfully!');
        navigate('/dashboard/equipments');
      } else {
        toast.success('Your listing was deleted!');
        navigate('/dashboard/mylist');
      }
    })
    .catch(() => {
      toast.error('Deletion failed.');
    })
    .finally(() => setLoadingAction(null));
};

const onEdit = (id) => {
  navigate(`/dashboard/equipment/${id}`);
};

  const onMessage = (recId,id) =>{
    navigate(`/equipment/chat/${recId}/${id}`)
  }
  const onOrder = (id) => {
    navigate(`/payment/${id}`)
  }

  // Determine role and ownership
  const isAdmin = userData?.role === 'admin';
  const isSeller = userData?._id === seller?._id;
  const isBuyer = userData?.role === 'buyer' && !isSeller;
  const handleBack=()=>{
    if(userData.role=='admin'){
      navigate('/dashboard')
    }else if(userData.role=='seller'){
      navigate('/dashboard/mylist')
    }else{
      navigate('/dashboard')
    }
  }

  return (
    <div className='bg-gray-50 shadow-md m-3 p-3 rounded-[10px]'>
      <div> <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded flex items-center space-x-2 mt-2 ml-2" onClick={handleBack}>
            <span>&larr;</span>
            <span>Back</span>
          </button>
    </div>
    <div className="rounded-md p-4 mb-6 flex flex-col md:flex-row mt-2 ml-5 mr-10">
      
    
  <div className="md:w-1/3 mb-4 md:mb-0 bg-white p-4 rounded border border-gray-200 shadow">
  {/* Main Image */}
  <div className="relative w-full h-96 mb-4">
    {mainPhoto ? (
      <img
        src={mainPhoto}
        alt={title}
        className="rounded-lg w-full h-full object-cover"
      />
    ) : (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg border border-dashed border-gray-300">
        <ImagePlus className="text-gray-400 w-12 h-12" />
        <p className="text-gray-500 text-sm mt-2">No Image</p>
      </div>
    )}
  </div>

  {/* Thumbnails */}
  <div className="flex gap-3 flex-wrap justify-center">
    {photos?.map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt={`Thumbnail ${index + 1}`}
        className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-200 border-gray-400 ${
          photo === mainPhoto ? "border-blue-500 scale-105" : "border-transparent hover:scale-105"
        }`}
        onClick={() => setMainPhoto(photo)}
      />
    ))}
  </div>
</div>

      {/* Info Section */}
      <div className="md:ml-6 flex-1 bg-white shadow-lg rounded-xl p-6">
  {/* Title */}
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

  {/* Details */}
  <div className="space-y-2 text-gray-700 text-sm md:text-base">
    <p><span className="font-medium">Brand:</span> {brand}</p>
    <p><span className="font-medium">Model:</span> {model}</p>
    <p><span className="font-medium">Type:</span> {equipmentType}</p>
    <p><span className="font-medium">Condition:</span> {condition}</p>
    <p><span className="font-medium">Manufactured:</span> {yearManufactured}</p>
    <p><span className="font-medium">Price:</span> <span className="text-green-600 font-semibold">₹{price.toLocaleString()}</span></p>
    <p><span className="font-medium">Location:</span> {location?.address}</p>
    <p><span className="font-medium">Description:</span> {description}</p>
    <p><span className="font-medium">Seller:</span> {seller?.name} <span className="text-gray-500 text-sm">({seller?.email})</span></p>
    <p className="text-sm text-gray-400">Posted on: {new Date(createdAt).toLocaleDateString()}</p>
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex flex-wrap gap-3">
    {isAdmin && (
      <>
        <button
          onClick={() => onDelete(_id)}
          disabled={loadingAction === 'delete'}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            loadingAction === 'delete'
              ? 'bg-red-400 text-white cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {loadingAction === 'delete' ? 'Deleting...' : '🗑 Delete'}
        </button>

        <button
          onClick={() => onVerify(_id)}
          disabled={loadingAction === 'verify' || isVerified}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            isVerified
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {loadingAction === 'verify' ? 'Verifying...' : isVerified ? '✔ Verified' : '✔ Verify'}
        </button>

        <button
          onClick={() => onMarkSold(_id)}
          disabled={loadingAction === 'sold' || isSold}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            isSold
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
        >
          {loadingAction === 'sold' ? 'Marking...' : isSold ? 'SOLD' : '🚚 Mark as Sold'}
        </button>

        <button
          onClick={() => onApprove(_id)}
          disabled={loadingAction === 'approve' || isApproved}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            isApproved
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loadingAction === 'approve' ? 'Approving...' : isApproved ? '✅ Approved' : '✅ Approve'}
        </button>
      </>
    )}

    {isSeller && (
      <>
        <button
          onClick={() => onEdit(_id)}
          className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md transition"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onMarkSold(_id)}
          disabled={loadingAction === 'sold' || isSold}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            isSold
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
        >
          {loadingAction === 'sold' ? 'Marking...' : isSold ? 'SOLD' : '🚚 Mark as Sold'}
        </button>

        <button
          onClick={() => onDelete(_id)}
          disabled={loadingAction === 'delete'}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            loadingAction === 'delete'
              ? 'bg-red-400 text-white cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {loadingAction === 'delete' ? 'Deleting...' : '🗑 Delete'}
        </button>
      </>
    )}

    {isBuyer && (
      <>
        <button
          className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
          onClick={() => onMessage(seller?._id, _id)}
        >
          💬 Message
        </button>
        <button
          className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition"
          onClick={() => onOrder(_id)}
        >
          🛒 Order
        </button>
      </>
    )}
  </div>

  {/* Status Badges */}
  <div className="mt-6 flex flex-wrap gap-3">
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
        isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
      }`}
    >
      {isVerified ? '✔ Verified' : '✖ Not Verified'}
    </span>

    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
        isSold ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'
      }`}
    >
      {isSold ? 'SOLD' : 'Available'}
    </span>

    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
        isApproved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {isApproved ? '✅ Approved' : '⏳ Not Approved'}
    </span>
  </div>
</div>

    </div>
    </div>
  );
};

export default EquipmentCard;

