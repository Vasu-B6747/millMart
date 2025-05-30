import jwt from 'jsonwebtoken'
export const authenticateUser=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(401).json({error:'token is required'})
    }
    try{
        const tokenData=jwt.verify(token,process.env.SECRET)
        req.userId=tokenData.userId
        req.role=tokenData.role
        next()
    }catch(err){
        res.status(401).json({error:err.message})
    }

}