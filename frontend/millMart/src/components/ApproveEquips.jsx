import { useSelector,useDispatch } from "react-redux";
export default function ApproveEquips(){
    const {equipmentData}=useSelector((state)=>{
        return state
    })
    const approvedEquiments=equipmentData.results.filter((ele)=>ele.isApproved==true)
    const requestedEquipments=equipmentData.results.filter((ele)=>ele.isApproved==false)
    console.log(approvedEquiments)
     console.log(requestedEquipments)
     return(
        <div>
            <h2>Approve/verify components</h2>
        </div>
     )

}