// // import { useSelector,useDispatch } from "react-redux"
// // export default function Home(){
// //     const {equipmentData}=useSelector((state)=>{
// //         return state.equipments
// //     })

// //     return(
// //        <div className="flex flex-col h-screen">
// //         <div className="h-[7%] bg-gray-200 mb-1 mt-1">5%
            
// //         </div>
// //         <div className="h-[95%] bg-gray-200">
// //             {equipmentData&&equipmentData.map((ele)=>)}
// //         </div>
// //         {/* <div className="h-[65%] bg-blue-200">15%</div> */}
// //     </div>
// //     )
// // }
import { useSelector } from "react-redux";
import Equip from "./DisplayEquip";

export default function Home() {
  const { equipmentData } = useSelector((state) => state.equipments);

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar/header */}
      <div className="h-[7%] bg-gray-200 mb-1 mt-1 flex items-center justify-center font-semibold text-lg">
        <form>
          <input className="border px-2 py-1 rounded-md" type="text" placeholder="Search..."/>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mt-3">
   {equipmentData?.map((equipment) => (
    <Equip key={equipment._id} equipment={equipment} />
  ))}
</div>
    </div>
  );
}
