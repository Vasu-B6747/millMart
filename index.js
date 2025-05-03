import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { checkSchema } from 'express-validator'
import configureDB  from './config/configureDb.js' 
import { authenticateUser } from './app/middlewares/authenticateUser.js'
import { authorisedUser } from './app/middlewares/authorisedUser.js'

import userCtrl from './app/controllers/userCtrl.js'
import equipmentCtrl from './app/controllers/equipmentCtrl.js'

import { registerValidationSchema,userLoginSchema } from './app/validators/userValidations.js'
import { forgotPasswordValidation,resetPasswordValidation } from './app/validators/forgotValidations.js'
import { idValidationSchema } from './app/validators/idValidations.js'

const app=express()
const port=3045
app.use(express.json())
app.use(cors())
dotenv.config()
configureDB()

//user
app.post('/register',checkSchema(registerValidationSchema),userCtrl.register)
app.post('/login',checkSchema(userLoginSchema),userCtrl.login)
app.get('/profile',authenticateUser,userCtrl.profile)
app.get('/users',authenticateUser,authorisedUser(['admin']),userCtrl.list)
app.put('/user/:id',authenticateUser,checkSchema(idValidationSchema),userCtrl.update)
app.post('/forgotpassword',checkSchema(forgotPasswordValidation),userCtrl.forgotPassword)
app.post('/resetpassword/:token',checkSchema(resetPasswordValidation),userCtrl.resetPassword)
app.put('/active/:id',authenticateUser,authorisedUser(['admin']),checkSchema(idValidationSchema),userCtrl.activate)
app.put('/verify/:id',authenticateUser,authorisedUser(['admin']),checkSchema(idValidationSchema),userCtrl.isVerify)

//equipment
app.post('/equipment',equipmentCtrl.create)
app.get('/equipments',equipmentCtrl.list)
app.listen(port,()=>{
    console.log('sever is running on port ',port)
})