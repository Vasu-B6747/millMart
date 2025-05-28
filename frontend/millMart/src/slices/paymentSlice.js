import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../configure/baseURL'
export const fetchAllpayments=createAsyncThunk('/payments/fetchAllpayment',async()=>{
    try{
        const response=await axios.get('payments',{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return err
    }
})
//userPayments
export const userPayments=createAsyncThunk('/payments/userPayments',async()=>{
    try{
        const response=await axios.get('payment/user/',{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return err
    }
})
const paymentSlice=createSlice({
    name:'payments',
    initialState:{payments:[],userPayment:[],loading:false,serverErr:null},
    reducers:{},
    extraReducers:(builder)=>{
        //All payments
        builder.addCase(fetchAllpayments.pending,(state,action)=>{
            state.loading=true
            state.serverErr=null
        })
        builder.addCase(fetchAllpayments.fulfilled,(state,action)=>{
            state.payments=action.payload
            state.loading=false
            state.serverErr=null
        })
        builder.addCase(fetchAllpayments.rejected,(state,action)=>{
            // state.payments=action.payload
            state.loading=false
            state.serverErr=action.payload
        })

        //userPayments
        builder.addCase(userPayments.pending,(state,action)=>{
            state.loading=true
            state.serverErr=null
        })
        builder.addCase(userPayments.fulfilled,(state,action)=>{
            state.userPayment=action.payload
            state.loading=false
            state.serverErr=null
        })
        builder.addCase(userPayments.rejected,(state,action)=>{
            // state.payments=action.payload
            state.loading=false
            state.serverErr=action.payload
        })
    }
})
export default paymentSlice.reducer