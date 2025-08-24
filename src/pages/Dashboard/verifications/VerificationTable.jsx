import { Table, ConfigProvider, Spin, Modal, Button } from "antd";
import { FaFolder } from "react-icons/fa";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetUsersQuery, useVerifyUserMutation } from "../../../redux/api/userApi";
import Swal from "sweetalert2";

const VerificationTable = ({ search, filter }) => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSliderModalOpen, setIsSliderModalOpen] = useState(false);
    const [selectedCertificates, setSelectedCertificates] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    // Function to open slider modal with specific image
    const handleOpenSlider = (index) => {
        setCurrentImageIndex(index);
        setIsSliderModalOpen(true);
    };

    // Function to close modals
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertificates([]);
    };

    const handleCloseSliderModal = () => {
        setIsSliderModalOpen(false);
        setCurrentImageIndex(0);
    };

    // Navigation functions for slider
    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === selectedCertificates.length - 1 ? 0 : prevIndex + 1));
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedCertificates.length - 1 : prevIndex - 1));
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
                denyButtonColor: "#6B7280",
                customClass: {
                    actions: "swal2-actions-reverse", // Custom class for additional styling if needed
                },
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
                verifiedByAdmin: user.verifiedByAdmin,
            };
        }) || [];

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
            {/* First Modal - Certificate Grid (Original) */}
            <Modal title="Certificates" open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800} centered>
                <div className="max-h-96 overflow-y-auto">
                    {selectedCertificates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {selectedCertificates.map((certificate, index) => (
                                <div key={index} className="border rounded-lg overflow-hidden cursor-pointer">
                                    <div className="w-full h-48 bg-gray-100 relative" onClick={() => handleOpenSlider(index)}>
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
            {/* Second Modal - Image Slider (New) */}
            {/* <Modal open={isSliderModalOpen} onCancel={handleCloseSliderModal} footer={null} width="90%" style={{ maxWidth: 800 }} centered>
                <div className="relative">
                   
                    {selectedCertificates.length > 1 && (
                        <>
                            <Button icon={<LeftOutlined />} onClick={goToPrevious} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100" size="large" />
                            <Button icon={<RightOutlined />} onClick={goToNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100" size="large" />
                        </>
                    )}

                    <div className="flex justify-center items-center min-h-[400px]">
                        <img
                            src={getImageUrl(selectedCertificates[currentImageIndex])}
                            alt={`Certificate ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[400px] object-contain"
                            onError={(e) => {
                                const canvas = document.createElement("canvas");
                                canvas.width = 600;
                                canvas.height = 400;
                                const ctx = canvas.getContext("2d");
                                ctx.fillStyle = "#f3f4f6";
                                ctx.fillRect(0, 0, 600, 400);
                                ctx.fillStyle = "#6b7280";
                                ctx.font = "20px Arial";
                                ctx.textAlign = "center";
                                ctx.fillText("Image Not Available", 300, 200);
                                e.target.src = canvas.toDataURL();
                            }}
                        />
                    </div>

                    {selectedCertificates.length > 1 && (
                        <div className="text-center mt-4 text-gray-600">
                            {currentImageIndex + 1} / {selectedCertificates.length}
                        </div>
                    )}
                </div>
            </Modal> */}
            <Modal
                open={isSliderModalOpen}
                onCancel={handleCloseSliderModal}
                footer={null}
                width="100%"
                style={{
                    top: 0,
                    padding: 0,
                    margin: 0,
                }}
                bodyStyle={{
                    padding: 0,
                    margin: 0,
                }}
                className="p-0 m-0"
                closable={false}
            >
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                    {/* Close Button */}
                    <button onClick={handleCloseSliderModal} className="absolute top-4 right-4 z-50 text-white bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700">
                        <CloseOutlined />
                    </button>

                    {/* Navigation Arrows */}
                    {selectedCertificates.length > 1 && (
                        <>
                            {/* <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white text-2xl bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700">
                                <LeftOutlined />
                            </button>
                            <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white text-2xl bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700">
                                <RightOutlined />
                            </button> */}
                            <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700">
                                <LeftOutlined className="text-sm" />
                            </button>
                            <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700">
                                <RightOutlined className="text-sm" />
                            </button>
                        </>
                    )}

                    {/* Current Image */}
                    <img
                        src={getImageUrl(selectedCertificates[currentImageIndex])}
                        alt={`Certificate ${currentImageIndex + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onError={(e) => {
                            const canvas = document.createElement("canvas");
                            canvas.width = 800;
                            canvas.height = 600;
                            const ctx = canvas.getContext("2d");
                            ctx.fillStyle = "#1a1a1a";
                            ctx.fillRect(0, 0, 800, 600);
                            ctx.fillStyle = "white";
                            ctx.font = "20px Arial";
                            ctx.textAlign = "center";
                            ctx.fillText("Image Not Available", 400, 300);
                            e.target.src = canvas.toDataURL();
                        }}
                    />

                    {/* Image Counter */}
                    {selectedCertificates.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg">
                            {currentImageIndex + 1} / {selectedCertificates.length}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default VerificationTable;
