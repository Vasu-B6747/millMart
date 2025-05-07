import Payment from '../models/paymentModel.js';
import razorpay from '../Utils/razorpay.js'
import crypto from 'crypto';
import { validationResult } from 'express-validator';

const paymentCtrl = {};

// 1. Create a Payment
paymentCtrl.createPayment = async (req, res) => {
const errors=validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({error:errors.array()})
}
  try {
    const { buyer, seller, equipmentId, amount, paymentMethod } = req.body;

   

    const payment = await Payment.create({
      buyer,
      seller,
      equipmentId,
      amount,
      paymentMethod,
      paymentStatus: 'pending'
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// 2. Mark Payment as Completed
paymentCtrl.completePayment = async (req, res) => {
  const errors=validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({error:errors.array()})
}
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment){
        return res.status(404).json({ error: 'Payment not found' });
    }
    if (payment.seller.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to complete this payment' });
    }
    payment.paymentStatus = 'completed';
    await payment.save();

    res.status(200).json({ message: 'Payment marked as completed', payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to complete payment' });
  }
};

// 3. Refund Payment
paymentCtrl.refundPayment = async (req, res) => {
  const errors=validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({error:errors.array()})
}
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment){
        return res.status(404).json({ error: 'Payment not found' });
    }
    if (payment.paymentStatus !== 'completed') {
      return res.status(400).json({ error: 'Only completed payments can be refunded' });
    }
    if (payment.seller.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to refund this payment' });
    }
    
    payment.paymentStatus = 'refunded';
    await payment.save();

    res.status(200).json({ message: 'Payment refunded', payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to refund payment' });
  }
};

// 4. Get All Payments (Admin)
paymentCtrl.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .populate('equipmentId', 'name');

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

// 5. Get Payment by ID
paymentCtrl.getPaymentById = async (req, res) => {
  const errors=validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({error:errors.array()})
}
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .populate('equipmentId', 'name');

    if (!payment){
        return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
};

// 6. Get Payments of users
paymentCtrl.getUserPayments = async (req, res) => {
  try {
    let payments = [];

    if (req.role === 'buyer') {
      payments = await Payment.find({ buyer: req.userId })
        .populate('seller', 'name')
        .populate('equipmentId', 'name');
    } else if (req.role === 'seller') {
      payments = await Payment.find({ seller: req.userId })
        .populate('buyer', 'name')
        .populate('equipmentId', 'name');
    } else if (req.role === 'admin') {
      payments = await Payment.find()
        .populate('buyer', 'name')
        .populate('seller', 'name')
        .populate('equipmentId', 'name');
    } else {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};


// 8. Delete a Payment (Admin)
paymentCtrl.deletePayment = async (req, res) => {
  const errors=validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({error:errors.array()})
}
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment){
        return res.status(404).json({ error: 'Payment not found' });
    }
    await payment.deleteOne();
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
};



paymentCtrl.createRazorpayOrder = async (req, res) => {
  const { amount, currency = 'INR', buyer, seller, equipmentId } = req.body;

  if (!amount || !buyer || !seller || !equipmentId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const options = {
      amount: amount * 100, // Razorpay takes amount in paisa
      currency,
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // Optionally save order details in DB
    const payment = await Payment.create({
      buyer,
      seller,
      equipmentId,
      amount,
      paymentMethod: 'razorpay',
      paymentStatus: 'pending'
    });

    res.status(201).json({
      orderId: order.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      payment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};



paymentCtrl.verifyRazorpayPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;
  
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !paymentId) {
      return res.status(400).json({ error: 'Missing required fields for verification' });
    }
  
    try {
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');
  
      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: 'Invalid signature' });
      }
  
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return res.status(404).json({ error: 'Payment record not found' });
      }
  
      payment.paymentStatus = 'completed';
      payment.razorpay_order_id = razorpay_order_id;
      payment.razorpay_payment_id = razorpay_payment_id;
      payment.razorpay_signature = razorpay_signature;
  
      await payment.save();
  
      res.status(200).json({ message: 'Payment verified and recorded successfully', payment });
    } catch (err) {
      console.error('Verification error:', err);
      res.status(500).json({ error: 'Payment verification failed' });
    }
  };
  


export default paymentCtrl;
