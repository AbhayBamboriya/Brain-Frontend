import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosInstance"
const initialState={
   messageData:[]
}  


export const message=createAsyncThunk('/message',async()=>{
    try{
        const res=axiosInstance.get('/message')
        console.log('res from messsage',await(res));
        return (await res).data.messages
    }
    catch(e){
        toast.error(e)
    }
})
const userSlice=createSlice({
    name:'messages',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(message.fulfilled,(state,action)=>{
            console.log('action of message',action);
            if(action?.payload==undefined) return
            // // console.log('reached reached ',action.payload);
            if(action.payload){
                state.messageData=[...action.payload]
            }
        }) 
    }
})

// export userSlice=
export default userSlice.reducer



