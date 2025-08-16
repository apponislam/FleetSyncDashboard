import { Table, ConfigProvider, Modal } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";

const SupportRequestTable = () => {
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

  const statusColor = {
    Solved: "bg-[#00A430] text-white",
    Pending: "bg-[#FF9F0A] text-white",
    Declined: "bg-[#FF3B30] text-white",
    Submit: "bg-[#34C759] text-white",
  };

  // Table Data (as in screenshot)
  const supportData = [
    {
      key: "1",
      user: "John Doe",
      phone: "+17594259625",
      description: "I can't find the login button.",
      status: "Solved",
      date: "2025-08-15",
      message: "I’m having issue with the login system. It keeps showing an error.",
    },
    {
      key: "2",
      user: "Jane Doe",
      phone: "+17594259625",
      description: "I can't find the login button.",
      status: "Pending",
      date: "2025-08-15",
      message: "Login page not working correctly.",
    },
    {
      key: "3",
      user: "John Smith",
      phone: "+17594259625",
      description: "I can't find the login button.",
      status: "Declined",
      date: "2025-08-15",
      message: "Request was invalid.",
    },
    {
      key: "4",
      user: "Alice Brown",
      phone: "+17594259625",
      description: "I can't find the login button.",
      status: "Submit",
      date: "2025-08-15",
      message: "Trying to reset my password but failed.",
    },
  ];

  const columns = [
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      render: (text) => (
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user-avatar"
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
      title: "Problem Description",
      dataIndex: "description",
      key: "description",
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
      render: (_, record) => (
        <button
          onClick={() => handleOpen(record)}
          className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
        >
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
              headerBorderRadius: 12,
              headerFontSize: 16,
              headerFontWeight: 600,
              headerSplitColor: "transparent",
              cellPaddingBlock: 14,
              cellPaddingInline: 16,
              cellBg: "#fff",
              cellBorderColor: "#E5E5E5",
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
          dataSource={supportData}
          columns={columns}
          rowKey="key"
          pagination={false}
        />
      </ConfigProvider>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        className="rounded-xl"
      >
        {selectedRequest && (
          <div>
            <h2 className="text-xl font-semibold mb-8 text-[#333333]">
              Support Request Details
            </h2>

            <div className="mb-5 flex gap-x-4">
              <p>
                <span className="font-semibold">From:</span>{" "} <br />
                {selectedRequest.user}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "} <br />
                {selectedRequest.date}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-semibold">Message:</p>
              <p className="text-gray-700">{selectedRequest.message}</p>
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Your Reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 resize-none"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-8 mt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportRequestTable;
