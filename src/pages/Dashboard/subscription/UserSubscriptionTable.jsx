// import { Table, Space, ConfigProvider } from "antd";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { useEffect, useState } from "react";
// import UserSubscriptionDetailsModal from "../../../Components/modal/UserSubscriptionDetailsModal";
// import { useGetSubscribedUsersQuery } from "../../../redux/features/subscription/subscriptionApi";

// const UserSubscriptionTable = ({ searchTerm = "", roleFilter = "" }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);

//     const { data, isLoading, error, refetch } = useGetSubscribedUsersQuery({
//         page,
//         limit,
//         ...(searchTerm && { searchTerm }),
//         ...(roleFilter && { role: roleFilter }),
//     });

//     useEffect(() => {
//         refetch();
//     }, [searchTerm, roleFilter, refetch]);

//     const handleOpen = (user) => {
//         setSelectedUser(user);
//         setIsModalOpen(true);
//     };

//     const handleClose = () => {
//         setIsModalOpen(false);
//         setSelectedUser(null);
//     };

//     const statusColor = {
//         Paid: "bg-[#00A430]",
//         Free: "bg-[#FFD857]",
//         active: "bg-[#00A430]",
//         inactive: "bg-[#FFD857]",
//         none: "bg-gray-400",
//         premium: "bg-purple-500",
//     };

//     // Transform API data to table format
//     const formatUserData = () => {
//         if (!data?.data) return [];

//         return data.data.map((user, index) => ({
//             key: user._id || index,
//             date: new Date(user.createdAt).toLocaleDateString(),
//             name: user.fullName || user.name || "Unknown User",
//             phone: user.phone || "N/A",
//             paymentId: user.stripeCustomerId ? `#${user.stripeCustomerId}` : "N/A",
//             package: user.subscriptionTier === "free" ? "Free" : `${user.subscriptionTier}/month`,
//             status: user.subscriptionStatus || "none",
//             subscriptionExpiresAt: user.subscriptionExpiresAt,
//             email: user.email,
//             role: user.role,
//             originalData: user,
//         }));
//     };

//     const columns = [
//         {
//             title: "Date",
//             dataIndex: "date",
//             key: "date",
//         },
//         {
//             title: "Name",
//             dataIndex: "name",
//             key: "name",
//             render: (text, record) => (
//                 <div className="flex items-center gap-3">
//                     <img
//                         src={record.originalData?.profile ? (record.originalData.profile.startsWith("http") ? record.originalData.profile : `http://10.10.7.26:5001${record.originalData.profile}`) : "https://i.pravatar.cc/40"}
//                         alt="avatar"
//                         className="w-12 h-12 rounded-full object-cover"
//                         onError={(e) => {
//                             e.target.src = "https://i.pravatar.cc/40";
//                         }}
//                     />
//                     <span>{text}</span>
//                 </div>
//             ),
//         },
//         {
//             title: "Phone",
//             dataIndex: "phone",
//             key: "phone",
//         },
//         {
//             title: "Payment ID",
//             dataIndex: "paymentId",
//             key: "paymentId",
//         },
//         {
//             title: "Package",
//             dataIndex: "package",
//             key: "package",
//         },
//         {
//             title: "Status",
//             key: "status",
//             render: (_, record) => <span className={`px-4 py-2 w-[120px] flex items-center justify-center rounded-lg text-white font-medium ${statusColor[record.status] || "bg-gray-400"}`}>{record.status}</span>,
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//                 <Space>
//                     <button onClick={() => handleOpen(record.originalData)}>
//                         <MdOutlineRemoveRedEye className="text-[#00A430] text-2xl cursor-pointer" />
//                     </button>
//                 </Space>
//             ),
//         },
//     ];

//     if (error) {
//         return (
//             <div className="p-4">
//                 <div className="text-red-500 text-center">Error loading subscribed users: {error.message}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-4">
//             <ConfigProvider
//                 theme={{
//                     components: {
//                         Table: {
//                             headerColor: "#ffffff",
//                             headerBg: "#00A430",
//                             headerBorderRadius: 18,
//                             headerFontSize: 16,
//                             headerFontWeight: 600,
//                             headerSplitColor: "transparent",
//                             cellPaddingBlock: 14,
//                             cellPaddingInline: 16,
//                             cellBg: "#fff",
//                             cellBorderColor: "#E5E5E5",
//                             cellBorderRadius: 8,
//                         },
//                         Pagination: {
//                             itemActiveBg: "#00A430",
//                             itemActiveColor: "#fff",
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
//                     dataSource={formatUserData()}
//                     columns={columns}
//                     rowKey="key"
//                     loading={isLoading}
//                     pagination={{
//                         current: page,
//                         pageSize: limit,
//                         total: data?.meta?.total || 0,
//                         onChange: (newPage, newPageSize) => {
//                             setPage(newPage);
//                             if (newPageSize) setLimit(newPageSize);
//                         },
//                         position: ["bottomCenter"],
//                     }}
//                 />

//                 <UserSubscriptionDetailsModal open={isModalOpen} onCancel={handleClose} user={selectedUser} />
//             </ConfigProvider>
//         </div>
//     );
// };

// export default UserSubscriptionTable;

import { Table, Space, ConfigProvider } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
import UserSubscriptionDetailsModal from "../../../Components/modal/UserSubscriptionDetailsModal";
import { useGetSubscribedUsersQuery } from "../../../redux/features/subscription/subscriptionApi";

const UserSubscriptionTable = ({ searchTerm = "", roleFilter = "" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading, error, refetch } = useGetSubscribedUsersQuery({
        page,
        limit,
        ...(searchTerm && { searchTerm }),
        ...(roleFilter && { role: roleFilter }),
    });

    useEffect(() => {
        refetch();
    }, [searchTerm, roleFilter, refetch]);

    const handleOpen = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const statusColor = {
        trialing: "bg-[#FFD857]",
        active: "bg-[#00A430]",
        canceled: "bg-[#FF3B30]",
        incomplete: "bg-[#FF9F0A]",
        incomplete_expired: "bg-[#FF3B30]",
        past_due: "bg-[#FF9F0A]",
        unpaid: "bg-[#FF3B30]",
        free: "bg-gray-400",
    };

    // Transform API data to table format
    const formatUserData = () => {
        if (!data?.data) return [];

        return data.data.map((user, index) => ({
            key: user._id || index,
            date: new Date(user.createdAt).toLocaleDateString(),
            name: user.fullName || user.name || "Unknown User",
            phone: user.phone || "N/A",
            paymentId: user.currentSubscription?.stripeSubscriptionId ? `#${user.currentSubscription.stripeSubscriptionId}` : "N/A",
            package: user.currentSubscription?.plan ? `$${user.currentSubscription.plan.price}/${user.currentSubscription.plan.interval}` : "Free",
            status: user.currentSubscription?.status || "free",
            subscriptionExpiresAt: user.currentSubscription?.currentPeriodEnd,
            email: user.email,
            role: user.role,
            originalData: user,
        }));
    };

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.originalData?.profile ? (record.originalData.profile.startsWith("http") ? record.originalData.profile : `http://10.10.7.26:5001${record.originalData.profile}`) : "https://i.pravatar.cc/40"}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                            e.target.src = "https://i.pravatar.cc/40";
                        }}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Payment ID",
            dataIndex: "paymentId",
            key: "paymentId",
        },
        {
            title: "Package",
            dataIndex: "package",
            key: "package",
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) => <span className={`px-4 py-2 w-[120px] flex items-center justify-center rounded-lg text-white font-medium ${statusColor[record.status] || "bg-gray-400"}`}>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <button onClick={() => handleOpen(record.originalData)}>
                        <MdOutlineRemoveRedEye className="text-[#00A430] text-2xl cursor-pointer" />
                    </button>
                </Space>
            ),
        },
    ];

    if (error) {
        return (
            <div className="p-4">
                <div className="text-red-500 text-center">Error loading subscribed users: {error.message}</div>
            </div>
        );
    }

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
                    dataSource={formatUserData()}
                    columns={columns}
                    rowKey="key"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: data?.meta?.total || 0,
                        onChange: (newPage, newPageSize) => {
                            setPage(newPage);
                            if (newPageSize) setLimit(newPageSize);
                        },
                        position: ["bottomCenter"],
                    }}
                />

                <UserSubscriptionDetailsModal open={isModalOpen} onCancel={handleClose} user={selectedUser} />
            </ConfigProvider>
        </div>
    );
};

export default UserSubscriptionTable;
