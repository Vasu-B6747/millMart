import {Schema,model} from 'mongoose'
const reviewSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User'},
    seller: { type: Schema.Types.ObjectId, ref: 'User'},
    equipmentId: { type: Schema.Types.ObjectId, ref: 'Equipment' },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText:  String ,
  }, { timestamps: true });
  const Review=model('Review',reviewSchema)
  export default Review