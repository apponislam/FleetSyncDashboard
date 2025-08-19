import { useGetGeneralStatsQuery } from "../../../redux/api/generalStatsApi";



const Card = () => {

     const { data, error, isLoading } = useGetGeneralStatsQuery();
      if (isLoading) return <p className="">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    console.log(data, "data from general stats");
    console.log(error, "error from general stats");
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-10">
          

            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total User</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    {data?.totalUser}


                </div>


            </div>

            {/*  */}

            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total Role</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    {data?.activeRole?.length
}


                </div>


            </div>
            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total Reveneu</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    {data?.totalRevenue}


                </div>


            </div>
            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total Connection</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    {data?.totalConnection}


                </div>


            </div>

        </div>
    );
};

export default Card;
