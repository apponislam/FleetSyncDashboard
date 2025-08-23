// import { Table, ConfigProvider, Spin, Modal } from "antd";
// import { FaFolder } from "react-icons/fa";
// import { useState } from "react";
// import { useGetUsersQuery, useVerifyUserMutation } from "../../../redux/api/userApi";
// import Swal from "sweetalert2";

// const VerificationTable = ({ search, filter }) => {
//     const [pagination, setPagination] = useState({
//         current: 1,
//         pageSize: 10,
//     });

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedCertificates, setSelectedCertificates] = useState([]);

//     const {
//         data: usersData,
//         isLoading,
//         error,
//     } = useGetUsersQuery({
//         page: pagination.current,
//         limit: pagination.pageSize,
//         searchTerm: search,
//         role: filter,
//     });

//     // Status button colors
//     // const statusColor = {
//     //     active: "bg-[#00A430] text-white",
//     //     inactive: "bg-[#FF5C35] text-white",
//     //     pending: "bg-[#FFD857] text-black",
//     //     restricted: "bg-[#FF5C35] text-white",
//     //     accepted: "bg-[#00A430] text-white",
//     //     declined: "bg-[#FF5C35] text-white",
//     // };

//     const statusColor = {
//         approved: "bg-[#00A430] text-white",
//         rejected: "bg-[#FF5C35] text-white",
//         pending: "bg-[#FFD857] text-black",
//     };

//     // Function to handle view button click
//     const handleViewCertificates = (certificates) => {
//         console.log(certificates);
//         setSelectedCertificates(certificates || []);
//         setIsModalOpen(true);
//     };

//     // Function to close modal
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedCertificates([]);
//     };

//     // Function to get complete image URL
//     const getImageUrl = (imagePath) => {
//         if (!imagePath) return "";
//         if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
//             return imagePath;
//         }
//         return `http://10.10.7.26:5001${imagePath}`;
//     };

//     const [verifyUser] = useVerifyUserMutation();

//     const handleStatusClick = async (userId, currentStatus) => {
//         console.log(userId, currentStatus);

//         let action;
//         let actionText;

//         if (currentStatus === "pending") {
//             const { value: selectedAction } = await Swal.fire({
//                 title: "Select Action",
//                 text: "Choose to approve or reject this user",
//                 icon: "question",
//                 showCancelButton: true,
//                 confirmButtonText: "Approve",
//                 cancelButtonText: "Reject",
//                 showDenyButton: true,
//                 denyButtonText: "Cancel",
//                 confirmButtonColor: "#00A430",
//                 cancelButtonColor: "#FF5C35",
//             });

//             if (selectedAction === undefined) return;
//             action = selectedAction ? "approve" : "reject";
//         } else {
//             // Convert from status to action
//             action = currentStatus === "approved" ? "reject" : "approve";
//             actionText = action === "approve" ? "Approve" : "Reject";
//             console.log(actionText);

//             const { isConfirmed } = await Swal.fire({
//                 title: `Are you sure?`,
//                 text: `You are about to ${action} this user.`,
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: `Yes, ${action} it!`,
//                 cancelButtonText: "Cancel",
//                 confirmButtonColor: action === "approve" ? "#00A430" : "#FF5C35",
//             });

//             if (!isConfirmed) return;
//         }

//         try {
//             const result = await verifyUser({
//                 id: userId,
//                 action: action,
//             }).unwrap();
//             console.log(result);

//             Swal.fire({
//                 title: "Success!",
//                 text: `User has been ${action}d successfully.`,
//                 icon: "success",
//                 confirmButtonColor: "#00A430",
//             });
//         } catch (error) {
//             console.error(`Failed to ${action} user:`, error);
//             Swal.fire({
//                 title: "Error!",
//                 text: `Failed to ${action} user. Please try again.`,
//                 icon: "error",
//                 confirmButtonColor: "#FF5C35",
//             });
//         }
//     };

//     // Transform API data to match table structure
//     const tableData =
//         usersData?.data?.map((user, index) => {
//             let status = "pending";

//             if (user.verifiedByAdmin === true) {
//                 status = "approved";
//             } else if (user.verifiedByAdmin === false) {
//                 status = "rejected";
//             }

//             return {
//                 key: user._id || index,
//                 _id: user._id,
//                 name: user.fullName || "No Name",
//                 email: user.email,
//                 phone: user.phone || "+1 XXX-XXX-XXXX",
//                 location: user.address || "Location not specified",
//                 status: status, // Use the converted status
//                 profileImage: user.profile,
//                 role: user.role,
//                 certificates: user.certificates || [],
//                 createdAt: user.createdAt,
//                 isVerifiedByAdmin: user.verifiedByAdmin,
//             };
//         }) || [];

//     const handleTableChange = (newPagination) => {
//         setPagination({
//             current: newPagination.current,
//             pageSize: newPagination.pageSize,
//         });
//     };

//     const columns = [
//         {
//             title: "Name",
//             dataIndex: "name",
//             key: "name",
//             render: (text, record) => (
//                 <div className="flex items-center gap-3">
//                     <img
//                         src={record.profileImage ? (record.profileImage.startsWith("http") ? record.profileImage : `http://10.10.7.26:5001${record.profileImage}`) : "https://i.pravatar.cc/40"}
//                         alt="avatar"
//                         className="w-10 h-10 rounded-full object-cover"
//                         onError={(e) => {
//                             e.target.src = "https://i.pravatar.cc/40";
//                         }}
//                     />
//                     <div>
//                         <span className="font-medium block">{text}</span>
//                         <span className="text-sm text-gray-500">{record.email}</span>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: "Phone",
//             dataIndex: "phone",
//             key: "phone",
//         },
//         {
//             title: "Location",
//             dataIndex: "location",
//             key: "location",
//         },
//         {
//             title: "Role",
//             dataIndex: "role",
//             key: "role",
//             render: (role) => <span className="capitalize font-medium">{role}</span>,
//         },
//         {
//             title: "File Verification",
//             key: "fileVerification",
//             render: (_, record) => (
//                 <div className="flex items-center gap-8">
//                     <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleViewCertificates(record.certificates)}>
//                         <FaFolder className="text-yellow-400 text-xl" />
//                         <button className="text-[#00A3FF] font-medium">View ({record.certificates?.length || 0})</button>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//             key: "status",
//             render: (status, record) => (
//                 <button className={`px-5 py-1 rounded-full font-medium w-24 ${statusColor[status] || statusColor.pending}`} onClick={() => handleStatusClick(record._id, status)}>
//                     {status?.charAt(0).toUpperCase() + status?.slice(1)}
//                 </button>
//             ),
//         },
//     ];

//     if (isLoading) {
//         return (
//             <div className="p-4 flex justify-center items-center h-64">
//                 <Spin size="large" />
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="p-4 text-center text-red-500">Error loading users: {error.message}</div>;
//     }

//     return (
//         <div className="p-4">
//             <ConfigProvider
//                 theme={{
//                     components: {
//                         Table: {
//                             headerColor: "#ffffff",
//                             headerBg: "#00A430",
//                             headerBorderRadius: 12,
//                             headerFontSize: 16,
//                             headerFontWeight: 600,
//                             headerSplitColor: "transparent",
//                             cellPaddingBlock: 14,
//                             cellPaddingInline: 16,
//                             cellBg: "#fff",
//                             cellBorderColor: "#E5E5E5",
//                         },
//                         Pagination: {
//                             colorPrimary: "white",
//                             colorPrimaryHover: "white",
//                             itemActiveBg: "#00A430",
//                             colorTextLightSolid: "#fff",
//                             colorText: "#717179",
//                             itemSize: 32,
//                             borderRadius: 32,
//                         },
//                     },
//                     token: {
//                         colorText: "#333333",
//                         fontSize: 14,
//                     },
//                 }}
//             >
//                 <Table
//                     className="rounded-xl overflow-hidden shadow-md"
//                     dataSource={tableData}
//                     columns={columns}
//                     rowKey="key"
//                     pagination={{
//                         pageSize: pagination.pageSize,
//                         current: pagination.current,
//                         total: usersData?.meta?.total || 0,
//                         showSizeChanger: false, // Disable size changer
//                         position: ["bottomCenter"],
//                         // Simple pagination style
//                         simple: false,
//                         showQuickJumper: false,
//                         showLessItems: false,
//                         showTitle: false,
//                     }}
//                     onChange={handleTableChange}
//                     loading={isLoading}
//                 />
//             </ConfigProvider>

//             {/* Certificate Modal */}
//             <Modal title="Certificates" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800} centered>
//                 {/* <div className="max-h-96 overflow-y-auto">
//                     {selectedCertificates.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                             {selectedCertificates.map((certificate, index) => (
//                                 <div key={index} className="border rounded-lg overflow-hidden">
//                                     <img
//                                         src={getImageUrl(certificate)}
//                                         alt={`Certificate ${index + 1}`}
//                                         className="w-full h-48 object-cover"
//                                         onError={(e) => {
//                                             e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
//                                         }}
//                                     />
//                                     <div className="p-2 bg-gray-100 text-center">
//                                         <span className="text-sm text-gray-600">Certificate {index + 1}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-8 text-gray-500">No certificates found</div>
//                     )}
//                 </div> */}
//                 <div className="max-h-96 overflow-y-auto">
//                     {selectedCertificates.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                             {selectedCertificates.map((certificate, index) => (
//                                 <div key={index} className="border rounded-lg overflow-hidden">
//                                     <div className="w-full h-48 bg-gray-100 relative">
//                                         <img
//                                             src={getImageUrl(certificate)}
//                                             alt={`Certificate ${index + 1}`}
//                                             className="w-full h-48 object-cover"
//                                             onError={(e) => {
//                                                 // Create a fallback image using canvas
//                                                 const canvas = document.createElement("canvas");
//                                                 canvas.width = 300;
//                                                 canvas.height = 200;
//                                                 const ctx = canvas.getContext("2d");

//                                                 // Draw background
//                                                 ctx.fillStyle = "#f3f4f6";
//                                                 ctx.fillRect(0, 0, 300, 200);

//                                                 // Draw text
//                                                 ctx.fillStyle = "#6b7280";
//                                                 ctx.font = "16px Arial";
//                                                 ctx.textAlign = "center";
//                                                 ctx.fillText("Image Not Available", 150, 100);

//                                                 // Set the canvas as image source
//                                                 e.target.src = canvas.toDataURL();
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="p-2 bg-gray-100 text-center">
//                                         <span className="text-sm text-gray-600">Certificate {index + 1}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-8 text-gray-500">No certificates found</div>
//                     )}
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default VerificationTable;

import { Table, ConfigProvider, Spin, Modal } from "antd";
import { FaFolder } from "react-icons/fa";
import { useState } from "react";
import { useGetUsersQuery, useVerifyUserMutation } from "../../../redux/api/userApi";
import Swal from "sweetalert2";

const VerificationTable = ({ search, filter }) => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const {
        data: usersData,
        isLoading,
        error,
    } = useGetUsersQuery({
        page: pagination.current,
        limit: pagination.pageSize,
        searchTerm: search,
        role: filter,
    });

    const statusColor = {
        approved: "bg-[#00A430] text-white",
        rejected: "bg-[#FF5C35] text-white",
        pending: "bg-[#FFD857] text-black",
    };

    // Function to handle view button click
    const handleViewCertificates = (certificates) => {
        console.log(certificates);
        setSelectedCertificates(certificates || []);
        setIsModalOpen(true);
    };

    // Function to close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertificates([]);
    };

    // Function to get complete image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }
        return `http://10.10.7.26:5001${imagePath}`;
    };

    const [verifyUser] = useVerifyUserMutation();

    const handleStatusClick = async (userId, currentStatus) => {
        console.log(userId, currentStatus);

        let action;

        if (currentStatus === "pending") {
            const result = await Swal.fire({
                title: "Select Action",
                text: "Choose to approve or reject this user",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Approve",
                cancelButtonText: "Reject",
                showDenyButton: true,
                denyButtonText: "Cancel",
                confirmButtonColor: "#00A430",
                cancelButtonColor: "#FF5C35",
            });

            if (result.isConfirmed) {
                action = "approve";
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                action = "reject";
            } else {
                return;
            }
        } else {
            action = currentStatus === "approved" ? "reject" : "approve";

            const { isConfirmed } = await Swal.fire({
                title: `Are you sure?`,
                text: `You are about to ${action} this user.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Yes, ${action} it!`,
                cancelButtonText: "Cancel",
                confirmButtonColor: action === "approve" ? "#00A430" : "#FF5C35",
            });

            if (!isConfirmed) return;
        }

        try {
            const result = await verifyUser({
                id: userId,
                action: action,
            }).unwrap();
            console.log(result);

            Swal.fire({
                title: "Success!",
                text: `User has been ${action}d successfully.`,
                icon: "success",
                confirmButtonColor: "#00A430",
            });
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
            Swal.fire({
                title: "Error!",
                text: `Failed to ${action} user. Please try again.`,
                icon: "error",
                confirmButtonColor: "#FF5C35",
            });
        }
    };

    const tableData =
        usersData?.data?.map((user, index) => {
            let status = "pending";

            if (user.verifiedByAdmin === "approved") {
                status = "approved";
            } else if (user.verifiedByAdmin === "rejected") {
                status = "rejected";
            }

            return {
                key: user._id || index,
                _id: user._id,
                name: user.fullName || "No Name",
                email: user.email,
                phone: user.phone || "+1 XXX-XXX-XXXX",
                location: user.address || "Location not specified",
                status: status,
                profileImage: user.profile,
                role: user.role,
                certificates: user.certificates || [],
                createdAt: user.createdAt,
                verifiedByAdmin: user.verifiedByAdmin, // Keep original for debugging
            };
        }) || [];

    // Debug: Check the actual API response structure
    console.log("API Response:", usersData);
    console.log("First user:", usersData?.data?.[0]);
    console.log("verifiedByAdmin field:", usersData?.data?.[0]?.verifiedByAdmin);

    const handleTableChange = (newPagination) => {
        setPagination({
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.profileImage ? (record.profileImage.startsWith("http") ? record.profileImage : `http://10.10.7.26:5001${record.profileImage}`) : "https://i.pravatar.cc/40"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                            e.target.src = "https://i.pravatar.cc/40";
                        }}
                    />
                    <div>
                        <span className="font-medium block">{text}</span>
                        <span className="text-sm text-gray-500">{record.email}</span>
                    </div>
                </div>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => <span className="capitalize font-medium">{role}</span>,
        },
        {
            title: "File Verification",
            key: "fileVerification",
            render: (_, record) => (
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleViewCertificates(record.certificates)}>
                        <FaFolder className="text-yellow-400 text-xl" />
                        <button className="text-[#00A3FF] font-medium">View ({record.certificates?.length || 0})</button>
                    </div>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <button className={`px-5 py-1 rounded-full font-medium w-28 ${statusColor[status] || statusColor.pending}`} onClick={() => handleStatusClick(record._id, status)}>
                    {status?.charAt(0).toUpperCase() + status?.slice(1)}
                </button>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="p-4 flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error loading users: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerColor: "#ffffff",
                            headerBg: "#00A430",
                            headerBorderRadius: 12,
                            headerFontSize: 16,
                            headerFontWeight: 600,
                            headerSplitColor: "transparent",
                            cellPaddingBlock: 14,
                            cellPaddingInline: 16,
                            cellBg: "#fff",
                            cellBorderColor: "#E5E5E5",
                        },
                        Pagination: {
                            colorPrimary: "white",
                            colorPrimaryHover: "white",
                            itemActiveBg: "#00A430",
                            colorTextLightSolid: "#fff",
                            colorText: "#717179",
                            itemSize: 32,
                            borderRadius: 32,
                        },
                    },
                    token: {
                        colorText: "#333333",
                        fontSize: 14,
                    },
                }}
            >
                <Table
                    className="rounded-xl overflow-hidden shadow-md"
                    dataSource={tableData}
                    columns={columns}
                    rowKey="key"
                    pagination={{
                        pageSize: pagination.pageSize,
                        current: pagination.current,
                        total: usersData?.meta?.total || 0,
                        showSizeChanger: false,
                        position: ["bottomCenter"],
                        simple: false,
                        showQuickJumper: false,
                        showLessItems: false,
                        showTitle: false,
                    }}
                    onChange={handleTableChange}
                    loading={isLoading}
                />
            </ConfigProvider>

            {/* Certificate Modal */}
            <Modal title="Certificates" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800} centered>
                <div className="max-h-96 overflow-y-auto">
                    {selectedCertificates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {selectedCertificates.map((certificate, index) => (
                                <div key={index} className="border rounded-lg overflow-hidden">
                                    <div className="w-full h-48 bg-gray-100 relative">
                                        <img
                                            src={getImageUrl(certificate)}
                                            alt={`Certificate ${index + 1}`}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                const canvas = document.createElement("canvas");
                                                canvas.width = 300;
                                                canvas.height = 200;
                                                const ctx = canvas.getContext("2d");
                                                ctx.fillStyle = "#f3f4f6";
                                                ctx.fillRect(0, 0, 300, 200);
                                                ctx.fillStyle = "#6b7280";
                                                ctx.font = "16px Arial";
                                                ctx.textAlign = "center";
                                                ctx.fillText("Image Not Available", 150, 100);
                                                e.target.src = canvas.toDataURL();
                                            }}
                                        />
                                    </div>
                                    <div className="p-2 bg-gray-100 text-center">
                                        <span className="text-sm text-gray-600">Certificate {index + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No certificates found</div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default VerificationTable;
