
import { useSelector } from "react-redux";
import { useState } from "react";
import Equip from "./DisplayEquip";
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '₹10,000 - ₹50,000', min: 10000, max: 50000 },
  { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
  { label: '₹100,000 - ₹200,000', min: 100000, max: 200000 },
  { label: '₹200,000 - ₹500,000', min: 200000, max: 500000 },
  { label: '₹500,000 - ₹1,000,000', min: 500000, max: 1000000 },
];
export default function Home() {
  const { equipmentData } = useSelector((state) => state.equipments);
  const results = equipmentData || [];
  const [selectedItem, setSelectedItem] = useState(null);
    const [previewImages, setPreviewImages] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [location,setLocation]=useState('')
    const [selectedRange, setSelectedRange] = useState(priceRanges[0]); 
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  const handleRangeChange = (e) => {
    const range = priceRanges.find((r) => r.label === e.target.value);
    setSelectedRange(range);
    setCurrentPage(0);
  };
   const filteredItems = results
  .filter((item) => {
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



  return (
    <div className="flex flex-col h-screen">
      {/* Top bar/header */}
      <div className="bg-blue-700 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
       
        <input className="w-full sm:w-80 px-4 py-2 rounded shadow text-black mb-2 sm:mb-0" type="text" value={location} onChange={e=>setLocation(e.target.value)} placeholder='Location'/>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name, type, or condition..."
          className="w-full sm:w-80 px-4 py-2 rounded shadow text-black mb-2 sm:mb-0"
        />
        <select
          value={selectedRange.label}
          onChange={handleRangeChange}
          className="px-4 py-2 border rounded shadow text-black mb-2 sm:mb-0"
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mt-3">
   {filteredItems?.map((equipment) => (
    <Equip key={equipment._id} equipment={equipment} />
  ))}
</div>
    </div>
  );
}



