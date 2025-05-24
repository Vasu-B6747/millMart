import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../configure/baseURL';
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const { id } = useParams(); // equipmentId
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);
  const { equipmentData } = useSelector(state => state.equipments);
  const equipment = equipmentData.find(e => e._id === id);

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/review", {
        buyer: userData._id,
        seller: equipment.seller._id,
        equipmentId: id,
        rating,
        reviewText,
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      alert("Review submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert(error.response?.data?.error || "Failed to submit review");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave a Review</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none"
              >
                <FaStar
                  size={30}
                  className={
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            placeholder="Write your experience here..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
