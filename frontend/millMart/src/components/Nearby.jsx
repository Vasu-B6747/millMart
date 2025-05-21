// import React, { useState } from 'react';
// import axios from '../configure/baseURL'; // adjust based on your setup

// const NearbyEquipmentSearch = () => {
//   const [coordinates, setCoordinates] = useState({
//     lng: '',
//     lat: '',
//     distance: ''
//   });

//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setCoordinates({
//       ...coordinates,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const { data } = await axios.get('/equipment/nearby', {
//         params: coordinates
//       });
//       setResults(data);
//     } catch (err) {
//       console.error('Error fetching nearby equipment:', err);
//       setError('Could not fetch nearby equipment.');
//     }
//   };

//   return (
//     <div>
//       <h2>Find Nearby Equipment</h2>
//       <form onSubmit={handleSearch}>
//         <input
//           type="number"
//           name="lng"
//           placeholder="Longitude"
//           value={coordinates.lng}
//           onChange={handleChange}
//           step="any"
//           required
//         />
//         <input
//           type="number"
//           name="lat"
//           placeholder="Latitude"
//           value={coordinates.lat}
//           onChange={handleChange}
//           step="any"
//           required
//         />
//         <input
//           type="number"
//           name="distance"
//           placeholder="Distance (meters)"
//           value={coordinates.distance}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Search</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div>
//         <h3>Results</h3>
//         {Array.isArray(results) && results.length > 0 ? (
//           <ul>
//             {results.map((item) => (
//               <li key={item._id}>
//                 {item.name} - {item.equipmentType} - ${item.price}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No equipment found nearby.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NearbyEquipmentSearch;
import React, { useState } from 'react';
import axios from '../configure/baseURL'; // your API base

const NearbyEquipmentSearch = () => {
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const geocodeAddress = async (address) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: address,
          format: 'json',
          limit: 1
        }
      }
    );

    if (response.data.length === 0) {
      throw new Error('No results found for that address');
    }

    const { lat, lon } = response.data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const coords = await geocodeAddress(address);
        console.log(coords)
      const { data } = await axios.get('/equipment/nearby/address', {
        params: {
          lat: coords.lat,
          lng: coords.lng,
          distance
        }
      });
      console.log(data)
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('Failed to find nearby equipment. Please check your address.');
    }
  };

  return (
    <div>
      <h2>Find Nearby Equipment by Address</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Results</h3>
        {Array.isArray(results) && results.length > 0 ? (
          <ul>
            {results.map((item) => (
              <li key={item._id}>
                {item.title} - {item.equipmentType} - ${item.price} - {item.location.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No equipment found.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyEquipmentSearch;
