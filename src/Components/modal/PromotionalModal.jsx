import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const PromotionalsModal = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      title={null}
      width={600}
      closable={false}
      className="custom-modal  bg-white rounded-lg p-12 "
    >
      <div
        className=" text-black text-right cursor-pointer"
        onClick={onCancel}
      >
        <CloseOutlined className=" text-lg " />
      </div>

   
<div className="flex justify-center mb-4">
      <img
            src="https://i.pravatar.cc/40"
            alt="company-logo"
            className="w-30 h-30 rounded-md "
          />
</div>
    <div className="px-16">
          {/* Rows */}
      <div className=" text-lg text-[#252B42] ">
        <div className="flex justify-between px-4 py-2">
          <span className="">Get Connect</span>
          <span className="text-[#252B42]">12 Mar 2025</span>
        </div>

        <div className="flex justify-between px-4 py-2">
          <span className="">Form</span>
          <span className="text-[#252B42]">John Doe</span>
        </div>

        <div className="flex justify-between px-4 py-2">
          <span className="">Role</span>
          <span className="text-[#252B42]">Mechanics</span>
        </div>

        <div className="flex justify-between px-4 py-2">
          <span className="">To </span>
          <span className="text-[#252B42]">
            The Turky Americans
          </span>
        </div>

        <div className="flex justify-between px-4 py-2">
          <span className="">Role </span>
          <span className=" text-[#252B42]">Compnay</span>
        </div>
      </div>
    </div>

    <div className="flex justify-center gap-x-4 mt-8">
        <button className="px-8 w-[185px] py-2 rounded-3xl text-sm font-medium bg-[#FB3E3E] text-white">Delete</button>
        <button className="px-8  w-[185px] py-2 rounded-3xl text-sm font-medium bg-[#FBB93E] text-white">Edit</button>
    </div>

    </Modal>
  );
};

export default PromotionalsModal;

