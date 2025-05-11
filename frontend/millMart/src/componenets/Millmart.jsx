import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import MainContent from "./Maincontent"
import Login from "./Login"
import Register from "./Register"
import { useSelector } from "react-redux"
export default function Millmart(){
    const {isLoggedIn}=useSelector((state)=>{
        return state.user
    })
    return(
     
     <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <MainContent />
      </div>
     </div>
   
     
    )
}