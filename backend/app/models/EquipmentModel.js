import {Schema,model} from 'mongoose'
const equipmentPostSchema = new Schema({
    seller: { type:Schema.Types.ObjectId, ref: 'User'},
    title: String, 
    description:  String ,
    equipmentType:String,               //{ type: String, enum: ['de-husker', 'dryer', 'polisher', 'other'] },
    brand: String ,
    model: String ,
    yearManufactured: Number,
    condition: String,  //{ type: String, enum: ['new', 'used']},
    price: Number,
    location: {
      type: {
        type: String,
        enum: ['Point'],              
        default: 'Point'
      },
      coordinates:[Number], // [longitude, latitude]
      address:String, 
    },
    photos: [String],
    views:Number,
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
  }, { timestamps: true });
  equipmentPostSchema.index({ location: '2dsphere' });
  const Equipment=model('Equipment',equipmentPostSchema)
  export default Equipment
    /* location: {
  address: { type: String, required: true },
  coordinates: {
    type: [Number],
    required: true,
    index: '2dsphere'
  }
}
 */
// "location": {
//   "type": "Point",
//   "coordinates": [77.5946, 12.9716],
//   "address": "Bengaluru, Karnataka"
// }
