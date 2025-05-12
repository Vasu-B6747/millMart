import { useSelector,useDispatch } from "react-redux"
export default function Profile(){
    const {userData}=useSelector((state)=>{
        return state.user
    })
    if(!userData)return false
    return(
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Account Information</h2>
      <img src={userData.profilePic} alt="Profile" className="mt-4 rounded-full w-24 h-24" />
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
      <p><strong>Address:</strong> {userData.address}</p>
      
      
    </div>
    )
}