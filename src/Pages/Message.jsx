import { useSelector } from "react-redux";

function Messages({data}){
    const userId=useSelector((state)=>state?.auth?.id)
    console.log('abha',data);
    const darkblue='1476ff'
    const light='f9faff'
    const initail='f3f5ff'
    
    console.log('checkIIII',userId);
    const send='flex flex-col gap-2 h-fit w-[30%] bg-[#1476ff] ml-auto mx-2 rounded-br-xl rounded-bl-xl rounded-tl-xl bg-white cursor-pointer transition-all ease-in-out duration-300'
    const receive='flex flex-col gap-2 h-fit w-[30%] bg-[#${initail}] ml-2 rounded-b-xl rounded-tr-xl bg-white cursor-pointer transition-all ease-in-out duration-300';
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
    console.log('cccc',`${c}`);
    return(
        <div className={`${c}`}>
            <div className="flex mt-2 gap-2">
                <img
                        className='h-5 w-5 ml-4 rounded-full'
                        src={data?.url}
                        alt='User Profile'
                />
                <span className="text-sm bg--500 ">
                    {data?.username}
                </span> 
            </div>
            {data?.post?.secure_url &&
                <img
                className='h-40 w-40 ml-4 rounded-2xl mt-3'
                src={data?.post?.secure_url}
                alt='Post'
        />
            }
            {data?.message &&
             <textarea className={`${textcss}`} value={data?.message}></textarea>
            }
            
        </div>
    )
}
export default Messages