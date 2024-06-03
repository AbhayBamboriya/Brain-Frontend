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
    // console.log('checkIIII',data.id);
    const send='flex flex-col gap-2 h-fit w-[30%] ml-auto mx-4 rounded-br-xl bg-dark-blue  rounded-bl-xl rounded-tl-xl bg-white cursor-pointer transition-all ease-in-out duration-300'
    const receive='flex flex-col  gap-2 h-full w-[30%] bg-[#f3f5ff] ml-3 rounded-b-xl rounded-tr-xl cursor-pointer'
    const textareasend='resize-none w-100% h-fit rounded-sm ml-4 bg-transparent text-white'
    const textareareceive='resize-none w-100% h-fit rounded-sm ml-4 '
    let c='';
    let textcss=''
    
    if(userId!=data.id){
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
            <div className="flex gap-2 mt-3">
                <img 
                    src={data?.url}
                    className="h-7 w-7 ml-4 rounded-full"
                />
                <span>
                    {data?.username}
                </span>
            </div>
            {
                data?.post?.secure_url && 
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