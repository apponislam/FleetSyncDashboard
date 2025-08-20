import { Table, Space, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { useGetUsersQuery } from "../../../redux/api/userApi";

const UserManagementTable = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useGetUsersQuery({ page, limit: 10 });
console.log(data);
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
            src={
              record?.profile
                ? `https://thou-george-collect-inline.trycloudflare.com${record?.profile}`
                : "https://i.pravatar.cc/40"
            }
            alt="avatar"
            className="w-12 h-12 rounded-full"
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
      render: (location) =>
        location?.coordinates
          ? `${location.coordinates[1]}, ${location.coordinates[0]}`
          : "N/A",
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
      render: (status) => (
        <span
          className={`px-4 py-2 w-[120px] flex items-center justify-center rounded-lg text-white font-medium ${
            status?.toLowerCase() === "active" ? "bg-[#00A430]" : "bg-[#EE443F]"
          }`}
        >
          {status}
        </span>
      ),
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
