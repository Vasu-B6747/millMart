
import  { useState} from 'react';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from '../configure/baseURL';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Routing } from './Routingmap';
// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const NearbyEquipmentSearch = () => {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState(null); // map center

  const geocodeAddress = async (address) => {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1,
      },
    });

    if (response.data.length === 0) {
      throw new Error('No results found for that address');
    }

    const { lat, lon } = response.data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  };

  const fetchNearbyEquipment = async (lat, lng) => {
    // const radius = 50; // default 10 km
    const { data } = await axios.get('/equipment/nearby/address', {
      params: { lat, lng },
    });
    setResults(data);
  };

  const handleSearchByAddress = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    try {
      const coords = await geocodeAddress(address);
      setCenter([coords.lat, coords.lng]);
      await fetchNearbyEquipment(coords.lat, coords.lng);
      setAddress('')
    } catch (err) {
      console.error(err);
      setError('Failed to find nearby equipment. Please check your address.');
    }
  };
  
  

  const handleNearMe = () => {
    setError(null);
    setResults([]);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
        await fetchNearbyEquipment(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setError('Failed to get your location. Please allow location access.');
      }
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Nearby Equipment</h2>

<form onSubmit={handleSearchByAddress} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
  <input
    type="text"
    placeholder="Enter Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    required
    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <div className="flex gap-2">
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Search by Address
    </button>
    <button
      type="button"
      onClick={handleNearMe}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
    >
      Near Me
    </button>
  </div>
</form>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
  <h3 className="text-xl font-semibold mb-4">Results</h3>
  {Array.isArray(results) && results.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
          <p className="text-gray-700"><span className="font-medium">Type:</span> {item.equipmentType}</p>
          <p className="text-gray-700"><span className="font-medium">Price:</span> ${item.price}</p>
          <p className="text-gray-700"><span className="font-medium">Address:</span> {item.location?.address || 'N/A'}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No equipment found.</p>
  )}
</div>



      {center && (
  <MapContainer
    center={center}
    zoom={13}
    style={{ height: '500px', width: '100%', marginTop: '20px' }}
    id="map"
  >
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* User location marker */}
    <Marker position={center}>
      <Popup>Your location</Popup>
    </Marker>

    {/* Equipment markers with routes */}
    {results.map((item) => {
      const lat = parseFloat(item.location?.coordinates[1]);
      const lng = parseFloat(item.location?.coordinates[0]);
      if (isNaN(lat) || isNaN(lng)) return null;

      const destination = [lat, lng];

      return (
        <Marker key={item._id} position={destination}>
          <Popup>
            <strong>{item.title}</strong><br />
            Type: {item.equipmentType}<br />
            Price: ${item.price}<br />
            Address: {item.location?.address || 'N/A'}
          </Popup>
          <Routing from={center} to={destination} />
        </Marker>
      );
    })}
  </MapContainer>
)}

    </div>
  );
};

export default NearbyEquipmentSearch;

