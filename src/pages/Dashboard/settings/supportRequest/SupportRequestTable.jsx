import { Table, ConfigProvider, Modal, message } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteSupportTicketMutation, useGetSupportTicketsQuery, useUpdateSupportTicketMutation } from "../../../../redux/features/settings/settingsApi";

const SupportRequestTable = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading, refetch } = useGetSupportTicketsQuery({
        page,
        limit,
    });

    const [updateSupportTicket, { isLoading: isUpdating }] = useUpdateSupportTicketMutation();
    const [deleteSupportTicket, { isLoading: isDeleting }] = useDeleteSupportTicketMutation();

    console.log("Loading:", isLoading);
    console.log("Data:", data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [reply, setReply] = useState("");

    const handleOpen = (record) => {
        setSelectedRequest(record);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
        setReply("");
    };

    const handleSendResponse = async () => {
        if (!selectedRequest || !reply.trim()) {
            message.error("Please enter a response");
            return;
        }

        try {
            await updateSupportTicket({
                id: selectedRequest.originalData._id,
                comment: reply,
                status: "closed",
            }).unwrap();

            toast.success("Response sent successfully");
            refetch();
            handleClose();
        } catch (error) {
            console.error("Failed to send response:", error);
            message.error("Failed to send response");
        }
    };

    const handleDeleteTicket = async () => {
        if (!selectedRequest) return;

        try {
            await deleteSupportTicket(selectedRequest.originalData._id).unwrap();

            toast.success("Ticket deleted successfully");
            refetch();
            handleClose();
        } catch (error) {
            console.error("Failed to delete ticket:", error);
            message.error("Failed to delete ticket");
        }
    };

    const statusColor = {
        closed: "bg-[#00A430] text-white",
        open: "bg-[#FF9F0A] text-white",
        pending: "bg-[#FF9F0A] text-white",
        declined: "bg-[#FF3B30] text-white",
        solved: "bg-[#00A430] text-white",
        submit: "bg-[#34C759] text-white",
    };

    // Format API data for table
    const formatSupportData = () => {
        if (!data?.supports) return [];

        return data.supports.map((support, index) => ({
            key: support._id || index,
            user: support.reporter?.fullName || support.reporter?.name || "Unknown User",
            phone: support.reporter?.phone || "N/A",
            description: support.message?.substring(0, 50) + (support.message?.length > 50 ? "..." : ""),
            status: support.status || "pending",
            date: new Date(support.createdAt).toLocaleDateString(),
            message: support.message,
            comment: support.comment,
            reporter: support.reporter,
            createdAt: support.createdAt,
            originalData: support,
        }));
    };

    const columns = [
        {
            title: "User Name",
            dataIndex: "user",
            key: "user",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.reporter?.profile || "https://i.pravatar.cc/40"}
                        alt="user-avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                            e.target.src = "https://i.pravatar.cc/40";
                        }}
                    />
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Problem Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) => <span className={`px-4 py-1 rounded-lg text-sm font-medium ${statusColor[record.status] || "bg-gray-300 text-gray-700"}`}>{record.status?.charAt(0).toUpperCase() + record.status?.slice(1)}</span>,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <button onClick={() => handleOpen(record)} className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                    <FiEdit2 className="text-[#00A430] text-lg" />
                </button>
            ),
        },
    ];

    return (
        <div className="p-4">
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerColor: "#ffffff",
                            headerBg: "#00A430",
                            headerBorderRadius: 18,
                            headerFontSize: 16,
                            headerFontWeight: 600,
                            headerSplitColor: "transparent",
                            cellPaddingBlock: 14,
                            cellPaddingInline: 16,
                            cellBg: "#fff",
                            cellBorderColor: "#E5E5E5",
                            cellBorderRadius: 8,
                        },
                        Pagination: {
                            itemActiveBg: "#00A430",
                            itemActiveColor: "#fff",
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
                    dataSource={formatSupportData()}
                    columns={columns}
                    rowKey="key"
                    loading={isLoading}
                    pagination={{
                        current: data?.meta?.page || page,
                        pageSize: data?.meta?.limit || limit,
                        total: data?.meta?.total || 0,
                        showSizeChanger: false,
                        onChange: (newPage, newPageSize) => {
                            setPage(newPage);
                            if (newPageSize) setLimit(newPageSize);
                        },
                        position: ["bottomCenter"],
                    }}
                />
            </ConfigProvider>

            {/* Modal */}
            <Modal open={isModalOpen} onCancel={handleClose} footer={null} centered className="rounded-xl" width={600}>
                {selectedRequest && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6 text-[#333333]">Support Request Details</h2>

                        <div className="mb-5 flex gap-x-6">
                            <div>
                                <span className="font-semibold block mb-1">From:</span>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={selectedRequest.reporter?.profile || "https://i.pravatar.cc/40"}
                                        alt="user-avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://i.pravatar.cc/40";
                                        }}
                                    />
                                    <span>{selectedRequest.user}</span>
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block mb-1">Date:</span>
                                <span>{selectedRequest.date}</span>
                            </div>
                            <div>
                                <span className="font-semibold block mb-1">Status:</span>
                                <span className={`px-2 py-1 rounded text-xs ${statusColor[selectedRequest.status] || "bg-gray-300"}`}>{selectedRequest.status?.charAt(0).toUpperCase() + selectedRequest.status?.slice(1)}</span>
                            </div>
                        </div>

                        <div className="mb-4 p-3 bg-gray-50 rounded-md">
                            <p className="font-semibold mb-2">User's Message:</p>
                            <p className="text-gray-700">{selectedRequest.message}</p>
                        </div>

                        {selectedRequest.comment && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-md">
                                <p className="font-semibold mb-2">Previous Comment:</p>
                                <p className="text-gray-700">{selectedRequest.comment}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Your Reply:</label>
                            <textarea placeholder="Type your response here..." value={reply} onChange={(e) => setReply(e.target.value)} className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500" rows={4} />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={handleDeleteTicket} disabled={isDeleting} className="px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                            <button onClick={handleSendResponse} disabled={isUpdating} className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isUpdating ? "Sending..." : "Send Response"}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SupportRequestTable;
