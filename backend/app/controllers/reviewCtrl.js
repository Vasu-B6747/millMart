import Review from '../models/reviewModel.js'
import { validationResult } from 'express-validator';
const reviewCtrl={}
//1.create
reviewCtrl.createReview = async (req, res) => {
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
  }
    const { buyer, seller, equipmentId, rating, reviewText } = req.body;
  
    try {
      // Optional: Check if the buyer already reviewed the same equipment
      const existingReview = await Review.findOne({ buyer, equipmentId });
      if (existingReview) {
        return res.status(400).json({ error: 'You have already reviewed this equipment.' });
      }
  
      const newReview = await Review.create({
        buyer,
        seller,
        equipmentId,
        rating,
        reviewText
      });
  
      res.status(201).json(newReview);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to create review' });
    }
  };
  
  // 2. Get All Reviews for a Seller
  reviewCtrl.getSellerReviews = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const sellerId = req.params.id;
  
    try {
      const reviews = await Review.find({ seller: sellerId })
        .populate('buyer', 'name email')
        .populate('equipmentId', 'name');
  
      res.status(200).json(reviews);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch seller reviews' });
    }
  };
  
  // 3. Get All Reviews for a Specific Equipment
  reviewCtrl.getEquipmentReviews = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const equipmentId = req.params.id;
  
    try {
      const reviews = await Review.find({ equipmentId })
        .populate('buyer', 'name email')
        .populate('seller', 'name');
  
      res.status(200).json(reviews);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch equipment reviews' });
    }
  };
  
  // 4. Delete a Review
  reviewCtrl.deleteReview = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const reviewId = req.params.id;
  
    try {
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Check if the user is the buyer or an admin
      if (review.buyer.toString() === req.userId || req.role === 'admin') {
        await review.deleteOne();
        res.status(200).json({ message: 'Review deleted successfully' });
      } else {
        res.status(403).json({ error: 'Unauthorized to delete this review' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  };
  

  // 5. Get All Reviews by a Buyer
reviewCtrl.getBuyerReviews = async (req, res) => {
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
  }
    const buyerId = req.params.id;
  
    try {
      const reviews = await Review.find({ buyer: buyerId })
        .populate('seller', 'name')
        .populate('equipmentId', 'name');
  
      res.status(200).json(reviews);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch buyer reviews' });
    }
  };

  // 6. Update a Review
  reviewCtrl.updateReview = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
    }
    const reviewId = req.params.id;
    const { rating, reviewText } = req.body;
  
    try {
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Only buyer or admin can update
      if (review.buyer.toString() !== req.userId && req.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized to update this review' });
      }
  
      review.rating = rating;
      review.reviewText = reviewText;
  
      const updatedReview = await review.save();
  
      res.status(200).json(updatedReview);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to update review' });
    }
  };
  
  
  
  export default reviewCtrl;