import {Schema,model} from 'mongoose'
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User'},
    receiver: { type: Schema.Types.ObjectId, ref: 'User'},
    equipmentId: { type:Schema.Types.ObjectId, ref: 'Equipment' },
    content: String,
    isRead:{type:Boolean,default:false},
  }, { timestamps: true});
  const Message=model('Message',messageSchema)
  export default Message
  