import{configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import equipmentReducer from '../slices/equipmentSlice'
const store=configureStore({
    reducer:{
        user:userReducer,
        equipments:equipmentReducer
    }
})
export default store