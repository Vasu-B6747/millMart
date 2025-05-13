import { useSelector,useDispatch } from "react-redux"
import { removeUser } from "../slices/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Profile(){
    const {userData}=useSelector((state)=>{
        return state.user
    })
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(() => {
    if (!userData) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [userData, navigate]);
    
   const handleDelete = async (id) => {
    try {
      await dispatch(removeUser(id));
      // Don't navigate here anymore — useEffect will handle it
    } catch (err) {
      console.error("Delete failed", err);
    }
  };


    if(!userData)return false
    return(
    <div  className="flex justify-center items-center mt-8 bg-white rounded-lg shadow-md max-w-xl mx-auto" >
      <div>
      <h2 className="text-xl font-bold mb-2 mt-4">Account Information</h2>
      <img src={userData.profilePic} alt="Profile" className="mt-4 rounded-full w-24 h-24" />
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
      <p><strong>Address:</strong> {userData.address}</p>
      <div className="flex mt-8 mb-8">

      <button className="mr-10 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleDelete(userData._id)}}
      
      >Delete</button>
      <button className="mr-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Edit</button>
      </div>
      
      </div>
    </div>
    )
}