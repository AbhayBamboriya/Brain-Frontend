import { useEffect, useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {  logout } from '../Redux/Slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allUser } from '../Redux/Slices/userSlice'
import User from './User'

function MainPage(){
    let w=0
    const [width,setWidth]=useState('0')
    const [user,setUser]=useState({ })
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userId=useSelector((state)=>state?.auth?.id)
    const userList=useSelector((state)=>state?.user)
    console.log('first user data',userList.userData);
    console.log('checkddfdfi',useSelector((state)=>state?.user));
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
        console.log('all users',res);
        console.log('userListtt',userList);
        // res.map((user)=>{
        //     setUser(
        //         ...user,
        //         email-res?.payload?.user?.email

        //     )
        // })
    }
    
    useEffect(()=>{
        allUsers()
    },[])
    // console.log('usersss',JSON.stringify(user));
    async function Logout(){
        const res=await dispatch(logout())
        console.log('res from logout',res);
        if(res?.payload?.success){
            navigate('/signin')
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
                {/* {console.log('length',userList.length)} */}
                {console.log('userList',userList)}
                <div className={`w-${width} bg-green-800 overflow-hidden h-[8%] gap-2 rounded-md flex justify-center items-center  transition-all ease-in-out duration-7`}>
                    <button className='border border-yellow-500 px-5 py-1 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-3' onClick={Logout}>
                        Logout
                    </button>
                    <button className='border border-yellow-500 px-5 py-1 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-3'>
                        Profile
                    </button>
                </div>
            </div>
            <div className='bg-red-100 mt-20 w-1/5 flex flex-wrap gap-0 items-center justify-center overflow-scroll-y overflow-scroll'>
                <h2 className='text-xl font-bold mt-2 '>ALL USERS</h2>
                {/* {console.log('checking lengyht',userList.userData.length)} */}
                {userList.userData.length>0 &&
                    <div>
                       { userList.userData?.map((element)=>{
                            return <User key={element.email} data={element}/>
                        })}
                    </div>}

            </div>
        </div>
    )
}
export default MainPage