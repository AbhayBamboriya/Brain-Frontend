import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosInstance"
const initialState={
   userData:[]
}  

export const allUser=createAsyncThunk('/user',async(d)=>{
    try{
        console.log('d',d);
        const res=axiosInstance.post(`/user/${d}`)
        return (await res).data
    }catch(e){
        toast.error(e)
    }
})


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(allUser.fulfilled,(state,action)=>{
            console.log('action of user0',action);
            if(action?.payload==undefined) return
            console.log('reached reached ',action.payload);
            if(action.payload){
                state.userData=[...action.payload]
            }
        })   
    }
})

// export userSlice=
export default userSlice.reducer



