import {Schema,model} from 'mongoose'
const paymentSchema = new mongoose.Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User'},
    seller: { type: Schema.Types.ObjectId, ref: 'User'},
    equipmentId: { type:Schema.Types.ObjectId, ref: 'Equipment'},
    amount:Number,
    paymentStatus: { type: String, enum: ['pending', 'completed', 'refunded'], default: 'pending' },
    paymentMethod: { type: String, enum: ['razorpay', 'stripe', 'bank_transfer'], default: 'bank_transfer' },
  }, { timestamps: { createdAt: 'transactionDate' } });
  const Payment=model('Payment',paymentSchema)
  export default Payment