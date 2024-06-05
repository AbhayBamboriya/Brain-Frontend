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
        OTP:""
    })
    
    const [hide,setHide]=useState(true ? 'hidden':'')

    function show(){
        setHide(
            !hide
        )
    };

    function handleUserInput(e){
        const {name,value}=e.target;
        setMail({
            ...mail,
            [name]:value
        })
    }
    
    const[tokenFromBackend,setTokenFromBackend]=useState('')
    const [otp,setOtp]=useState('')
    async function onForgot(e){
        e.preventDefault();
        
        if(mail.OTP){
            console.log('cccccc');
            console.log(tokenFromBackend);
            console.log(otp);
            console.log('otp entered',mail.OTP);
            if(mail.OTP!=otp.otp){
                return toast.error('Wrong OTP Entered')
            }
            else{
                toast.success('User Verified')
                navigate('/resetPassword')
            }

        }
        else{
            if(!mail.email){
                toast.error('Please fill the details');
                return
            }
    
            console.log('checking ',mail);
            const res=await dispatch(found(mail))
            console.log('res from forgot forgot',res);
            if(res?.payload?.success){
                console.log('reachehheehe');
                const token=await dispatch(forgot(mail))
                // tokenFromBackend=token?.payload?.resetToken
                // otp=token?.payload?.x
                setOtp({
                    otp:token?.payload?.x
                })
                setTokenFromBackend({
                    tokenFromBackend:token?.payload?.resetToken
                })
               console.log('res from forgot password tsting',token);
               console.log('otp',otp);
               console.log('token from baCKEND',tokenFromBackend);
                if(token?.payload?.x){
                    // navigate('/resetPassword')
                    console.log('come heee');
                    toast.success(token?.payload?.message)
                    show()
                }
                console.log('xdoi',mail.OTP);
            
                console.log('break');
            }
        }
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

                    <div className={`flex flex-col gap-1 ${hide}`}>
                        <label htmlFor="email" className="font-semibold">OTP</label>
                        <input type="text"
                            required
                            name="OTP"
                            id="OTP"
                            placeholder="Enter your OTP"
                            onChange={handleUserInput}
                            value={mail.OTP}
                            className="bg-transparent px-2 py-1 border text-black"
                            />
                    </div>  

                    <button type="submit" className="bg-emerald-500 text-black  mt-2 hover:bg-emerald-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        {!hide? 'Submit' :'Generate OTP'}
                    </button>
                </form>

            </div>
       
    )
}
export default Forgot