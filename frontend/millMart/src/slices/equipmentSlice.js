import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../configure/baseURL'
export const createEquipment=createAsyncThunk('equipments/createEquipment',async({formData,resetForm},{rejectWithValue})=>{
    try{
        const response=await axios.post('equipment',formData,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        resetForm()
        return response.data

    }catch(err){
        console.log(err)
         return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.error
                })
    }
})
//list of Equiments
export const fetchEquipments=createAsyncThunk('equipments/fetchEquipments',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('equipments')
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        rejectWithValue({
            message:err.message,
            errors:err.response.data.error
        })
    }
})
const equipmentSlice=createSlice({
    name:'equipments',
    initialState:{equipmentData:[],loading:false,serverErr:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createEquipment.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(createEquipment.fulfilled, (state, action) => {
          state.equipmentData=state.equipmentData.push(action.payload)
          state.loading = false;
        });
        builder.addCase(createEquipment.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
        //listEquipments
         builder.addCase(fetchEquipments.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchEquipments.fulfilled, (state, action) => {
          state.equipmentData=action.payload
          state.loading = false;
        });
        builder.addCase(fetchEquipments.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
    }
})
export default equipmentSlice.reducer