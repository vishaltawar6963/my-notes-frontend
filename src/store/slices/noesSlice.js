import axios from "axios";
import userSlice from "./userSlice";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../url";


export const getUserNotes = createAsyncThunk("getUserNotes", async (data, thunkApi) => {

    try {
        const { userLogin: { userInfo } } = thunkApi.getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${baseUrl}/api/notes`, config)
        return data.reverse()
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }

})


export const createNote = createAsyncThunk("createNote" ,async (createData ,thunkApi ) =>{
    const { userLogin: { userInfo } } = thunkApi.getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    try {
        const {data} = axios.post(`${baseUrl}/api/notes/create` , createData , config)
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.messages)
    }
})

export const updateNote = createAsyncThunk("updatenote" , async(updateData, thunkApi) =>{
const {_id , title , desc , category} = updateData
try {
    const {userLogin:{userInfo}} = thunkApi.getState()
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    console.log("here")
const {data} = await axios.put(`${baseUrl}/api/notes/${_id}`, {title , desc , category},config)
return data

    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
        
    }
})

export const deleteNote = createAsyncThunk("deletenote" , async(deleteid , thunkApi)=>{

    try {
        const {userLogin:{userInfo}} = thunkApi.getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`${baseUrl}/api/notes/${deleteid}`,config) 
        
        return data


        
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    userNotes: []
}
const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserNotes.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserNotes.fulfilled, (state, action) => {
            state.loading = false
            state.userNotes = action.payload
        })
        builder.addCase(getUserNotes.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(createNote.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.loading = false
            
        })
        builder.addCase(createNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateNote.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateNote.fulfilled, (state, action) => {
            state.loading = false
            
        })
        builder.addCase(updateNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deleteNote.pending, (state, action) => {
            state.loading = true
            state.deleteSucess = false
        })
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            state.loading = false
            state.deleteSucess = true
            
        })
        builder.addCase(deleteNote.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }

})

export default noteSlice.reducer