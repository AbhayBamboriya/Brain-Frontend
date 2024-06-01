import { BsPersonCircle } from 'react-icons/bs'
// import green from '../assets/green_background.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail } from '../Helper/regexMatcher';
import toast from 'react-hot-toast';
import { createAccount } from '../Redux/Slices/authSlice';

function SignUp(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState('')

    const [signupData,setSignupData]=useState({
        Name:"",
        email:"",
        password:"",
        profile:"",
        UserName:""
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        console.log(name,value);
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
    function getImage(e){
        e.preventDefault();
        // getting the image on login
        const uploadedImage=e.target.files[0]

        if(uploadedImage){
            setSignupData({
                ...signupData,
                profile:uploadedImage
            })
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                // console.log(this.result);
                setPreviewImage(this.result)
            })

        }
    }

    async function createNewAccount(e){
        console.log('called');
        console.log(signupData);
        e.preventDefault();
        if(!signupData.profile || !signupData.email || !signupData.UserName || !signupData.Name || !signupData.password){
            toast   .error('Please fill all the details');
            return
        }

        // checking mane field length
        if(signupData.UserName.length<5){
            toast.error('UserName should be atleast of 5 characters')
            return
        }
        if(signupData.password.length<3){
            toast.error('Password should be atleast of 3 characters')
            return
        }

        // o get email validator regex google-email regex javascript 
        // checking for the valid email
        if(!isEmail(signupData.email)){
            toast.error('Invalid Email Id')
            return
        }

        // cheking password validation
       
        // (/^
        // (?=.*\d)                //should contain at least one digit
        // (?=.*[a-z])             //should contain at least one lower case
        // (?=.*[A-Z])             //should contain at least one upper case
        // [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

        // $/)
        console.log('password',signupData.password);
        // if(signupData.password.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)){
        //     toast.error('Password should contain at least 8 character 1 digit 1 letter and 1 special character')
        //     return
        // }
        
        const formData=new FormData();
        formData.append("Name",signupData.Name)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("profile",signupData.profile)
        formData.append("UserName",signupData.UserName)

        console.log('form data',formData);
        // dispatch creae account action
        const response=await dispatch(createAccount(formData))
        // // going o home page
        console.log('respone- '+response);
        if(response?.payload?.success) navigate('/')
        // clearing all the entry
        setPreviewImage('')
        setSignupData({
            Name:"",
            email:"",
            password:"",
            profile:"",
            UseerName:""
        })



    }



    return (
        <div className="flex items-center justify-center h-[100vh] rounded-lg ">
            <div className="bg-[url('https://www.technocrazed.com/wp-content/uploads/2015/12/Green-Wallpaper-5.jpg')] h-[80vh] w-[30%] rounded-tl-lg rounded-bl-lg flex flex-col items-center justify-center gap-10">
                    <h2 className='text-4xl text-white'>Welcome Back !</h2>
           
                    <p className='text-[20px] text-white' >To keep Connected with us please <br/>   
                        <span className='mx-7'>login with your personal info</span>
                    </p>
                    <button className='bg-transparent border p-20 mt-2 hover:bg-green-900 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer' onClick={()=>navigate('/signin')}>
                        SIGN IN
                    </button>
            </div>
            <div className='rounded-tr-lg rounded-br-lg h-[80vh] w-1/2 border-2 gap-1 flex flex-col items-center'>
                <h1 className='text-3xl font-bold text-emerald-700 mt-10'>Create Account</h1>
                <br/>
                <div className='w-full h-full flex items-center justify-center borer borer-red-300'>
                    <form noValidate className='borer borderred-400 w-[55%] h-full flex flex-col' onSubmit={createNewAccount}>
                        <div className='gap-3 flex flex-col'>
                            <label htmlFor="image_uploads" className="cursor-pointer ">
                                    {previewImage ? (
                                        <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                                    ) : (
                                        <BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>
                                    )}
                            </label>
                            
                            <input 
                                    className="hidden" 
                                    type="file" 
                                    onChange={getImage}
                                    // name through which it will go to server
                                    name="image_uploads"
                                    id="image_uploads"
                                    accept=".jpg,.jpeg,.png,.svg "
                            />
                            
                            <div className="flex flex-col gap-1 w-full brder border-gren-600">
                                {/* <label htmlFor="fullName" className="font-semibold">Name</label> */}
                                <input type="text"
                                    required
                                    name="Name"
                                    id="Name"
                                    placeholder="Enter your name..."
                                    className="bg-transparent px-2 py-1 border"
                                    onChange={handleUserInput}
                                    value={signupData.Name}
                                    />
                            </div>
                            <div className="flex flex-col gap-1 w-full brder border-gren-600">
                                {/* <label htmlFor="fullName" className="font-semibold">Name</label> */}
                                <input type="text"
                                    required
                                    name="UserName"
                                    id="UserName"
                                    placeholder="Enter your Username..."
                                    className="bg-transparent px-2 py-1 border"
                                    onChange={handleUserInput}
                                    value={signupData.UserName}
                                    />
                            </div>
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
                            Create Account
                        </button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
export default SignUp