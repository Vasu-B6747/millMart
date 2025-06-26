import{configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import equipmentReducer from '../slices/equipmentSlice'
import messageReducer from '../slices/messageSlice';
import paymentReducer from '../slices/paymentSlice'
const store=configureStore({
    reducer:{
        user:userReducer,
        equipments:equipmentReducer,
        messages: messageReducer,
        payments:paymentReducer,
    }
})
export default store