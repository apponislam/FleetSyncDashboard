import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const UserSubscriptionDetailsModal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      title={null}
      wi6th={400}
      closable={false}
      className="!p-0 custom-modal  bg-white rounded-lg  relative "
    >
      <div
        className="absolute  top-0 right-0 rounded-bl-xl p-3 cursor-pointer"
        onClick={onCancel}
      >
        <CloseOutlined className=" text-xl" />
      </div>

      {/* Title */}
      <div className="text-center pt-4 ">
        <h2 className="text-[#333333] text-2xl">
          Transaction Details
        </h2>
      </div>

      {/* Rows */}
      <div className="text-lg mt-4 text-[#333333]">
        <div className="flex justify-between px-6 py-4">
          <span className="">Order Id</span>
          <span className="text-[#333333] font-medium">6#123478</span>
        </div>

        <div className="flex justify-between px-6 py-4">
          <span className="">Date :</span>
          <span className="text-[#333333] font-medium">01-24-2024</span>
        </div>

        <div className="flex justify-between px-6 py-4">
          <span className="">User name :</span>
          <span className="text-[#333333] font-medium">Enrique</span>
        </div>

        <div className="flex justify-between px-6 py-4">
          <span className="">A/C number :</span>
          <span className="text-[#333333] font-medium">
            **** **** **** *545
          </span>
        </div>

        <div className="flex justify-between px-6 py-4">
          <span className="">Total transaction amount :</span>
          <span className=" text-[#333333] font-medium">$2</span>
        </div>
      </div>
    </Modal>
  );
};

export default  UserSubscriptionDetailsModal;

