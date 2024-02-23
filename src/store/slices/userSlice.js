import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../url";

const initialState = {
 userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): false
}

export const loginhUser = createAsyncThunk("loginhUser", async (loginData, { rejectWithValue }) => {

  console.log(loginData)

  try {
    const { data } = await axios.post(`${baseUrl}/api/users/login`, loginData)
    return data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data.message)
  }

})
export const registerUser = createAsyncThunk("registerUser", async (regiserData, { rejectWithValue }) => {


  try {
    const { data } = await axios.post(`${baseUrl}/api/users/`, regiserData)
    return data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data.message)
  }

})

export const updateUser = createAsyncThunk("updateUser" , async(updateData , thunkApi)=> {
  try {
    const {userLogin : {userInfo}} = thunkApi.getState()

    const config = {
      headers:{
        Authorization: `Bearer ${userInfo.token}`

      }
    }

    const {data} = await axios.post(`${baseUrl}/api/users/profile` , updateData,config )

    return data
    
  } 
  catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message)
    
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.userInfo = {}
      localStorage.removeItem("userInfo")

    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginhUser.pending, (state, action) => {
      state.loding = true
    })
    builder.addCase(loginhUser.fulfilled, (state, action) => {
      state.loding = false
      state.userInfo = action.payload

      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    })
    builder.addCase(loginhUser.rejected, (state, action) => {
      console.log(state)
      state.loding = false
      state.error = action.payload
      
    })
    builder.addCase(registerUser.pending, (state, action) => {
      state.loding = true
      state.demo = false
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loding = false
      state.userInfo = action.payload
      state.demo = true
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(state)
      state.loding = false
      state.error = action.payload
      
    })
    builder.addCase(updateUser.pending, (state, action) => {
      state.loding = true
      
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loding = false
      state.userInfo = action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log(state)
      state.loding = false
      state.error = action.payload
      
    })
    
  }


})

export const { logOut } = userSlice.actions

export default userSlice.reducer