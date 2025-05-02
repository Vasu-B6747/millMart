import mongoose from "mongoose";
const configureDB=async()=>{
    try{
        const db=mongoose.connect(process.env.DB_URL)  //'mongodb://localhost:27017/millMart'
        console.log('connected to Db')
    }catch(err){
        console.log('Error while connecting to Db',err)
    }
}
export default configureDB