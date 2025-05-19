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
        return response.data.results
    }catch(err){
        console.log(err)
       return rejectWithValue({
            message:err.message,
            errors:err.response.data.error
        })
    }
})
//approveEquipments
export const approveEquipments=createAsyncThunk('equipments/approveEquipments',async(id,{rejectWithValue})=>{
              try{
                console.log()
                const response=await axios.put(`equipment/approve/${id}`,{isApproved:'true'},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            }) 
//verify
export const verifyEquipments=createAsyncThunk('equipments/verifyEquipments',async(id,{rejectWithValue})=>{
              try{
                console.log()
                const response=await axios.put(`equipment/verify/${id}`,{isVerified:'true'},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data.equipment
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
})   
//isSold
export const markSold=createAsyncThunk('equipments/markSold',async(id,{rejectWithValue})=>{
              try{
                console.log()
                const response=await axios.patch(`equipment/sold/${id}`,{isSold:'true'},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
})
export const rejectEquipment=createAsyncThunk('equipments/rejectEquipment',async(id,{rejectWithValue})=>{
              try{
                console.log()
                const response=await axios.put(`equipment/approve/${id}`,{isApproved:'false'},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })
            
export const unverifyEquipment=createAsyncThunk('equipments/unverifyEquipment',async(id,{rejectWithValue})=>{
              try{
                const response=await axios.put(`equipment/verify/${id}`,{isVerified:'false'},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data.equipment
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            }) 
//fetchEquipment
export const fetchEquipment=createAsyncThunk('equipments/fetchEquipment',async(id,{rejectWithValue})=>{
              try{
                const response=await axios.get(`equipment/${id}`)
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
}) 
//deleteEquipment
export const deleteEquipment=createAsyncThunk('equipments/deleteEquipment',async(id,{rejectWithValue})=>{
              try{
                const response=await axios.delete(`equipment/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
}) 
// updateEquipment
export const updateEquipment=createAsyncThunk('equipments/updateEquipment',async({equipObj,resetForm},{rejectWithValue})=>{
              try{
                const response=await axios.put(`equipment/${equipObj._id}`,equipObj,{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                resetForm()
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
}) 
//getsellerEquipment
export const getsellerEquipment=createAsyncThunk('equipments/getsellerEquipment',async(id,{rejectWithValue})=>{
              try{
                const response=await axios.get(`equipment/seller/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
}) 

const equipmentSlice=createSlice({
    name:'equipments',
    initialState:{equipmentData:[],loading:false,serverErr:null,equipment:null,userEquipments:[],editId:null},
    reducers:{
      assigneditId:(state,action)=>{
        state.editId=action.payload
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(createEquipment.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(createEquipment.fulfilled, (state, action) => {
          state.equipmentData.push(action.payload)
          state.loading = false;
        });
        builder.addCase(createEquipment.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
        //userEquipments
         builder.addCase(getsellerEquipment.pending, (state) => {
          state.loading = true;
          state.serverErr=null
        });
        builder.addCase(getsellerEquipment.fulfilled, (state, action) => {
          state.userEquipments=action.payload
          state.loading = false;
        });
        builder.addCase(getsellerEquipment.rejected, (state, action) => {
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
        //approve
        builder.addCase(approveEquipments.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(approveEquipments.fulfilled, (state, action) => {
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData[index]=action.payload
          state.serverErr=null
          state.loading=false
        });
        builder.addCase(approveEquipments.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
        //verify verifyEquipments
        builder.addCase(verifyEquipments.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(verifyEquipments.fulfilled, (state, action) => {
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData[index]=action.payload
          state.serverErr=null
          state.loading=false
        });
        builder.addCase(verifyEquipments.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
      //markSold 
       builder.addCase(markSold.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(markSold.fulfilled, (state, action) => {
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData[index]=action.payload
          state.serverErr=null
          state.loading=false
        });
        builder.addCase(markSold.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        }); 
        //reject
         builder.addCase(rejectEquipment.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(rejectEquipment.fulfilled, (state, action) => {
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData[index]=action.payload
          state.serverErr=null
          state.loading=false
        });
        builder.addCase(rejectEquipment.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
        //unverify
         builder.addCase(unverifyEquipment.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(unverifyEquipment.fulfilled, (state, action) => {
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData[index]=action.payload
          state.serverErr=null
          state.loading=false
        });
        builder.addCase(unverifyEquipment.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });
      //fetchEquipment
       builder.addCase(fetchEquipment.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchEquipment.fulfilled, (state, action) => {
          state.equipment=action.payload
          state.serverErr=null
          state.loading=false
        });
        builder.addCase(fetchEquipment.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });

        //deleteEquipment
        builder.addCase(deleteEquipment.fulfilled,(state,action)=>{
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData.splice(index,1)
          state.serverErr=null
          state.loading=false
        })
        
        builder.addCase(deleteEquipment.pending, (state) => {
          state.loading = true;
        });
        
        builder.addCase(deleteEquipment.rejected,(state,action)=>{
          state.serverErr=action.payload
          state.loading = false;
        }) 
      //updateEquipment
       builder.addCase(updateEquipment.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(updateEquipment.fulfilled, (state, action) => {
          const index=state.equipmentData.findIndex((ele)=>ele._id==action.payload._id)
          state.equipmentData[index]=action.payload
          state.serverErr=null
          state.loading=false
          state.editId=null
        });
        builder.addCase(updateEquipment.rejected, (state, action) => {
          state.serverErr = action.payload;
          state.loading = false;
        });  
    }
})
export const {assigneditId}=equipmentSlice.actions
export default equipmentSlice.reducer