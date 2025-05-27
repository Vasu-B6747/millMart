import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
const paymentSlice=createSlice({
    name:'payments',
    initialState:{payments:[],userPayment:[],loading:false,serverErr:null},
    reducers:{},
    extraReducers:(builder)=>{

    }
})
export default paymentSlice.reducer