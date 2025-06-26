import {Schema,model} from 'mongoose'
const paymentSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User'},
    seller: { type: Schema.Types.ObjectId, ref: 'User'},
    equipmentId: { type:Schema.Types.ObjectId, ref: 'Equipment'},
    amount:Number,
    paymentStatus: { type: String, enum: ['pending', 'completed', 'refunded'], default: 'pending' },
    paymentMethod: { type: String, enum: ['razorpay', 'stripe', 'bank_transfer'], default: 'razorpay' },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String }
  }, { timestamps: true });
  const Payment=model('Payment',paymentSchema)
  export default Payment