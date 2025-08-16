import { Table, ConfigProvider } from "antd";

import { FaFolder } from "react-icons/fa";
import { useState } from "react";

const VerificationTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // Status button colors
  const statusColor = {
    Accepted: "bg-[#00A430] text-white",
    Declined: "bg-[#FF5C35] text-white",
    Pending: "bg-[#FFD857] text-black",
  };

  // Fake data
  const userData = Array.from({ length: 10 }, (_, i) => ({
    key: i + 1,
    name: "John Doe",
    phone: "+179874085405",
    location: "Buffalo. New York",
    fileVerification: "Verified",
    status: i === 3 ? "Declined" : i === 6 ? "Pending" : "Accepted",
  }));

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
            className="w-10 h-10 rounded-full"
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
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "File Verification",
      dataIndex: "fileVerification",
      key: "fileVerification",
      render: () => (
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-1 cursor-pointer">
     <FaFolder className="text-yellow-400 text-xl" />
          <button className="text-[#00A3FF] font-medium">View</button>
            </div>
       
          <div className="flex items-center gap-1  cursor-pointer">
            <FaFolder className="text-yellow-400 text-xl" />
            <span className="text-red-500 font-medium">Download</span>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          className={`px-5 py-1 rounded-full font-medium ${statusColor[record.status]}`}
        >
          {record.status}
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

export default VerificationTable;
