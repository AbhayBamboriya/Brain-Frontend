import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import messageSlice from "./messageSlice";


const store=configureStore({
    reducer:{
       auth:authSlice,
       user:userSlice,
       message:messageSlice
    },
    devTools:true
})

export default store