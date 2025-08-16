import { Table, ConfigProvider } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import PromotionalsModal from "../../../Components/modal/PromotionalModal";

const PromotionalTable = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleOpen = () => setIsModalOpen(true);
      const handleClose = () => setIsModalOpen(false)

  const statusColor = {
    Active: "bg-[#00A430] text-white",
    Inactive: "bg-[#FF5C35] text-white",
  };

  // Updated data according to screenshot
  const promoData = [
    {
      key: "1",
      company: "Truck American",
      description: "20% off for buying...",
      cost: "$5",
      deadline: "17 Aug, 2025",
      status: "Active",
    },
    {
      key: "2",
      company: "Truck American",
      description: "20% off for buying...",
      cost: "$5",
      deadline: "17 Aug, 2025",
      status: "Inactive",
    },
    {
      key: "3",
      company: "Truck American",
      description: "20% off for buying...",
      cost: "$5",
      deadline: "17 Aug, 2025",
      status: "Active",
    },
    {
      key: "4",
      company: "Truck American",
      description: "20% off for buying...",
      cost: "$5",
      deadline: "17 Aug, 2025",
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="company-logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-4 py-1 rounded-lg text-sm font-medium ${statusColor[record.status]}`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <button    onClick={handleOpen} className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
          <FiEdit2 className="text-[#FF9F0A] text-lg" />
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
          dataSource={promoData}
          columns={columns}
          rowKey="key"
          pagination={false}
        />
      </ConfigProvider>


      <PromotionalsModal open={isModalOpen} onCancel={handleClose} ></PromotionalsModal>

    </div>
  );
};

export default PromotionalTable;
