import {Schema,model} from 'mongoose'
const userSchema=new Schema({
    name:String,
    password:String,
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
    email:String,
    profilePic:String,
    address:String,
    isVerify:{type:Boolean,default:false}
  
},{timestamps:true})
const User=model('User',userSchema)
export default User