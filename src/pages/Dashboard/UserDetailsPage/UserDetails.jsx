// import { GoArrowLeft } from "react-icons/go";
// import { useNavigate, useParams } from "react-router-dom";

// const UserDetails = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     console.log(id);

//     const goBack = () => {
//         navigate(-1);
//     };

//     return (
//         <div className="p-4 xl:p-8">
//             <div className="flex items-center gap-2 mb-6">
//                 <span className="text-[#00A430] text-3xl cursor-pointer" onClick={goBack}>
//                     <GoArrowLeft />
//                 </span>
//                 <h1 className="text-[28px] font-medium text-[#000000]">Driver</h1>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                 <div>
//                     <h2 className="text-[#00A430] text-2xl font-medium mb-6">Personal Information</h2>
//                     <div className="bg-white rounded-xl flex flex-col items-center p-6 shadow-sm">
//                         <div className="flex flex-col items-center mb-6">
//                             <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-48 h-48 rounded-xl object-cover" />
//                         </div>

//                         <div className="space-y-3">
//                             {[
//                                 { label: "Name", value: "Alexandra Daddario" },
//                                 { label: "Email", value: "irmabela@gmail.com" },
//                                 { label: "Contact No", value: "(+33) 00 55 59 27" },
//                                 {
//                                     label: "Address",
//                                     value: "Apt. 738 2086 Marianne Parks",
//                                 },
//                                 { label: "Email", value: "irmabela@gmail.com" },
//                             ].map((item, idx) => (
//                                 <div key={idx} className="flex text-lg font-medium">
//                                     <span className="w-28 text-[#252B42]">{item.label}:</span>
//                                     <span className="flex-1 text-[#737373]">{item.value}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 {/* Professional Information */}
//                 <div>
//                     <h2 className="text-[#00A430] text-2xl font-medium mb-6">Professional Information</h2>
//                     <div className="bg-white rounded-xl p-6 shadow-sm">
//                         <div className="space-y-3 text-sm text-[#0B3666] font-medium">
//                             {[
//                                 { label: "Owner Operator", value: "Owner Operator" },
//                                 { label: "Has a owner Trailer", value: "Yes" },
//                                 { label: "Work Experience", value: "3 years" },
//                                 { label: "Total Tasks", value: "25 Tasks" },
//                                 { label: "Accidents or violations", value: "No" },
//                                 { label: "Previous Company", value: "The Truckly" },
//                                 {
//                                     label: "Medical Card Expiration Date",
//                                     value: "27 Jan 2027",
//                                 },
//                             ].map((item, idx) => (
//                                 <div key={idx} className="flex text-lg">
//                                     <span className="w-72 text-[#252B42] ">{item.label}</span>
//                                     <span className="flex-1 text-[#737373]">{item.value}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetails;

import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUserByIdQuery } from "../../../redux/api/userApi";
import getLocationName from "../../../utils/getLocationName";

const UserDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [locationName, setLocationName] = useState("Loading location...");

    const { data: user, isLoading, error } = useGetUserByIdQuery(id);

    console.log(user);

    const goBack = () => {
        navigate(-1);
    };

    // Fetch location name when user data is available
    useEffect(() => {
        if (user?.location?.coordinates) {
            const [lng, lat] = user.location.coordinates;
            if (lat !== 0 && lng !== 0) {
                getLocationName(lat, lng).then(setLocationName);
            } else {
                setLocationName("Location not set");
            }
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="p-4 xl:p-8">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-[#00A430] text-3xl cursor-pointer" onClick={goBack}>
                        <GoArrowLeft />
                    </span>
                    <h1 className="text-[28px] font-medium text-[#000000]">Loading User...</h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <p>Loading user data...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="p-4 xl:p-8">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-[#00A430] text-3xl cursor-pointer" onClick={goBack}>
                        <GoArrowLeft />
                    </span>
                    <h1 className="text-[28px] font-medium text-[#000000]">Error</h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">Error loading user data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 xl:p-8">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[#00A430] text-3xl cursor-pointer" onClick={goBack}>
                    <GoArrowLeft />
                </span>
                <h1 className="text-[28px] font-medium text-[#000000]">{user.role === "driver" ? "Driver" : "User"} Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Personal Information */}
                <div>
                    <h2 className="text-[#00A430] text-2xl font-medium mb-6">Personal Information</h2>
                    <div className="bg-white rounded-xl flex flex-col items-center p-6 shadow-sm">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src={user.profile ? (user.profile.startsWith("http") ? user.profile : `http://10.10.7.26:5001${user.profile}`) : "https://randomuser.me/api/portraits/men/32.jpg"}
                                alt={user.fullName}
                                className="w-48 h-48 rounded-xl object-cover"
                                onError={(e) => {
                                    e.target.src = "https://randomuser.me/api/portraits/men/32.jpg";
                                }}
                            />
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: "Name", value: user.fullName || "N/A" },
                                { label: "Email", value: user.email || "N/A" },
                                { label: "Contact No", value: user.phone || "N/A" },
                                { label: "Address", value: user.address || locationName }, // Use address field if available, otherwise use location
                                { label: "Email", value: user.email || "N/A" },
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
                                { label: "Owner Operator", value: user.ownerOperator ? "Owner Operator" : "Not Owner Operator" },
                                { label: "Has a owner Trailer", value: user.ownTrailer ? "Yes" : "No" },
                                { label: "Work Experience", value: user.workExperience || "N/A" },
                                { label: "Total Tasks", value: "25 Tasks" },
                                { label: "Accidents or violations", value: user.accidentInvolved || "No" },
                                { label: "Previous Company", value: user.previousCompany || "N/A" },
                                { label: "Medical Card Expiration Date", value: "27 Jan 2027" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex text-lg">
                                    <span className="w-72 text-[#252B42]">{item.label}</span>
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
