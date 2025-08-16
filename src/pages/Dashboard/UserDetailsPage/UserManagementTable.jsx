import { Table, Space, ConfigProvider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const userData = [
  {
    key: "1",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Ban",
  },
 
  {
    key: "1",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Ban",
  },
 
  {
    key: "1",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Ban",
  },
 
  {
    key: "1",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Active",
  },
  {
    key: "2",
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo, New York",
    role: "Mechanic",
    status: "Ban",
  },
 
];

const statusColor = {
  Ban: "bg-[#EE443F]",
  Active: "bg-[#00A430]",
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div className="flex items-center gap-3 ">
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
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) => (
      <span
        className={`px-4 py-2 w-[120px] flex items-center justify-center rounded-lg text-white font-medium ${statusColor[record.status]}`}
      >
        {record.status}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space>
        <Link className="text-[#00A430]" to={`/user-details/${record?.key}`}>
          <MdOutlineRemoveRedEye className="text-[#00A430] text-2xl cursor-pointer" />
        </Link>
      </Space>
    ),
  },
];

const UserManagementTable = () => {
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
          dataSource={userData}
          columns={columns}
          rowKey="key"
          pagination={{ pageSize: 8, position: ["bottomCenter"] }}
        />
   

      </ConfigProvider>
    </div>
  );
};

export default UserManagementTable;
