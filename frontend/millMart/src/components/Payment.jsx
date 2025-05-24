import  { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import axios from '../configure/baseURL'

const RazorpayCheckout = () => {
     const [mobileNumber, setMobileNumber] = useState("");
     const navigate=useNavigate()
    const {id}=useParams()
    const {userData}=useSelector((state)=>{
        return state.user
    })
    const {equipmentData}=useSelector((state)=>{
        return state.equipments
    })
    const equipmentObj=equipmentData.find((ele)=>ele._id==id)
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Error loading Razorpay script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup when component unmounts
    };
  }, []);

  const handlePayment = async () => {
     if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      return alert("Please enter a valid 10-digit mobile number");
    }
    try {
      const orderResponse = await axios.post(
        "payment/razor",
        {
          amount: equipmentObj.price,
          buyer: userData._id,
          seller: equipmentObj.seller._id,
          equipmentId: id,
        },{headers:{Authorization:localStorage.getItem('token')}}  //{headers:{Authorization:localStorage.getItem('token')}}
      );

      const { orderId, razorpayKey, payment } = orderResponse.data;

      if (!orderId || !razorpayKey || !payment) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: equipmentObj.price * 100,
        currency: "INR",
        name: "MillMart",
        description: "Equipment rental payment",
        order_id: orderId,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            "payments/verify-razorpay",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: payment._id,
            },{headers:{Authorization:localStorage.getItem('token')}}
          );

          const verifyResult = verifyResponse.data;
          if (verifyResponse.status === 200) {
            alert("Payment successful and verified!");
            navigate(`/review/${id}`)
            console.log(verifyResult);
          } else {
            alert("Payment verification failed");
            console.error(verifyResult);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: mobileNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay script not loaded correctly.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    }
  };

  return (
    // 
    <div className="p-4 max-w-lg mx-auto h-[500px] bg-white shadow rounded mt-9">
    
        <div>
      <h2 className="text-xl font-semibold mb-4">
        Pay ₹{equipmentObj.price.toLocaleString()} with Razorpay
      </h2>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Mobile Number</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
        />
      </div>
      <div>
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
      
      </div>
      <div className="mt-3">
      <button
        onClick={()=>navigate('/dashboard')}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Cancel Pay
      </button>
      
      </div>
      <div className='h-60 w-60 mb-10'>
        <img className='h-60 w-60' src='/src/assets/download (4).png' alt='millPayment' />
      </div>
    </div>
    
  

  );
};

export default RazorpayCheckout;