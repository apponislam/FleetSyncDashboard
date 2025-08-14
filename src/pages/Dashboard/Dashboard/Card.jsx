import sales from '/sales.svg';

const Card = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-10">
            {/* user */}

            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total User</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    150


                </div>


            </div>

            {/*  */}

            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total Role</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    5


                </div>


            </div>
            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total Reveneu</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    500 $


                </div>


            </div>
            <div className="rounded-[20px] shadow-lg shadow-gray-500 w-full  flex flex-col items-center bg-[#00A430]
                 py-7 px-2 text-[#FFFFFF]">



                <div className="font-medium text-[32px] ">Total Connection</div>

                <div className="flex text-[40px] font-bold items-center justify-between mt-4">
                    100


                </div>


            </div>

        </div>
    );
};

export default Card;
