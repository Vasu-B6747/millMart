
import { useState } from "react";
import { createEquipment } from "../slices/equipmentSlice";
import { useDispatch } from "react-redux";

export default function EquipmentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [yearManufactured, setYearManufactured] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState({
  address: "",
  latitude: null,
  longitude: null,
});

  const [photos, setPhotos] = useState([]);
  const [clientErrors, setClientErrors] = useState({});
  const [success, setSuccess] = useState(false);
const dispatch=useDispatch()
  const validate = () => {
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
    if (!equipmentType) errors.equipmentType = "Type is required.";
    if (!brand) errors.brand = "Brand is required.";
    if (!price || isNaN(price)) errors.price = "Valid price is required.";
    if (!yearManufactured || isNaN(yearManufactured)) errors.yearManufactured = "Valid year is required.";
    if (!location.address || !location.latitude || !location.longitude) {
      errors.location = "Valid address and coordinates are required.";
    }
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getCoordinatesFromAddress = async (address) => {
    const apiKey = "47f74b10b5a946cb886c03b86ec54d2e"; // Your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    console.log("Geocoding URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status.message || "Geocoding failed.");
    }

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error("No results found for address.");
    }
  };

  const handleAddressBlur = async () => {
    if (!location.address) return;
    try {
      const coords = await getCoordinatesFromAddress(location.address);
      setLocation((prev) => ({
        ...prev,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Could not get coordinates for the given address. Please check the address format.");
    }
  };

  const handlePhotoUpload = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Convert latitude and longitude to numbers
  const latitude = parseFloat(location.latitude);
  const longitude = parseFloat(location.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    alert("Invalid latitude or longitude.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("equipmentType", equipmentType);
  formData.append("brand", brand);
  formData.append("model", model);
  formData.append("yearManufactured", yearManufactured);
  formData.append("condition", condition);
  formData.append("price", price);
  formData.append("location", JSON.stringify({
  type: "Point",
  coordinates: [longitude, latitude],
  address: location.address
}));

  photos.forEach((photo) => {
    formData.append("photos", photo);
  });
const resetForm=()=>{
    setTitle('')
    setBrand('')
    setCondition('')
    setDescription('')
    setEquipmentType('')
    setLocation({address:'',latitude:null,longitude:null})
    setModel('')
    setPrice('')
    setPhotos([])
}
  try {
    await dispatch(createEquipment({formData,resetForm})).unwrap(); // Make sure to use unwrap for error handling
    setSuccess(true);
  } catch (err) {
    console.error("Submit error:", err);
    alert("There was an error submitting the form.");
  }
};


  return (
  //   <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-6 ">
  //     <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto">
  //     <h2 className="text-xl font-bold mb-6">Equipment Listing Form</h2>
  //     {success && <p className="text-green-600 mb-4">Equipment submitted successfully!</p>}
  //    <form onSubmit={handleSubmit}>
  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Equipment Title</label>
  //         <input
  //           type="text"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //           placeholder="Enter equipment title"
  //           className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         />
  //         {clientErrors.title && <p className="text-red-500 text-sm">{clientErrors.title}</p>}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Description</label>
  //         <textarea
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //           className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         ></textarea>
  //         {clientErrors.description && <p className="text-red-500 text-sm">{clientErrors.description}</p>}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">EquipmentType</label>
  //         <select value={equipmentType} onChange={e=>setEquipmentType(e.target.value)} className="w-full border px-3 py-2 rounded">
  //           <option value="">Select Type</option>
  //           <option value="polisher">Polisher</option>
  //           <option value="de-husker">De-Husker</option>
  //           <option value="dryer">Dryer</option>
  //           <option value="others">others</option>
  //         </select>
  //         {clientErrors.equipmentType && <p className="text-red-500 text-sm">{clientErrors.equipmentType}</p>}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Brand</label>
  //         <input
  //           type="text"
  //           value={brand}
  //           onChange={(e) => setBrand(e.target.value)}
  //           className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         />
  //         {clientErrors.brand && <p className="text-red-500 text-sm">{clientErrors.brand}</p>}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Model</label>
  //         <input
  //           type="text"
  //           value={model}
  //           onChange={(e) => setModel(e.target.value)}
  //           className="w-full border px-3 py-2 rounded"
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Year Manufactured</label>
  //         <input
  //           type="number"
  //           value={yearManufactured}
  //           onChange={(e) => setYearManufactured(e.target.value)}
  //           className="w-full border px-3 py-2 rounded"
  //         />
  //         {clientErrors.yearManufactured && (
  //           <p className="text-red-500 text-sm">{clientErrors.yearManufactured}</p>
  //         )}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Condition</label>
  //           <div className="flex space-x-6">
  //         <label className="flex items-center text-sm font-semibold text-gray-700"> <input
  //           type="radio"
  //           checked={condition==='used'}
  //           onChange={() => setCondition('used')}
  //           className="mr-2"
  //         />Used</label>
  //         <label className="flex items-center text-sm font-semibold text-gray-700"> <input
  //           type="radio"
  //           checked={condition==='new'}
  //           onChange={() => setCondition('new')}
  //           className="mr-2"
  //         />New</label>
  //         </div>
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Price ($)</label>
  //         <input
  //           type="number"
  //           value={price}
  //           onChange={(e) => setPrice(e.target.value)}
  //           className="w-full border px-3 py-2 rounded"
  //         />
  //         {clientErrors.price && <p className="text-red-500 text-sm">{clientErrors.price}</p>}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Address</label>
  //         <input
  //           type="text"
  //           value={location.address}
  //           onChange={(e) => setLocation({ ...location, address: e.target.value })}
  //           onBlur={handleAddressBlur}
  //           placeholder="Street, City, State"
  //           className="w-full border px-3 py-2 rounded"
  //         />
  //         {clientErrors.location && <p className="text-red-500 text-sm">{clientErrors.location}</p>}
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Latitude</label>
  //         <input
  //           type="number"
  //           value={location.latitude}
  //           onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
  //           placeholder="12.9716"
  //           className="w-full border px-3 py-2 rounded"
  //           readOnly
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-sm font-semibold">Longitude</label>
  //         <input
  //           type="number"
  //           value={location.longitude}
  //           onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
  //           placeholder="77.5946"
  //           className="w-full border px-3 py-2 rounded"
  //           readOnly
  //         />
  //       </div>

  //       <div className="mb-6">
  //         <label className="block text-sm font-semibold">Upload Photos</label>
  //         <input
  //           type="file"
  //           multiple
  //           accept="image/*"
  //           onChange={handlePhotoUpload}
  //           className="w-full mt-1"
  //         />
  //         {photos.length > 0 && (
  //           <p className="text-sm text-gray-600 mt-1">{photos.length} file(s) selected</p>
  //         )}
  //       </div>

  //       <button
  //         type="submit"
  //         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
  //       >
  //         Submit
  //       </button>
  //     </form>
  //     </div>
  //   </div>
  // );
  <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded shadow">
  <h2 className="text-xl font-bold mb-6">Equipment Listing Form</h2>
  {success && <p className="text-green-600 mb-4">Equipment submitted successfully!</p>}

  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Title */}
    <div>
      <label className="block text-sm font-semibold">Equipment Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter equipment title"
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {clientErrors.title && <p className="text-red-500 text-sm">{clientErrors.title}</p>}
    </div>

    {/* Equipment Type */}
    <div>
      <label className="block text-sm font-semibold">Equipment Type</label>
      <select
        value={equipmentType}
        onChange={(e) => setEquipmentType(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select Type</option>
        <option value="polisher">Polisher</option>
        <option value="de-husker">De-Husker</option>
        <option value="dryer">Dryer</option>
        <option value="others">Others</option>
      </select>
      {clientErrors.equipmentType && <p className="text-red-500 text-sm">{clientErrors.equipmentType}</p>}
    </div>

    {/* Brand */}
    <div>
      <label className="block text-sm font-semibold">Brand</label>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {clientErrors.brand && <p className="text-red-500 text-sm">{clientErrors.brand}</p>}
    </div>

    {/* Model */}
    <div>
      <label className="block text-sm font-semibold">Model</label>
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>

    {/* Year Manufactured */}
    <div>
      <label className="block text-sm font-semibold">Year Manufactured</label>
      <input
        type="number"
        value={yearManufactured}
        onChange={(e) => setYearManufactured(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      {clientErrors.yearManufactured && (
        <p className="text-red-500 text-sm">{clientErrors.yearManufactured}</p>
      )}
    </div>

    {/* Condition */}
    <div>
      <label className="block text-sm font-semibold">Condition</label>
      <div className="flex space-x-6 mt-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <input
            type="radio"
            checked={condition === 'used'}
            onChange={() => setCondition('used')}
            className="mr-2"
          />
          Used
        </label>
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <input
            type="radio"
            checked={condition === 'new'}
            onChange={() => setCondition('new')}
            className="mr-2"
          />
          New
        </label>
      </div>
    </div>

    {/* Price */}
    <div>
      <label className="block text-sm font-semibold">Price ($)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      {clientErrors.price && <p className="text-red-500 text-sm">{clientErrors.price}</p>}
    </div>

    {/* Address */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold">Address</label>
      <input
        type="text"
        value={location.address}
        onChange={(e) => setLocation({ ...location, address: e.target.value })}
        onBlur={handleAddressBlur}
        placeholder="Street, City, State"
        className="w-full border px-3 py-2 rounded"
      />
      {clientErrors.location && <p className="text-red-500 text-sm">{clientErrors.location}</p>}
    </div>

    {/* Latitude */}
    <div>
      <label className="block text-sm font-semibold">Latitude</label>
      <input
        type="number"
        value={location.latitude}
        onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
        placeholder="12.9716"
        className="w-full border px-3 py-2 rounded"
        readOnly
      />
    </div>

    {/* Longitude */}
    <div>
      <label className="block text-sm font-semibold">Longitude</label>
      <input
        type="number"
        value={location.longitude}
        onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
        placeholder="77.5946"
        className="w-full border px-3 py-2 rounded"
        readOnly
      />
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {clientErrors.description && <p className="text-red-500 text-sm">{clientErrors.description}</p>}
    </div>

    {/* Upload Photos */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold">Upload Photos</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
        className="w-full mt-1"
      />
      {photos.length > 0 && (
        <p className="text-sm text-gray-600 mt-1">{photos.length} file(s) selected</p>
      )}
    </div>

    {/* Submit Button */}
    <div className="md:col-span-2 text-right">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
      >
        Submit
      </button>
    </div>
  </form>
</div>
  )
}


