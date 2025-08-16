import { Table, Space, ConfigProvider } from "antd";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import ConnectionDetailsModal from "../../../Components/modal/ConnectionDetailsModal";
import { useState } from "react";


const userData = [
  {
    key: "1",
    name: "John Doe",
    connect_with: "Jane Smith",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "Alice Brown",
    connect_with: "John Doe",
    phone: "+179874085406",
    location: "Los Angeles, California",
    role: "Engineer",
    status: "Ban",
  },
  {
    key: "1",
    name: "John Doe",
    connect_with: "Jane Smith",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "Alice Brown",
    connect_with: "John Doe",
    phone: "+179874085406",
    location: "Los Angeles, California",
    role: "Engineer",
    status: "Ban",
  },
  {
    key: "1",
    name: "John Doe",
    connect_with: "Jane Smith",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "Alice Brown",
    connect_with: "John Doe",
    phone: "+179874085406",
    location: "Los Angeles, California",
    role: "Engineer",
    status: "Ban",
  },
  {
    key: "1",
    name: "John Doe",
    connect_with: "Jane Smith",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "Alice Brown",
    connect_with: "John Doe",
    phone: "+179874085406",
    location: "Los Angeles, California",
    role: "Engineer",
    status: "Ban",
  },
  {
    key: "1",
    name: "John Doe",
    connect_with: "Jane Smith",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "Alice Brown",
    connect_with: "John Doe",
    phone: "+179874085406",
    location: "Los Angeles, California",
    role: "Engineer",
    status: "Ban",
  },
];


const ConnectionTable = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleOpen = () => setIsModalOpen(true);
      const handleClose = () => setIsModalOpen(false)
      
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
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
  },
  {
    title: "Connect With",
    dataIndex: "connect_with",
    key: "connect_with",
    render: (text) => (
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <span>{text}</span>
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
        <button
          onClick={handleOpen} >
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
           dataSource={userData}
           columns={columns}
           rowKey="key"
           pagination={{ pageSize: 8, position: ["bottomCenter"] }}
         />
    
<ConnectionDetailsModal open={isModalOpen} onCancel={handleClose} ></ConnectionDetailsModal>

      </ConfigProvider>
    </div>
  );
};

export default ConnectionTable;
