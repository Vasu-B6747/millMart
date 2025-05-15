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
      window.confirm('Are you sure to delete delete Account')
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
      {/* <p>
  <strong>Verified:</strong>{" "}
  {userData.isVerify ? (
    <span className="text-green-600 font-bold">✅ Verified</span>
  ) : (
    <span className="text-red-600 font-bold">❌ Not Verified</span>
  )}
</p> */}
<p className="flex items-center gap-2">
  <strong>Verified:</strong>
  {userData.isVerify ? (
    <span className="flex items-center text-green-600 font-semibold" title="User is verified">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Verified
    </span>
  ) : (
    <span className="flex items-center text-red-600 font-semibold" title="User is not verified">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      Not Verified
    </span>
  )}
</p>


      <div className="flex mt-8 mb-8">

      <button className="mr-10 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleDelete(userData._id)}}
      
      >Delete</button>
      <button className="mr-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate(`/dashboard/userUpdate/${userData._id}`)}>Edit</button>
      </div>
      
      </div>
    </div>
    )
}