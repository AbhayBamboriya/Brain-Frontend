import { useEffect, useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {  detail, logout, refresh } from '../Redux/Slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allUser, post } from '../Redux/Slices/userSlice'
import { IoSend } from "react-icons/io5";
import User from './User'
import { message } from '../Redux/Slices/messageSlice'
import Messages from './Message'
import toast from 'react-hot-toast'
// import Messages from './Message'
// import messageSlice from '../Redux/Slices/messageSlice'

function MainPage(){
    let w=0
    const [width,setWidth]=useState('0')
    const [user,setUser]=useState({ })
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userId=useSelector((state)=>state?.auth?.id)
    // console.log('user id',userId);
    const id=userId
    // console.log('iddd',id);
    const userList=useSelector((state)=>state?.user)
    const messages=useSelector((state)=>state?.message)
    const[postData,setPostData]=useState({
        message:'',
        post:'',
        id:''
    })
    function handleUserInput(e){
        const {name,value}=e.target;
        console.log(name,value);
        setPostData({
            ...postData,
            [name]:value
        })
    }

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

    async function onSubmit(e){
        // console.log(e);
        e.preventDefault();
        console.log('inputtttt',postData.message);

        if(!postData.message){
            toast.error('Message is required')
            return
        }

        postData.id=id
        const res=await dispatch(post(postData))
        console.log('response from bacckend',res);
        if(res?.payload?.success)   Allmessages()
        setPostData({
            message:"",
            post:""
        })
    }

    function changeWidth(){
        if(width=='0'){
            setWidth('100')
        }
        else{
            setWidth('0')
        }
        console.log(width);
    }

    async function information(){
        await dispatch(refresh())
    }
    async function allUsers(){
        const res=await dispatch(allUser(userId));
    }
    
    async function Allmessages(){
        const res=await dispatch(message())  
    }
    useEffect(()=>{
        allUsers(),
        Allmessages()
        information()
    },[])
    async function Logout(){
        const res=await dispatch(logout())
        if(res?.payload?.success){
            navigate('/')
        }

    }
    return (    
        <div className="h-screen bg-red-200 flex w-screen scroll-smooth">
            <div className="drawer absolute ml-3 h-full w-1/6 bg-yellw-300">
                <input className="drawer-toggle hidden" id="my-drawer" type="checkbox"/>
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relatuve">
                        <FiMenu
                            size={"32px"}
                            className='font-bold text-emerald-500 m-4'
                            onClick={changeWidth}
                        />
                    </label>    
                </div>
                <div className={`w-${width} bg-green-800 overflow-hidden h-[8%] gap-2 rounded-md flex justify-center items-center  transition-all ease-in-out duration-7`}>
                    <button className='border border-yellow-500 px-5 py-1 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-3' onClick={Logout}>
                        Logout
                    </button>
                    <button className='border border-yellow-500 px-5 py-1 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-3'>
                        Profile
                    </button>
                </div>
            </div>
            <div className='bg-red-100 mt-20 w-1/4 flex flex-wrap gap-0 items-center justify-center overflow-scroll-y overflow-scroll'>
                <h2 className='text-xl font-bold mt-2 '>ALL USERS</h2>
                {/* {console.log('checking lengyht',userList.userData.length)} */}
                {userList.userData.length>0 &&
                    <div>
                       { userList.userData?.map((element)=>{
                            return <User key={element.email} data={element}/>
                        })}
                    </div>}

            </div>
            <div className='items-center bg-blue-100 w-full flex flex-col items-center '>
                <h1 className='text-center italic text-5xl text-red-500 z-0.3'>Messages</h1>
                <div className='h-[85%] bg-orange-100 w-full gap-3 flex flex-col overflow-scroll'>
                        {
                            messages.messageData.map((message)=>{
                                return <Messages data={message} key={message._id}/>
                            })
                        }
                        
                </div>
                <div className='mt-3 bg-reen-600 w-full h-[5%] flex justify-center items-center gap-3'>
                   
                    <input type="text"
                                    required
                                    name="message"
                                    id="message"
                                    placeholder="Enter your Message"
                                    className="px-2 py-1 border w-[60%] h-full"
                                    onChange={handleUserInput}
                                    value={postData.message}
                                    />

                        <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer'>

                             <IoSend className='text-2xl' onClick={onSubmit}/>
                        </a>
                </div>
            </div>
        </div>
    )
}
export default MainPage