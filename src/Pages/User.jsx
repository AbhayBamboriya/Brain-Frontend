function User({data}){
    console.log('serrrrrrrrrries',data);

    return(
        <div className="flex gap-2 justify-center items-center h-20 bg-red-100 w-full hover:bg-yellow-900 transition-all ease-in-out duration-300">
            <img
                    className='h-10 w-10 ml-4 rounded-full'
                    src={data?.Profile}
                    alt='Profile'
                />
            <div className="flex flex-col bg-geen-600 w-full">
                    <span className="text-md ">
                        {data.UserName}
                    </span>
                    <span>
                        {data.email}
                    </span>
                
            </div>
        </div>
    )

}
export default User