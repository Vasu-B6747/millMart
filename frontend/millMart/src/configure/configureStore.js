import{configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import equipmentReducer from '../slices/equipmentSlice'
import messageReducer from '../slices/messageSlice';
const store=configureStore({
    reducer:{
        user:userReducer,
        equipments:equipmentReducer,
        messages: messageReducer,
    }
})
export default store