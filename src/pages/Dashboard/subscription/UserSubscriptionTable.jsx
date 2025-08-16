import { Table, Space, ConfigProvider } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import UserSubscriptionDetailsModal from "../../../Components/modal/UserSubscriptionDetailsModal";



const UserSubscriptionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
const statusColor = {
  Paid: "bg-[#00A430]",
  Free: "bg-[#FFD857]",
};
const userData = [
  {
    key: "1",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Paid",
  },
  {
    key: "2",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Free",
  },
  {
    key: "1",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Paid",
  },
  {
    key: "2",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Free",
  },
  {
    key: "1",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Paid",
  },
  {
    key: "2",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Free",
  },
  {
    key: "1",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Paid",
  },
  {
    key: "2",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Free",
  },
  {
    key: "1",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Paid",
  },
  {
    key: "2",
    date: "17 Jan 2025",
    name: "John Doe",
    phone: "+179874085405",
    paymentId: "#123456789",
    pakage: "4$/month",
    status: "Free",
  },
];
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
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "Package",
      dataIndex: "pakage",
      key: "pakage",
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
                dataSource={userData}
                columns={columns}
                rowKey="key"
                pagination={{ pageSize: 8, position: ["bottomCenter"] }}
              />
         
        <UserSubscriptionDetailsModal open={isModalOpen} onCancel={handleClose} />
      </ConfigProvider>
    </div>
  );
};

export default UserSubscriptionTable;
