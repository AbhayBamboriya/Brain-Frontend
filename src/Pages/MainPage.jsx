import { useEffect, useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {  logout } from '../Redux/Slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allUser } from '../Redux/Slices/userSlice'
import { IoSend } from "react-icons/io5";
import User from './User'
import { message } from '../Redux/Slices/messageSlice'
import Messages from './Message'
// import Messages from './Message'
// import messageSlice from '../Redux/Slices/messageSlice'

function MainPage(){
    let w=0
    const [width,setWidth]=useState('0')
    const [user,setUser]=useState({ })
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userId=useSelector((state)=>state?.auth?.id)
    console.log('user id',userId);
    const userList=useSelector((state)=>state?.user)
    const messages=useSelector((state)=>state?.message)

    function changeWidth(){
        if(width=='0'){
            setWidth('100')
        }
        else{
            setWidth('0')
        }
        console.log(width);
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
                <div className='mt-3 bg-green-600 w-full h-[5%] flex justify-center items-center gap-3'>
                    <input type="text" 
                        className='w-1/2 rounded-xl p-2'/>
                        

                        <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer'>

                             <IoSend className='text-2xl'/>
                        </a>
                </div>
            </div>
        </div>
    )
}
export default MainPage