import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendEmail from '../Utils/resetEmail.js'
const userCtrl={}
userCtrl.register=async(req,res)=>{
    const body=req.body
    try{
        const user=new User(body)
        const count=await User.countDocuments()
        // console.log(count)
        if(count==0){
            user.role='admin'
            user.isVerify=true
            user.isActive=true
        }
        if(user.role=='buyer'){
            user.isActive=true
        }
        const salt=await bcryptjs.genSalt()
        const hash=await bcryptjs.hash(body.password,salt)
        user.password=hash
        await user.save()
        res.status(201).json(user)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

//Login
userCtrl.login=async(req,res)=>{
    const {email,password}=req.body
    // console.log(email)
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({error:'Invalid email/password'})
        }
        const isVerified=await bcryptjs.compare(password,user.password)
        if(!isVerified){
            return res.status(404).json({error:'Invalid email/password'})
        }
        const tokenData={userId:user._id,role:user.role}
        const token=jwt.sign(tokenData,process.env.SECRET,{expiresIn:'7d'})
        res.json(token)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}


//profile
userCtrl.profile=async(req,res)=>{
    try{
        const user=await User.findById(req.userId)
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }

}

//AllUser
userCtrl.list=async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//removeUser
userCtrl.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const account=await User.findById(id)
        if(!account){
            return res.status(404).json({error:'Account not found'})
        }
        if(account.role=='admin'){
            return res.status(400).json({error:'Admin account cannot be delete'})
        }else{
            if(id==req.userId || req.role=='admin'){
                const user=await User.findByIdAndDelete(id)
                return res.json(user)
               }
            res.json({error:'cannot delete this account, user is invalid'})  
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

//updateUser
userCtrl.update=async(req,res)=>{
    const id=req.params.id
    let {name,profilePic,address,email,password}=req.body
    try{
        const updateData = { name, email, profilePic, address };
        if (password) {
            const salt = await bcryptjs.genSalt()
            const hashed = await bcryptjs.hash(password, salt)
            updateData.password = hashed
        }
        if (id == req.userId || req.role === 'admin') {
            const user = await User.findByIdAndUpdate(id, updateData, { new: true });
            return res.status(200).json(user);
        } else {
            return res.status(403).json({ error: 'Unauthorized to update this account' });
        }

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//forgotPassword
userCtrl.forgotPassword=async(req,res)=>{
    const {email}=req.body
    try{
    const user=await User.findOne({email})
    if(!user){
        return res.status(404).json({error:'User not found'})
    }
    const token=crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken=token
    user.resetPasswordExpires=Date.now()+600000
    await user.save()
    const resetLink=`${process.env.FRONTEND_URL}/resetpassword/${token}`
    const message=`We have received reset password request.Please use the below the link to reset your password \n\n${resetLink} \n\n.This reset password link valid upto 10 minutes`
    console.log(user.email)
    sendEmail({email:user.email,message:message})
    res.json({ message: 'Password reset link sent to email', resetLink })
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }

}

//ResetPassword
userCtrl.resetPassword = async (req, res) => {
    const { token } = req.params
    const { password,confirmPassword } = req.body

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
          }
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' })
        }

        const salt = await bcryptjs.genSalt()
        user.password = await bcryptjs.hash(password, salt)

        // Clear reset fields
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        await user.save()
        await sendEmail({
            email: user.email,
            message: 'Your password was successfully reset. If you didn’t do this, contact support immediately.'
          });
        res.json({ message: 'Password reset successful' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
//Active to users
userCtrl.activate=async(req,res)=>{
    const id=req.params.id
    const {isActive}=req.body
    try{
        if(req.role=='admin'){
            const user=await User.findByIdAndUpdate(id,{isActive},{new:true})
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

//Verify users
userCtrl.isVerify=async(req,res)=>{
    const id=req.params.id
    const {isVerify}=req.body
    try{
        if(req.role=='admin'){
            const user=await User.findByIdAndUpdate(id,{isVerify},{new:true})
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

export default userCtrl