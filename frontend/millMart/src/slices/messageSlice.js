import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from '../configure/baseURL'
//create
export const createMessage=createAsyncThunk('/messages/createMessage',async(msgObj,{ rejectWithValue })=>{
  // console.log(msgObj)
  try{
    // console.log(msgObj)
    const response=await axios.post('message',msgObj,{headers:{Authorization:localStorage.getItem('token')}})
    console.log(response.data)
    return response.data
  }catch(err){
    console.log(err)
    return rejectWithValue(err.response?.data || "Failed to create message");

  }
})
export const fetchMessages=createAsyncThunk('/messages/fetchMessages',async(userId,{ rejectWithValue })=>{
  console.log(userId)
  try{
    const response=await axios.get(`messages/user/${userId}`,{headers:{Authorization:localStorage.getItem('token')}})
    console.log(response.data)
    return response.data
  }catch(err){
    console.log(err)
    return rejectWithValue(err.response?.data || "Failed to fetch messages");

  }
})
//getusermessage
export const getMessage=createAsyncThunk('/messages/getMessage',async(id,{ rejectWithValue })=>{
  try{
    const response=await axios.get(`message/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
    console.log(response.data)
    return response.data
  }catch(err){
    console.log(err)
    return rejectWithValue(err.response?.data || "Failed to create message");

  }
})


const initialState = {
  messages: [],
  Message:null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers:(builder)=>{
     builder.addCase(fetchMessages.pending,(state,action)=>{
      state.loading=true
    })
    builder.addCase(fetchMessages.fulfilled,(state,action)=>{
      state.messages=action.payload
      state.loading=false
    })
     builder.addCase(fetchMessages.rejected,(state,action)=>{
      state.error='Something went wrong'
      state.loading=false
    })

    //getMessage
    builder.addCase(getMessage.pending,(state,action)=>{
      // state.messages=action.payload
      state.loading=true
    })
    builder.addCase(getMessage.fulfilled,(state,action)=>{
      state.Message=action.payload
      state.loading=false
    })
    builder.addCase(getMessage.rejected,(state,action)=>{
      state.error=action.payload
      state.loading=false
    })
  }
});

export const { setMessages, addMessage, setLoading, setError } = messageSlice.actions;

export default messageSlice.reducer;
