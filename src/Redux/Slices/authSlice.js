import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import axios from "axios";

const initialState={
   
}  

export const createAccount=createAsyncThunk('/auth/signup',async(data) =>{
    try{
        const res=axiosInstance.post("/register",data)
        console.log('chrckingj');
        toast.promise(res
            ,{
            loading:"Wait! Creating your account",
            
            success:(data)=>{
                return data?.data?.message
            },
           
            error: (err) => {
                console.error('Failed to create account:', err);
                return err
            }
        });
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const found=createAsyncThunk('/check',async(data)=>{
    try{
        const r= axiosInstance.post('/check',data)
        toast.promise(r,
            {
                loading:'Wait! Authentication in Progress ',
                success:(res)=>{
                    console.log('res',res);
                    return res?.data?.message
                },
                // error:'Enter a registered User Id'
            }
        )
        return (await (r)).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const found1=createAsyncThunk('/check',async(data)=>{
    try{
        const r= axiosInstance.post('/check',data)
        toast.promise(r,
            {
                loading:'Wait! Authentication in Progress ',
                success:(res)=>{
                    if(res?.data?.message){
                        return res?.data?.message
                    }
                }
            }
        )
        return (await (r)).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})
export const  forgot=createAsyncThunk('/forgot',async(data)=>{
    try{
        const res=axiosInstance.post('/reset',data)
        // console.log('response forgot',await (res));
        return (await (res)).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)   
    }
})
export const login=createAsyncThunk('/auth/signin',async(d) =>{
    try{
        const res= axiosInstance.post("/login",d)
        // console.log('login',res);
        toast.promise(res
            ,{
            loading:"Wait! Authentication in Progress ",
            success:(data)=>{
                return data?.data?.message
            },
            error: (err) => {
                return "Login Credential didn't match";
            }
        });
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/logout")
        // console.log('res'+(await res).data);
        toast.promise(res,{
            loading:"Wait! Logout in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Logout"
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile",async (data)=>{
    try{
        const res=axiosInstance.put(`user/update/${data[0]}`,data[1])
        toast.promise(res,{
            loading:"Wait! Profile Update in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Update Profile"
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const getUserData = createAsyncThunk("/user/details",async ()=>{
    try{
        const res=axiosInstance.get("/user/me")
        
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e.message)
    }
})

export const resetPassword=createAsyncThunk('/resetPassword',async(data)=>{
    try{
        const res=axiosInstance.post(`/password/${data.url}`,data)
        toast.promise(res,{
            loading:"Wait! Reset Password in Progress ",
            
            success:(data)=>{
                console.log('data from slics',data);
                return data?.data?.message
            },
            error:"Failed to Reset Password"
        });
        console.log('res',res);
        return (await res).data
    }
    catch(e){
        toast.error(e)
    }
})
export const refresh=createAsyncThunk('/refresd',()=>{
    console.log('refreshing');
    return true
})

export const detail=createAsyncThunk('/detail',async(id)=>{
    try{
        console.log('detail reached',id);
        const res=axiosInstance.get('/detail',id)
        console.log('output',(await res));
        return (await res).data
    }
    catch(e){
        toast.error(e)
    }
})


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createAccount.fulfilled,(state,action)=>{
            if(action?.payload==undefined) return
            console.log('actionis',action);
            localStorage.setItem("UserName",action?.payload?.user?.UserName)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("email",action?.payload?.user?.email)
            localStorage.setItem("url",action?.payload?.user?.profile?.secure_url)
            localStorage.setItem("Userid",action?.payload?.user?._id)
            state.isLoggedIn=true
            state.UserName=action?.payload?.UserName
            state.email=action?.payload?.user?.email
            state.id=action?.payload?.user?._id
            state.Profile=action?.payload?.user?.profile?.secure_url
            
        })
        .addCase(refresh.fulfilled,(state,action)=>{
            // console.log('commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
            state.isLoggedIn=true
            state.UserName=localStorage.UserName
            state.email=localStorage.Email
            state.Profile=localStorage.url
            state.id=localStorage.Userid

        })
        .addCase(login.fulfilled,(state,action)=>{
            if(action?.payload==undefined) return
            console.log('actino from login',action);
            localStorage.setItem("UserName",action?.payload?.user?.UaerName)
            localStorage.setItem("Email",action?.payload?.user?.email)
            localStorage.setItem("url",action?.payload?.user?.profile?.secure_url)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("Userid",action?.payload?.user?._id)
            console.log('tryiiiiiii',localStorage);
            state.Profile=action?.payload?.user?.profile?.secure_url
            state.isLoggedIn=true
            state.UserName=action?.payload?.UserName
            state.email=action?.payload?.user?.email
            state.id=action?.payload?.user?._id
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.Profile=''
            state.isLoggedIn=false
            state.UserName=''
            state.email=''
            state.id=''
        })

        .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.role=action?.payload?.user?.role
        })

        .addCase(forgot.fulfilled,(state,action)=>{
            console.log('store res',action);
            if(!action?.payload?.data?.resetToken)    return
            localStorage.setItem("resetToken",action?.payload?.data?.resetToken)
            state.resetPasswordUrl=action?.payload?.data?.resetToken
        })
        
        
    }
})

// export userSlice=
export default authSlice.reducer