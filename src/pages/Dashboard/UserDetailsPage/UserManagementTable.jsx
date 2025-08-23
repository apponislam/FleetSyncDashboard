import { Table, Space, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { useGetUsersQuery, useRestrictActiveUserMutation } from "../../../redux/api/userApi";
import getLocationName from "../../../utils/getLocationName";
import Swal from "sweetalert2";

const UserManagementTable = ({ search, filter }) => {
    const [page, setPage] = useState(1);
    const [locationNames, setLocationNames] = useState({});
    const { data, error, isLoading } = useGetUsersQuery({
        page,
        limit: 10,
        searchTerm: search,
        role: filter,
    });

    const [restrictUser] = useRestrictActiveUserMutation();

    const userStatusToggle = async (id, currentStatus) => {
        const isCurrentlyActive = currentStatus?.toLowerCase() === "active";
        const action = isCurrentlyActive ? "restrict" : "activate";

        const { isConfirmed } = await Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${action} this user (currently ${isCurrentlyActive ? "Active" : "Restricted"}).`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Yes, ${action} it!`,
            cancelButtonText: "Cancel",
        });

        if (!isConfirmed) return;

        try {
            const response = await restrictUser(id).unwrap();

            Swal.fire({
                title: "Success",
                text: response.data || response.message || `User ${action}ed successfully.`,
                icon: "success",
            });
        } catch (err) {
            console.error("Error:", err);
            Swal.fire({
                title: "Error",
                text: err.data?.message || "Failed to update user status.",
                icon: "error",
            });
        }
    };
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const columns = [
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record?.profile ? (record.profile.startsWith("http") ? record.profile : `${import.meta.env.VITE_BASE_URL}${record.profile}`) : "https://i.pravatar.cc/40"}
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
            title: "Location",
            dataIndex: "location",
            key: "location",
            render: (location, record) => {
                // First check if there's an address in the record
                if (record.address) {
                    return record.address;
                }

                // If no address, check for coordinates
                if (!location?.coordinates) return "N/A";

                const [lng, lat] = location.coordinates;

                // Check if coordinates are (0, 0) - default/unset coordinates
                if (lat === 0 && lng === 0) return "Location not set";

                const locationKey = `${lat},${lng}`;

                // Check if we already have the location name
                if (locationNames[locationKey]) {
                    // Shorten the location name
                    const shortenedName = locationNames[locationKey].split(",").slice(0, 3).join(",");
                    return <span title={locationNames[locationKey]}>{shortenedName}</span>;
                }

                // Fetch location name if not already available
                getLocationName(lat, lng).then((name) => {
                    setLocationNames((prev) => ({ ...prev, [locationKey]: name }));
                });

                return "Loading...";
            },
        },

        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => {
                const isActive = status?.toLowerCase() === "active";
                const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1); // Capitalize first letter

                return (
                    <span onClick={() => userStatusToggle(record._id, status)} className={`px-4 py-2 w-[120px] flex items-center justify-center rounded-lg text-white font-medium ${isActive ? "bg-[#00A430]" : "bg-[#EE443F]"}`} style={{ cursor: "pointer" }}>
                        {displayStatus}
                    </span>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space>
                    <Link className="text-[#00A430]" to={`/user-details/${record?._id}`}>
                        <MdOutlineRemoveRedEye className="text-[#00A430] text-2xl cursor-pointer" />
                    </Link>
                </Space>
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
                            cellBg: "#333333",
                            cellBorderColor: "#E5E5E5",
                            cellBorderRadius: 8,
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
                    dataSource={data?.data || []}
                    columns={columns}
                    rowKey="_id"
                    pagination={{
                        current: data?.meta?.page,
                        pageSize: data?.meta?.limit,
                        total: data?.meta?.total,
                        showSizeChanger: false,
                        onChange: (newPage) => setPage(newPage),
                        position: ["bottomCenter"],
                    }}
                />
            </ConfigProvider>
        </div>
    );
};

export default UserManagementTable;
