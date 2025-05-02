import {Schema,model} from 'mongoose'
const equipmentPostSchema = new Schema({
    seller: { type:Schema.Types.ObjectId, ref: 'User'},
    title: String, 
    description:  String ,
    equipmentType: { type: String, enum: ['de-husker', 'dryer', 'polisher', 'other'] },
    brand: String ,
    model: String ,
    yearManufactured: Number,
    condition: { type: String, enum: ['new', 'used']},
    price: Number,
    location: {
        address: { type: String, required: true }, 
        coordinates: {
          type: [Number],
          required: true,
          index: '2dsphere' 
        }
      },
    photos: [String],
    views:Number,
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
  }, { timestamps: true });
  const Equipment=model('Equipment',equipmentPostSchema)
  export default Equipment
  