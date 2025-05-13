import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../configure/baseURL'
export  const createUser=createAsyncThunk('user/createUser',async({formData,resetForm})=>{
    try{
        const response=await axios.post('register',formData)
        resetForm()
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
})
export const fetchUserAccount=createAsyncThunk('user/fetchUserAccount',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('profile',{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })
    }
})
//All users
export const fetchAllUsers=createAsyncThunk('user/fetchAllUsers',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('users',{headers:{Authorization:localStorage.getItem('token')}}) //,{headers:{Authorization:localStorage.getItem('token')}}
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })
    }
})

//delete user
export const removeUser=createAsyncThunk('user/removeUser',async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`user/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })
    }
})
const userSlice=createSlice({
    name:'user',
    initialState:{users:[],userData:null,isLoggedIn:false,editId:null,serverErr:null,loading:false},
    reducers:{
        login:(state,action)=>{
            state.userData=action.payload
            state.loading=false
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.isLoggedIn=false
            state.userData=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserAccount.fulfilled,(state,action)=>{
                    state.userData=action.payload
                    state.isLoggedIn=true
        })
        builder.addCase(fetchUserAccount.rejected,(state,action)=>{
                    state.serverErr=action.payload
                    
        })
        //allusers
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
                    state.users=action.payload
                    // state.isLoggedIn=true
                     state.loading=false
        })
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.serverErr=action.payload
            state.loading=false
        })
        builder.addCase(fetchAllUsers.pending,(state,action)=>{
            state.loading=true
        })
        // deleteuser
    builder.addCase(removeUser.fulfilled, (state, action) => {
      const index = state.users.findIndex((ele) => ele._id === action.payload._id);
        if (index !== -1) {
            state.users.splice(index, 1);
        }
  
        state.userData = null;
    });
        builder.addCase(removeUser.rejected,(state,action)=>{
            state.serverErr=action.payload
        })
    }
})
export const {login,logout}=userSlice.actions
export default userSlice.reducer