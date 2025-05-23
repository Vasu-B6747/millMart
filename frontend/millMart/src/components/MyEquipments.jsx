import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {useState,useEffect} from 'react'
import { getsellerEquipment } from "../slices/equipmentSlice"
export default function MyEquipments(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    // const [myEquipments,setMyEquipments]=useState([])
    
    const {userData}=useSelector((state)=>{
        return state.user
    })
    useEffect(()=>{
        dispatch(getsellerEquipment(userData._id))
    },[dispatch,userData])
    const {userEquipments}=useSelector((state)=>{
        return state.equipments
    })
    console.log(userEquipments)
    return(
      <div className="p-6">
         
      
      <div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-semibold text-indigo-700">
    List of MyEquipments
  </h2>
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>navigate('/mylist/equipment')}>
    Add Equipment
  </button>
</div>

      
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
             {/* {userData.role=='seller' &&<th className="border px-4 py-2 text-left">Actions</th>} */}
             <th className="border px-4 py-2 text-left">Info</th>
            </tr>
          </thead>
          <tbody>
            {userEquipments?.map((ele) => (
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
               {/* {userData.role=='seller'&& <td className="border px-4 py-2 space-x-1">
                  <button
                    onClick={() => handleEdit(ele._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleMarkSold(ele._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                  >
                    🚚 Sold
                  </button>
                  <button
                    onClick={() => handleDelete(ele._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>} */}
                <td className="border px-4 py-2"> <button
                    onClick={() => navigate(`/equipments/equipmentcard/${ele._id}`)}
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