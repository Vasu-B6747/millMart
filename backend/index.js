import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { checkSchema } from 'express-validator'
import configureDB  from './config/configureDb.js' 
import { authenticateUser } from './app/middlewares/authenticateUser.js'
import { authorisedUser } from './app/middlewares/authorisedUser.js'
import upload from './app/middlewares/uploads.js'
//Ctrls
import userCtrl from './app/controllers/userCtrl.js'
import equipmentCtrl from './app/controllers/equipmentCtrl.js'
import messageCtrl from './app/controllers/messageCtrl.js'
import reviewCtrl from './app/controllers/reviewCtrl.js'
import paymentCtrl from './app/controllers/paymentCtrl.js'
//Validation
import { registerValidationSchema,userLoginSchema } from './app/validators/userValidations.js'
import { forgotPasswordValidation,resetPasswordValidation } from './app/validators/forgotValidations.js'
import { idValidationSchema } from './app/validators/idValidations.js'
import { equipmentValidationSchema } from './app/validators/equipmentValidations.js'
import { messageValidationSchema } from './app/validators/messageValidations.js'
import { createReviewValidation } from './app/validators/reviewCreateValidation.js'
import { updateReviewValidation } from './app/validators/reviewUpdateValidations.js'
import { createPaymentValidation } from './app/validators/paymentValidations.js'

const app=express()
const port=3045
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))
dotenv.config()
configureDB()

//1
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin:'*'     //'http://localhost:5173',
    // methods: ['GET', 'POST']
  }
})
//2
app.set('io', io)
//3
io.on('connection', (socket) => {
  console.log('Socket connected: ', socket.id)
  socket.on('join', (userId) => {
    socket.join(userId)
    console.log(`User ${userId} joined their room`)
  })
  socket.on('sendMessage', (msg) => {
    const receiverId = msg.receiver?._id || msg.receiver
    if (receiverId) {
      io.to(receiverId).emit('newMessage', msg)
    }
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id)
  })
})

//user
app.post('/register', upload.single('profilePic'),checkSchema(registerValidationSchema),userCtrl.register)
app.post('/login',checkSchema(userLoginSchema),userCtrl.login)
app.get('/profile',authenticateUser,userCtrl.profile)
app.get('/users',authenticateUser,authorisedUser(['admin']),userCtrl.list)
app.get('/user/:id',authenticateUser,checkSchema(idValidationSchema),userCtrl.getUser)
app.delete('/user/:id',authenticateUser,checkSchema(idValidationSchema),userCtrl.remove)
app.put('/user/:id',authenticateUser,checkSchema(idValidationSchema),userCtrl.update)
app.post('/forgotpassword',checkSchema(forgotPasswordValidation),userCtrl.forgotPassword)
app.post('/resetpassword/:token',checkSchema(resetPasswordValidation),userCtrl.resetPassword)
app.put('/active/:id',authenticateUser,authorisedUser(['admin']),checkSchema(idValidationSchema),userCtrl.activate)
app.put('/verify/:id',authenticateUser,authorisedUser(['admin']),checkSchema(idValidationSchema),userCtrl.isVerify)

//equipment
app.post('/equipment',authenticateUser,upload.array('photos', 5), checkSchema(equipmentValidationSchema),equipmentCtrl.create)
// app.post('/equipment',authenticateUser,authorisedUser(['seller']),checkSchema(equipmentValidationSchema),equipmentCtrl.create)
app.get('/equipments',equipmentCtrl.list)
app.delete('/equipment/:id',authenticateUser,checkSchema(idValidationSchema),equipmentCtrl.remove)
app.put('/equipment/:id',authenticateUser,checkSchema(idValidationSchema),checkSchema(equipmentValidationSchema),equipmentCtrl.update)
app.get('/equipment/:id',checkSchema(idValidationSchema),equipmentCtrl.show)
app.get('/equipment/seller/:id',authenticateUser,checkSchema(idValidationSchema),equipmentCtrl.getBySeller)
app.get('/equipments/search',equipmentCtrl.search)
app.put('/equipment/approve/:id',authenticateUser,authorisedUser(['admin']),equipmentCtrl.approve)
app.put('/equipment/verify/:id',authenticateUser,authorisedUser(['admin']),equipmentCtrl.verify)
app.get('/equipment/nearby/address',equipmentCtrl.getNearby)
app.patch('/equipment/sold/:id',authenticateUser,checkSchema(idValidationSchema),equipmentCtrl.markAsSold)

//message
app.post('/message',authenticateUser,checkSchema(messageValidationSchema),messageCtrl.sendMessage)
app.get('/messages/user/:id',authenticateUser,checkSchema(idValidationSchema),messageCtrl.getMessages)
app.delete('/message/:id',authenticateUser,checkSchema(idValidationSchema),messageCtrl.deleteMessage)
app.get('/message/:id',authenticateUser,checkSchema(idValidationSchema),messageCtrl.getmessagebyId)
app.patch('/message/:id',authenticateUser,checkSchema(idValidationSchema),messageCtrl.markAsRead)

//reviews
app.post('/review',authenticateUser,checkSchema(createReviewValidation),reviewCtrl.createReview)
app.get('/review/buyer/:id',authenticateUser,checkSchema(idValidationSchema),reviewCtrl.getBuyerReviews)
app.get('/review/seller/:id',authenticateUser,checkSchema(idValidationSchema),reviewCtrl.getSellerReviews)
app.get('/review/equip/:id',authenticateUser,checkSchema(idValidationSchema),reviewCtrl.getEquipmentReviews)
app.put('/review/:id',authenticateUser,checkSchema(idValidationSchema),checkSchema(updateReviewValidation),reviewCtrl.updateReview)
app.delete('/review/:id',authorisedUser,checkSchema(idValidationSchema),reviewCtrl.deleteReview)

//payment
app.post('/payment',authenticateUser,checkSchema(createPaymentValidation),paymentCtrl.createPayment)
app.get('/payments',authenticateUser,authorisedUser(['admin']),paymentCtrl.getAllPayments)
app.delete('/payment/:id',authenticateUser,authorisedUser(['admin']),checkSchema(idValidationSchema),paymentCtrl.deletePayment)
app.get('/payment/:id',authenticateUser,checkSchema(idValidationSchema),paymentCtrl.getPaymentById)
app.get('/payment/user',authenticateUser,paymentCtrl.getUserPayments)
app.post('/payment/razor',authenticateUser,paymentCtrl.createRazorpayOrder)
app.post('/payments/verify-razorpay',authenticateUser,paymentCtrl.verifyRazorpayPayment)
app.patch('/payment/complete/:id',authenticateUser,checkSchema(idValidationSchema),paymentCtrl.completePayment)
app.patch('/payment/refund/:id',authenticateUser,checkSchema(idValidationSchema),paymentCtrl.refundPayment)




httpServer.listen(port,()=>{
    console.log('sever is running on port ',port)
})