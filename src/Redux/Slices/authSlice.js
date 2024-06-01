import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import { act } from "react";

// initial state of auth slice
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')   || false,
    // role:localStorage.getItem('role') || "",
    // json .parse is used because when we do refresh then data will be in string format in redux dev tools
    // data:localStorage.getItem('data') !== undefined ? JSON.parse(localStorage.getItem('data')) :  []
    // data:JSON.parse(localStorage.getItem('data')) 
}  
// thunk is used to provide the delay
// string is passed in createAsyncThunk to uniquely identify
export const createAccount=createAsyncThunk('/auth/signup',async(data) =>{
    try{
        for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
        const res=axiosInstance.post("/register",data)
        console.log('res'+res);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Creating your account",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to create account"
            // error: (err) => {
            //     console.error('Failed to create account:', err);
            //     return "Failed to create account";
            // }
            // console.log();
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const found=createAsyncThunk('/found',async(data)=>{
    try{
        console.log('dataaa',data);
        console.log('reached here');
        const res=axiosInstance.post('/user/check',data)
        
        toast.promise(res,
            {
                loading:'Wait! Authentication in Progress ',
                success:(res)=>{
                    return res?.data?.message
                },
                error:'Enter a registered User Id'
            }
        )
        return (await (res)).data
        // console.log('cheeckkkk');
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})
export const forgot=createAsyncThunk('/forgot',async(data)=>{
    try{
        const res=axiosInstance.post('/user/reset',data)
        console.log('response forgot',await (res));
        return await res
    }
    catch(e){
        toast.error(e?.response?.data?.message)   
    }
})
export const login=createAsyncThunk('/auth/signin',async(d) =>{
    try{
        // console.log('login data',data.email);
        console.log('for loooooooop');
        // var data;
        //     for(var pair of d.entries()) {
        //         console.log(pair[0]+ ', '+ pair[1]); 
                
        //     }

        console.log('suz')
        // const {email,password}=data;
        // console.log('checkinggggggg',email,' ',password);
        const res= axiosInstance.post("/login",d)
        // console.log('res'+(await res).data);
        console.log('login',res);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Authentication in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            // error:"Failed to Login"
            error: (err) => {
                // console.error('Failed to create account:', err);
                return "Login Credential didn't match";
            }
            // console.log();
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/user/logout")
        console.log('res'+(await res).data);
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
        console.log('reached1');
        console.log(data);

        console.log('abhay');
        // const res=axiosInstance.changeUrl.post(`/${url}`,data)
        // const res=changePasswordInstance.post(`/${url}`,data)
        console.log('resetPasswordData',data);
        console.log('passwordSend',data.passwordW);
        // l=data.passwordW
        console.log('sending data',`/user/password/${data.url}`,data);
        const res=axiosInstance.post(`/user/password/${data.url}`,data)

        console.log('reached');
        toast.promise(res,{
            loading:"Wait! Reset Password in Progress ",
            
            success:(data)=>{
                console.log('data from slics',data);
                return data?.data?.message
            },
            error:"Failed to Reset Password"
        });
        return (await res).data
    }
    catch(e){
        // console.log('error');
        toast.error(e)
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // if login in successfull then what to ds
        builder
        .addCase(createAccount.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            console.log('actionis',action);
            localStorage.setItem("UserName",action?.payload?.user?.UserName)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("email",action?.payload?.user?.email)
            localStorage.setItem("id",action?.payload?.user?._id)
            state.isLoggedIn=true
            state.UserName=action?.payload?.UserName
            state.email=action?.payload?.user?.email
            state.id=action?.payload?.user?._id
        })
        .addCase(login.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            console.log('actino',action);
            localStorage.setItem("Name",action?.payload?.user?.Name)
            localStorage.setItem("UserName",action?.payload?.user?.UaerName)
            localStorage.setItem("Email",action?.payload?.user?.email)

            localStorage.setItem("isLoggedIn",true)
            // localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.Name=action?.payload?.user?.Name
            state.UserName=action?.payload?.user?.UserName
            state.Profile=action?.payload?.user?.profile?.secure_url
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={}
            state.isLoggedIn=false
            state.role=""
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

// export const {}=authSlice.actions
export default authSlice.reducer