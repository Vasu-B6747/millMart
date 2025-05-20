import Message from "../models/messageModel.js";
import { validationResult } from "express-validator";
const messageCtrl={}

//1.create
messageCtrl.sendMessage=async(req,res)=>{
     const errors=validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({error:errors.array()})
        }
    // const {sender,receiver,equipmentId,content}=req.body
    const body=req.body
    try{
        const message=await Message.create(body)
         const io = req.app.get('io')
        //  io.to(message.receiver.toString()).emit('newMessage', message)
        req.io.to(req.body.receiver).emit('newMessage', message)
        res.status(201).json(message)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
//2.get all message for a user
messageCtrl.getMessages=async(req,res)=>{
     const errors=validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({error:errors.array()})
        }
    const userId=req.userId
    try{
        const message=await Message.find({$or:[{sender:userId},{receiver:userId}]}).populate('sender receiver equipmentId');
        if(!message){
            return res.status(404).json({error:'Data not found'})
        }
    //     const messages = await Message.find({
    //   $or: [{ sender: userId }, { receiver: userId }],
    // }).populate('sender receiver equipmentId');
    res.status(200).json(message)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//3.getbyid
messageCtrl.getmessagebyId=async(req,res)=>{
     const errors=validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({error:errors.array()})
        }
    const id=req.params.id
    try{
        const message=await Message.findById(id).populate('sender receiver equipmentId');
        if(!message){
            return res.status(404).json({error:'Data not found'})
        }
        res.json(message)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
//4.read
messageCtrl.markAsRead = async (req, res) => {
     const errors=validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({error:errors.array()})
        }
    const id=req.params.id
    try {
      const message = await Message.findByIdAndUpdate(id,{ isRead: true },{ new: true })
      if (!message){
         return res.status(404).json({ error: 'Message not found' })
      }
      res.status(200).json(message);
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Failed to update message' });
    }
  };
  //5.delete
messageCtrl. deleteMessage = async (req, res) => {
     const errors=validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({error:errors.array()})
        }
    try {
        const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
        if(sender==req.userId || req.role=='admin'|| receiver==req.userId){
            const message = await Message.findByIdAndDelete(req.params.id);
      if (!message){
         return res.status(404).json({ error: 'Message not found' })
      }
      res.status(200).json({ message: 'Message deleted successfully' })
        }else{
            return res.status(403).json({ error: 'Unauthorized' });
        }
      
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Failed to delete message'});
    }
  };
  export default messageCtrl