import { GoArrowLeft } from "react-icons/go";

const UserDetails = () => {
    return (
        <div className="p-4 xl:p-8">
            {/* Back button + Title */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[#00A430] text-3xl cursor-pointer">
                    {" "}
                    <GoArrowLeft />
                </span>
                <h1 className="text-[28px] font-medium text-[#000000]">Driver</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Personal Information */}{" "}
                <div>
                    <h2 className="text-[#00A430] text-2xl font-medium mb-6">Personal Information</h2>
                    <div className="bg-white rounded-xl flex flex-col items-center p-6 shadow-sm">
                        <div className="flex flex-col items-center mb-6">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-48 h-48 rounded-xl object-cover" />
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: "Name", value: "Alexandra Daddario" },
                                { label: "Email", value: "irmabela@gmail.com" },
                                { label: "Contact No", value: "(+33) 00 55 59 27" },
                                {
                                    label: "Address",
                                    value: "Apt. 738 2086 Marianne Parks",
                                },
                                { label: "Email", value: "irmabela@gmail.com" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex text-lg font-medium">
                                    <span className="w-28 text-[#252B42]">{item.label}:</span>
                                    <span className="flex-1 text-[#737373]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Professional Information */}
                <div>
                    <h2 className="text-[#00A430] text-2xl font-medium mb-6">Professional Information</h2>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="space-y-3 text-sm text-[#0B3666] font-medium">
                            {[
                                { label: "Owner Operator", value: "Owner Operator" },
                                { label: "Has a owner Trailer", value: "Yes" },
                                { label: "Work Experience", value: "3 years" },
                                { label: "Total Tasks", value: "25 Tasks" },
                                { label: "Accidents or violations", value: "No" },
                                { label: "Previous Company", value: "The Truckly" },
                                {
                                    label: "Medical Card Expiration Date",
                                    value: "27 Jan 2027",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex text-lg">
                                    <span className="w-52 text-[#252B42] ">{item.label}</span>
                                    <span className="flex-1 text-[#737373]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
