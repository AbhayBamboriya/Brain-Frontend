import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { resetPassword } from "../Redux/Slices/authSlice";
import { isValidPassword } from "../Helper/regexMatcher";
import toast from "react-hot-toast";

function Reset(){
    const t=4
    const state=useLocation()
    const url= useSelector((state)=>state?.auth?.resetPasswordUrl)
    const [passwordw ,setPassword]=useState({
        password:"",
        url:url
    })
    
   
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    function handleUserInput(e){
        const {name,value}=e.target;
        
        setPassword({
            ...passwordw,
            [name]:value
        })
    }

    const [passwordVisible, setPasswordVisible] = useState(false);

    function togglePasswordVisibility(){
        console.log('REA');
        setPasswordVisible(!passwordVisible);
        console.log('reached');
    };
    async function onReset(e){
        e.preventDefault()
        console.log('try');
        if(!passwordw.password ){
            toast.error('All Feilds are required');
            return
        }
        if(!isValidPassword(passwordw.password)){
            toast.error('Password should be of 8 character having letter,digits and special character')
            return
        }

        const res=await dispatch(resetPassword(passwordw))
        console.log('response from resetppassword',res);
        if(res?.payload?.success){
            navigate('/')
        }
    }

    
    return(
             <div className="flex items-center justify-center h-[100vh]"> 
                <form noValidate onSubmit={onReset} className="flex flex-col justify-center gap-3 text-emerald-700  rounded-lg p-4  w-96 shadow-[0_0_10px_black]">
                <Link className='absollute top-8 text-2xl link text-accent-300 cursor-pointer' onClick={()=>navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Reset Your Password
                    </h1>



                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Password</label>
                        <div className="flex flex-wrap gap-2">
                            <input type={passwordVisible ? 'text' : 'password'}
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your Password"
                                className="bg-transparent px-2 py-1 border text-black w-[85%]"
                                onChange={handleUserInput}
                                value={passwordw.password}
                                />

                            <span onClick={togglePasswordVisibility} className='cursor-pointer'>
                                        {passwordVisible ? 'Hide' : 'Show'}
                            </span>
                        </div>

                    </div>
                    <button type="submit" className="bg-emerald-500 mt-2 text-black hover:bg-emerald-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>

                </form>

            </div>
    )

}

export default Reset