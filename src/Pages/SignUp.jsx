import { BsPersonCircle } from 'react-icons/bs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail, isValidPassword } from '../Helper/regexMatcher';
import toast from 'react-hot-toast';
import { createAccount, found, found1 } from '../Redux/Slices/authSlice';
import { rule } from 'postcss';

function SignUp(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState('')

    const [signupData,setSignupData]=useState({
        Name:"",
        email:"",
        password:"",
        profile:"",
        UserName:"",
        check:true,
        confirmPassword:""
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        console.log(name,value);
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisiblec, setPasswordVisiblec] = useState(false);

    function togglePasswordVisibility(){
        console.log('REA');
        setPasswordVisible(!passwordVisible);
        console.log('reached');
    };
    function togglePasswordVisibilityc(){
        console.log('REA');
        setPasswordVisiblec(!passwordVisiblec);
        console.log('reached');
    };
    function getImage(e){
        e.preventDefault();
        const uploadedImage=e.target.files[0]

        if(uploadedImage){
            setSignupData({
                ...signupData,
                profile:uploadedImage
            })
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                setPreviewImage(this.result)
            })

        }
    }
    async function check(e){
        e.preventDefault()
        if(!isEmail(signupData.email)){
            toast.error('Invalid Email Id')
            return
        }
        signupData.check=true
        const res=await dispatch(found1(signupData))
        console.log('checking response',res);

    }
    async function createNewAccount(e){
        console.log('called');
        console.log(signupData);
        e.preventDefault();
        // return

        if(checkbox==false){
            toast.error('Please accept terms and condition to proceed further')
            return
        }
        if(!signupData.profile || !signupData.email || !signupData.UserName || !signupData.Name || !signupData.password || !signupData.confirmPassword){
            toast   .error('Please fill all the details');
            return
        }

        if(signupData.UserName.length<5){
            toast.error('UserName should be atleast of 5 characters')
            return
        }
        // if(signupData.password.length<8){
        //     toast.error('Password should be atleast of 8 characters')
        //     return
        // }

        if(!isEmail(signupData.email)){
            toast.error('Invalid Email Id')
            return
        }

        if(signupData.password != signupData.confirmPassword){
            toast.error("Password and Confirm Password didn't match")
            return
        }

        if(!isValidPassword(signupData.password)){
            toast.error('Password should be of 8 character having letter,digits and special character')
            return
        }
        // these verification is for email
        const res=await dispatch(found1(signupData))
        if(res?.payload==undefined){
            return 
        }

        const formData=new FormData();
        formData.append("Name",signupData.Name)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("profile",signupData.profile)
        formData.append("UserName",signupData.UserName)

        console.log('form data',formData);
        const response=await dispatch(createAccount(formData))
        console.log('from sign up',response);
        if(response?.payload?.success) navigate('/main')
        // clearing all the entry
        setPreviewImage('')
        setSignupData({
            Name:"",
            email:"",
            password:"",
            profile:"",
            UserName:""
        })
    }

    const [checkbox,setCheckbox]=useState(false)
    function toggle(){
        setCheckbox(!checkbox)
    }
    return (
        <div className="flex items-center justify-center h-[100vh] rounded-lg ">
            <div className="bg-[url('https://www.technocrazed.com/wp-content/uploads/2015/12/Green-Wallpaper-5.jpg')] h-[80vh] w-[30%] rounded-tl-lg rounded-bl-lg flex flex-col items-center justify-center gap-10">
                    <h2 className='text-4xl text-white'>Welcome !</h2>
           
                    <p className='text-[20px] text-white' >To keep Connected with us please <br/>   
                        <span className='mx-7'>login with your personal info</span>
                    </p>
                    <button className='bg-transparent border p-20 mt-2 hover:bg-green-900 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer' onClick={()=>navigate('/')}>
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
                                    name="image_uploads"
                                    id="image_uploads"
                                    accept=".jpg,.jpeg,.png,.svg "
                            />
                            
                            <div className="flex flex-col gap-1 w-full brder border-gren-600  w-[87%]">
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
                            <div className="flex flex-col gap-1 w-full brder border-gren-600  w-[87%]">
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
                            <div className="flex flex- gap-1  w-[87%]">
                                <input type="email"
                                    required
                                    name="email"
                                    id="email"
                                    placeholder="Enter your Email"
                                    className="bg-transparent px-2 py-1 border w-[100%]"
                                    onChange={handleUserInput}
                                    value={signupData.email}
                                    />
                                {signupData.email && <button className='bg-emerald-500 p-1 text-xs hover:bg-emerald-600 transition-all ease-in-out duration-700 rounded-xl cursor-pointer' onClick={check}> Check Availabilty</button>}
                            </div>
                            <div className="flex flex-wrap gap-1">
                                <input type={passwordVisible ? 'text' : 'password'}
                                    required
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="bg-transparent px-2 py-1 border w-[87%]"
                                    onChange={handleUserInput}
                                    value={signupData.password}
                                    />
                                    <span onClick={togglePasswordVisibility} className='cursor-pointer'>
                                    {passwordVisible ? 'Hide' : 'Show'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                <input type={passwordVisiblec ? 'text' : 'password'}
                                    required
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="bg-transparent px-2 py-1 border w-[87%]"
                                    onChange={handleUserInput}
                                    value={signupData.confirmPassword}
                                    />
                                    <span onClick={togglePasswordVisibilityc} className='cursor-pointer'>
                                    {passwordVisiblec ? 'Hide' : 'Show'}
                                </span>
                            </div>
                            <div>
                               
                                <input type="checkbox" 
                                    required 
                                    name='checkbox' 
                                    checked={checkbox}
                                    onChange={toggle}
                                />
                                 <label> Terms and Condition Applied</label>
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