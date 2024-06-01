import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail } from '../Helper/regexMatcher';
import toast from 'react-hot-toast';
import { login } from '../Redux/Slices/authSlice';

function Signin(){
    const dispatch =useDispatch();
    const navigate=useNavigate();

    const [signupData,setSignupData]=useState({

        email:"",
        password:""
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        console.log(name,value);
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
  
    async function signin(e){
        console.log('called');
        console.log(signupData);
        e.preventDefault();
        if(!signupData.email || !signupData.password){
            toast   .error('Please fill all the details');
            return
        }

     

        if(!isEmail(signupData.email)){
            toast.error('Invalid Email Id')
            return
        }

   
        
        const formData=new FormData();
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
     

        console.log('form data',formData);
        console.log(signupData.email);
        console.log(signupData.password);
        // dispatch creae account action
        const response=await dispatch(login(signupData))
        // // going o home page
        console.log('loginnnn');
        console.log('respone- in login'+JSON.stringify(response));
        if(response?.payload?.success) navigate('/')
        // clearing all the entry
        // setPreviewImage('')/
        setSignupData({
            email:"",
            password:"",
        })



    }



    return (
        <div className="flex items-center justify-center h-[100vh] rounded-lg ">
            <div className="bg-[url('https://www.technocrazed.com/wp-content/uploads/2015/12/Green-Wallpaper-5.jpg')] h-[80vh] w-[30%] rounded-tl-lg rounded-bl-lg flex flex-col items-center justify-center gap-10">
                    <h2 className='text-4xl text-white'>Welcome Back !</h2>
           
                    <p className='text-[20px] text-white' >Sign Up to use all the features of app <br/>   
                    </p>
                    <button className='bg-transparent border p-20 mt-2 hover:bg-green-900 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer' onClick={()=>navigate('/signup')}>
                        SIGN UP
                    </button>
            </div>
            <div className='rounded-tr-lg rounded-br-lg h-[80vh] w-1/2 border-2 gap-12 flex flex-col items-center'>
                <h1 className='text-3xl font-bold text-emerald-700 mt-10'>Sign In</h1>
                <br/>
                <div className='w-full h-full flex items-center justify-center brder brder-red-300 mb-60'>
                    <form noValidate className='borer borderred-400 w-[55%] h-full flex flex-col gap-8 ' onSubmit={signin}>
                        <div className='gap-3 flex flex-col'>
                            
                            
                            
                            <div className="flex flex-col gap-1">
                                {/* <label htmlFor="email" className="font-semibold">Email</label> */}
                                <input type="email"
                                    required
                                    name="email"
                                    id="email"
                                    placeholder="Enter your Email"
                                    className="bg-transparent px-2 py-1 border"
                                    onChange={handleUserInput}
                                    value={signupData.email}
                                    />
                            </div>
                            <div className="flex flex-col gap-1">
                                {/* <label htmlFor="password" className="font-semibold">Password</label> */}
                                <input type="password"
                                    required
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="bg-transparent px-2 py-1 border"
                                    onChange={handleUserInput}
                                    value={signupData.password}
                                    />
                            </div>
                        </div>
                        <button type="submit" className='bg-emerald-500 mt-10 p-7  hover:bg-emerald-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer'>
                            Login Account
                        </button>
                        <p className="text-center"> Forgot Password ?  <Link to='/forgot' className="link text-red-600 cursor-pointer hover:underline ">Click Here</Link></p>
                    </form>
                    
                </div>
            </div>
        </div>
    )


}
export default Signin
