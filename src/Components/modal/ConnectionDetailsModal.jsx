import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const ConnectionDetailsModal = ({ open, onCancel, connectionData }) => {
    if (!connectionData) return null;

    const user1 = connectionData.user?.[0];
    const user2 = connectionData.user?.[1];
    const connectionDate = new Date(connectionData.createdAt).toLocaleDateString();

    return (
        <Modal open={open} onCancel={onCancel} footer={null} centered title={null} width={600} closable={false} className="custom-modal bg-white rounded-lg">
            <div className="text-black text-right cursor-pointer" onClick={onCancel}>
                <CloseOutlined className="text-lg" />
            </div>

            {/* Rows */}
            <div className="text-lg text-[#252B42] mx-8">
                <div className="flex justify-between px-4 py-2">
                    <span>Get Connect</span>
                    <span className="text-[#252B42]">{connectionDate}</span>
                </div>

                <div className="flex justify-between px-4 py-2">
                    <span>From</span>
                    <span className="text-[#252B42]">{user1?.fullName || "N/A"}</span>
                </div>

                <div className="flex justify-between px-4 py-2">
                    <span>Role</span>
                    <span className="text-[#252B42]">{user1?.role || "N/A"}</span>
                </div>

                <div className="flex justify-between px-4 py-2">
                    <span>To</span>
                    <span className="text-[#252B42]">{user2?.fullName || "N/A"}</span>
                </div>

                <div className="flex justify-between px-4 py-2">
                    <span>Role</span>
                    <span className="text-[#252B42]">{user2?.role || "N/A"}</span>
                </div>
            </div>
        </Modal>
    );
};

export default ConnectionDetailsModal;
