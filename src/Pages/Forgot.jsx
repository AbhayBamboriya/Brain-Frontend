import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { forgot, found } from "../Redux/Slices/authSlice";

function Forgot(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [mail,setMail]=useState({
        email:"",
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        setMail({
            ...mail,
            [name]:value
        })
    }

    async function onForgot(e){
        e.preventDefault();
        if(!mail.email){
            toast.error('Please fill the details');
            return
        }
        const res=await dispatch(found(mail))
           
        if(res?.payload?.success){
            const token=await dispatch(forgot(mail))
            if(token?.payload?.data?.resetToken){
                navigate('/resetPassword')
            }
        }
        setMail({
            email:"",
        })
    }
    return(
            <div className="flex items-center justify-center h-[100vh]"> 
               
                <form noValidate onSubmit={onForgot} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-emerald-700  w-96 shadow-[0_0_10px_black]">
                <Link className='absollute top-8 text-2xl link text-accent-300 cursor-pointer' onClick={()=>navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Forgot Password
                    </h1>



                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your Email"
                            onChange={handleUserInput}
                            value={mail.email}
                            className="bg-transparent px-2 py-1 border text-black"
                            />
                    </div>
                    <button type="submit" className="bg-emerald-500 text-black  mt-2 hover:bg-emerald-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>

            </div>
       
    )
}
export default Forgot