import { useEffect } from "react";
import { useSelector } from "react-redux";

function Messages({data}){
    const userId=useSelector((state)=>state?.auth?.id)
    // console.log('meskjsjsjfdsjfdjfbbfhb',userId);
    const darkblue='1476ff'
    const light='f9faff'
    const initail='f3f5ff'
    useEffect(()=>{
        userId
    })
    const send='flex flex-col gap-2 h-fit w-[30%] ml-auto mx-4 rounded-br-xl bg-[#1476ff]  rounded-bl-xl rounded-tl-xl bg-white cursor-pointer transition-all ease-in-out duration-300'
    const receive='flex flex-col  gap-2 h-full w-[30%] bg-[#f3f5ff] ml-3 rounded-b-xl rounded-tr-xl cursor-pointer'
    const textareasend='resize-none w-100% h-fit rounded-sm ml-4 bg-transparent text-white'
    const textareareceive='resize-none w-100% h-fit rounded-sm ml-4 '
    let c='';
    let textcss=''
    console.log('data ',data);
    if(userId==data.id){
        c=send
        textcss=textareasend
    }
    else{
        c=receive
        textcss=textareareceive
    }
    // console.log('cccc',`${c}`);
    return(
       <div className={`${c} `}>
            <div className="flex gap-2 mt-3 mb- h-fit ">
                <img 
                    src={data?.url}
                    className="h-7 w-7 ml-4 rounded-full"
                />
                <span>
                    {data?.username}
                </span>
            </div>
            {
                data?.post?.secure_url && data?.post?.secure_url!='cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm' && !data?.message&&
                    <div className="flex items-center rounded-full  justify-center h-full">
                            <img
                        src={data?.post?.secure_url}
                        className="h-35 w-40 rounded-2xl flex items-center justify-center"
                        alt="post"
                    />
                        </div>
            }
            {
                data?.post?.secure_url && data?.post?.secure_url!='cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm' && data?.message &&
                    <img
                        src={data?.post?.secure_url}
                        className="h-40 w-40 rounded-2xl ml-8 mt-2"
                        alt="post"
                    />
            }
            {
                data?.message &&
                    <textarea className="resize-none text-black readOnly  bg-transparent ml-8 mt-2"  value={data?.message}></textarea>
            }
       </div>
    )
}
export default Messages