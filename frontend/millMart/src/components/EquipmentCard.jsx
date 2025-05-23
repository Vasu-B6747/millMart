import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

  const onMessage = (id) =>{
    navigate(`/equipment/chat/${id}`)
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
    <div>
      <div> <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded flex items-center space-x-2 mt-2 ml-2" onClick={handleBack}>
            <span>&larr;</span>
            <span>Back</span>
          </button>
    </div>
    <div className="bg-white shadow-md rounded-md p-4 mb-6 flex flex-col md:flex-row mt-8 ml-5 mr-10">
      
    
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
              <button
                  onClick={() => onDelete(_id)}
                  disabled={loadingAction === 'delete' }
                  className={`bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded ${
                    loadingAction === 'delete' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingAction === 'delete' ? 'Deleting...' : '🗑 Delete'}
              </button>
              <button
                onClick={() => onVerify(_id)}
                disabled={loadingAction === 'verify' || isVerified} className={`px-4 py-1 rounded text-white ${
                isVerified ? 'bg-gray-400 cursor-not-allowed' :
                loadingAction === 'verify' ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'
                }`}>
                      {loadingAction === 'verify' ? 'Verifing...' :isVerified?'Verified': '✔ Verify'}
              </button>
             



              {/* <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded" onClick={() => onVerify(_id)}>✔ Verify</button> */}
             <button onClick={() => onMarkSold(_id)} disabled={loadingAction === 'sold' || isSold} className={`px-4 py-1 rounded text-white ${
                isSold ? 'bg-gray-400 cursor-not-allowed' :
                  loadingAction === 'sold' ? 'bg-yellow-300' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}>
              {loadingAction === 'sold' ? 'Marking...' : isSold ? 'SOLD' : '🚚 Mark as Sold'}
            </button>

              {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded" onClick={() => onApprove(_id)}>✅ Approve</button> */}
              <button
                  onClick={() => onApprove(_id)}
                  disabled={loadingAction === 'approve' || isApproved} className={`px-4 py-1 rounded text-white ${
                isApproved ? 'bg-gray-400 cursor-not-allowed' :
                  loadingAction === 'approve' ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                >
                  {/* {loadingAction === 'approve' ? 'Approving...' : '✅ Approve'} */}
                   {loadingAction === 'approve' ? 'Approving...' :isApproved ?'✅ Approved': '✅ Approve'}
              </button>

            </>
          )}

          {isSeller && (
            <>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded" onClick={() => onEdit(_id)}>✏️ Edit</button>
              {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isSold} onClick={() => onMarkSold(_id)}>{isSold ? 'SOLD' : '🚚 Mark as Sold'}</button> */}
              <button onClick={() => onMarkSold(_id)} disabled={loadingAction === 'sold' || isSold} className={`px-4 py-1 rounded text-white ${
                isSold ? 'bg-gray-400 cursor-not-allowed' :
                  loadingAction === 'sold' ? 'bg-yellow-300' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}>
              {loadingAction === 'sold' ? 'Marking...' : isSold ? 'SOLD' : '🚚 Mark as Sold'}
            </button>
              {/* <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded" onClick={() => onDelete(_id)}>🗑 Delete</button> */}
              <button
                  onClick={() => onDelete(_id)}
                  disabled={loadingAction === 'delete'}
                  className={`bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded ${
                    loadingAction === 'delete' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingAction === 'delete' ? 'Deleting...' : '🗑 Delete'}
              </button>
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
    </div>
  );
};

export default EquipmentCard;

