import { Table, Space, ConfigProvider } from "antd";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import ConnectionDetailsModal from "../../../Components/modal/ConnectionDetailsModal";
import { useState } from "react";
import { useGetConnectionsQuery } from "../../../redux/api/connectionsApi";





const ConnectionTable = ({data,page,setPage}) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleOpen = () => setIsModalOpen(true);
      const handleClose = () => setIsModalOpen(false)

      console.log(data?.data
      );
    
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <span>{record.name}</span>
      </div>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Connect With",
    dataIndex: "connect_with",
    key: "connect_with",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.connect_avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <span>{record.connect_with}</span>
      </div>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space>
        <button onClick={handleOpen}>
          <MdOutlineRemoveRedEye className="text-[#00A430] text-2xl cursor-pointer" />
        </button>
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
  dataSource={data?.data?.map((item) => ({
    key: item._id,
    name: item.user?.[0]?.fullName,
    phone: item.user?.[0]?.phone,
    avatar: item.user?.[0]?.profilePic || "https://i.pravatar.cc/40",

    connect_with: item.user?.[1]?.fullName,
    connect_avatar: item.user?.[1]?.profilePic || "https://i.pravatar.cc/40",
    role: item.user?.[1]?.role || "N/A",
  }))}
  columns={columns}
  rowKey="key"
  pagination={{ pageSize: 10, position: ["bottomCenter"] }}
/>

    
<ConnectionDetailsModal open={isModalOpen} onCancel={handleClose} ></ConnectionDetailsModal>

      </ConfigProvider>
    </div>
  );
};

export default ConnectionTable;
