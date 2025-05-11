import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export  const createUser=createAsyncThunk('user/createUser',async({formData,resetForm})=>{
    try{
        const response=await axios.post('http://localhost:3045/register',formData)
        resetForm()
        console.log(response.data)
    }catch(err){
        console.log(err)
    }
})
const userSlice=createSlice({
    name:'user',
    initialState:{users:[],userData:null,isLoggedIn:false,editId:null,serverErr:null,loading:false},
    reducers:{},
    extraReducers:(builder)=>{

    }
})
export default userSlice.reducer