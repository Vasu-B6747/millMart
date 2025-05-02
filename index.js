import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import configureDB  from './config/configureDb.js' 
import { authenticateUser } from './app/middlewares/authenticateUser.js'
import { authorisedUser } from './app/middlewares/authorisedUser.js'

import userCtrl from './app/controllers/userCtrl.js'

const app=express()
const port=3045
app.use(express.json())
app.use(cors())
dotenv.config()
configureDB()

app.post('/register',userCtrl.register)
app.post('/login',userCtrl.login)
app.get('/profile',authenticateUser,userCtrl.profile)
app.get('/users',authenticateUser,authorisedUser(['admin']),userCtrl.list)
app.put('/user/:id',authenticateUser,userCtrl.update)

app.listen(port,()=>{
    console.log('sever is running on port ',port)
})