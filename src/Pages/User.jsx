function User({data}){
    // console.log('serrrrrrrrrries',data);

    return(
        <div className="flex gap-2 justify-center items-center h-20 bg-yellow-100 w-full hover:bg-yellow-900 transition-all ease-in-out duration-300">
            <img
                    className='h-10 w-fit ml-4 rounded-full'
                    src={data?.Profile}
                    alt='Profile'
                />
            <div className="flex flex-col bg--600 w-full">
                    <span className="text-md bg--500 w-fit">
                        {data.UserName}
                    </span>
                    <span className="w-fit bg--600 w-fit">
                        {data.email}
                    </span>
                
            </div>
        </div>
    )

}
export default User