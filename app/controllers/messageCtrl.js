import Message from "../models/messageModel";
const messageCtrl={}
messageCtrl.sendMessage=async(req,res)=>{
    // const {sender,receiver,equipmentId,content}=req.body
    const body=req.body
    try{
        const message=await Message.create(body)
        res.status(201).json(message)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
//get all message for a user
messageCtrl.getMessages=async(req,res)=>{
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

//getbyid
messageCtrl.getmessagebyId=async(req,res)=>{
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
//read
messageCtrl.markAsRead = async (req, res) => {
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
messageCtrl. deleteMessage = async (req, res) => {
    try {
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message){
         return res.status(404).json({ error: 'Message not found' })
      }
      res.status(200).json({ message: 'Message deleted successfully' })
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Failed to delete message'});
    }
  };
  export default messageCtrl