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
      <div className="flex flex-col flex-1 ">
        <Topbar />
        <MainContent />
      </div>
     </div>
    //  <div>
    //     {/* Top Navbar */}
    //     <div className="w-full">
    //       <Topbar />
    //     </div>
  
    //     {/* Main Layout */}
    //     <div className="flex">
    //       {/* Sidebar */}
          
    //         <div className="fixed top-[4rem] left-0 w-60 h-full border-r bg-white shadow-md z-10">
    //           {/* Adjust top-[4rem] based on your Menubar height */}
    //           <Sidebar />
    //         </div>
          
  
    //       {/* Main Content Area */}
    //       <div
    //         className={`flex-1 min-h-screen p-6 transition-all ${
    //           isLoggedIn ? "ml-60" : ""
    //         }`}
    //       >
    //         <MainContent />
    //       </div>
    //     </div>
    //   </div>
  
   
     
    )
}