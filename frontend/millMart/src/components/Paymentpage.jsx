
import { useEffect,useMemo } from "react"
import { fetchAllpayments,userPayments } from "../slices/paymentSlice"
import { useSelector, useDispatch } from 'react-redux'

export default function Paymentpage() {
  const dispatch=useDispatch()
  const{userData}=useSelector((state)=>{
    return state.user
  })
  useEffect(()=>{
    if(userData.role=='admin'){
        dispatch(fetchAllpayments())
    }else{
        dispatch(userPayments())
    }

  },[userData,dispatch])
  const { payments } = useSelector((state) => state.payments || { payments: [] })

//   const totalAmount = payments?.reduce((acc, cv) => acc + cv.amount, 0)
const totalAmount = useMemo(() => {
    return payments?.reduce((acc, cv) => acc + cv.amount, 0)
  }, [payments])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Revenue Summary */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-indigo-600">₹{totalAmount}</p>
        </div>

        {/* Payments Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-gray-600 font-medium">Order ID</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Amount (₹)</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Payment ID</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Created At</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((ele, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{ele.razorpay_order_id}</td>
                  <td className="px-6 py-4">{ele.amount}</td>
                  <td className="px-6 py-4">{ele.razorpay_payment_id}</td>
                  <td className="px-6 py-4">{ele.createdAt?.slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ele.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                      ele.paymentStatus === 'pending' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ele.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
