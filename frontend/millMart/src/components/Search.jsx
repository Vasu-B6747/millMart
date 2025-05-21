import React, { useState, useEffect } from 'react';
import axios from '../configure/baseURL'

const EquipmentSearch = () => {
  const [filters, setFilters] = useState({
    type: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 10
  });

  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get('equipments/search', { params: filters });
      console.log(data)
      setResults(data.results); // assuming paginateQuery returns a mongoose-paginate-v2 structure
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchData();
  };

  const changePage = (delta) => {
    setFilters((prev) => ({
      ...prev,
      page: Math.max(1, prev.page + delta)
    }));
  };

  return (
    <div>
      <h2>Search Equipment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="type" placeholder="Type" value={filters.type} onChange={handleChange} />
        <input type="text" name="condition" placeholder="Condition" value={filters.condition} onChange={handleChange} />
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Results</h3>
        {Array.isArray(results) && results.length > 0 ? (
  <ul>
    {results.map((item) => (
      <li key={item._id}>
        {item.title} - {item.equipmentType} - ${item.price}
      </li>
    ))}
  </ul>
) : (
  <p>No equipment found.</p>
)}

      </div>

      <div>
        <button onClick={() => changePage(-1)} disabled={filters.page <= 1}>
          Previous
        </button>
        <span> Page {filters.page} of {totalPages} </span>
        <button onClick={() => changePage(1)} disabled={filters.page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EquipmentSearch;
