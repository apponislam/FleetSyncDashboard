// import { Modal } from "antd";
// import { CloseOutlined } from "@ant-design/icons";

// const UserSubscriptionDetailsModal = ({ open, onCancel, user }) => {
//     if (!user) return null;

//     return (
//         <Modal open={open} onCancel={onCancel} footer={null} centered title={null} width={400} closable={false} className="!p-0 custom-modal bg-white rounded-lg relative">
//             <div className="absolute top-0 right-0 rounded-bl-xl p-3 cursor-pointer" onClick={onCancel}>
//                 <CloseOutlined className="text-xl" />
//             </div>

//             {/* Title */}
//             <div className="text-center pt-4">
//                 <h2 className="text-[#333333] text-2xl">Subscription Details</h2>
//             </div>

//             {/* Rows */}
//             <div className="text-lg mt-4 text-[#333333]">
//                 {user.stripeCustomerId && (
//                     <div className="flex justify-between  py-4">
//                         <span>Stripe ID:</span>
//                         <span className="text-[#333333] font-medium">#{user.stripeCustomerId}</span>
//                     </div>
//                 )}

//                 <div className="flex justify-between  py-4">
//                     <span>Date:</span>
//                     <span className="text-[#333333] font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
//                 </div>

//                 <div className="flex justify-between  py-4">
//                     <span>User name:</span>
//                     <span className="text-[#333333] font-medium">{user.fullName || user.name}</span>
//                 </div>

//                 <div className="flex justify-between  py-4">
//                     <span>Email:</span>
//                     <span className="text-[#333333] font-medium">{user.email || "N/A"}</span>
//                 </div>

//                 <div className="flex justify-between  py-4">
//                     <span>Subscription Tier:</span>
//                     <span className="text-[#333333] font-medium capitalize">{user.subscriptionTier}</span>
//                 </div>

//                 <div className="flex justify-between py-4">
//                     <span>Status:</span>
//                     <span className="text-[#333333] font-medium capitalize">{user.subscriptionStatus}</span>
//                 </div>

//                 {user.subscriptionExpiresAt && (
//                     <div className="flex justify-between  py-4">
//                         <span>Expires At:</span>
//                         <span className="text-[#333333] font-medium">{new Date(user.subscriptionExpiresAt).toLocaleDateString()}</span>
//                     </div>
//                 )}
//             </div>
//         </Modal>
//     );
// };

// export default UserSubscriptionDetailsModal;

import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const UserSubscriptionDetailsModal = ({ open, onCancel, user }) => {
    if (!user) return null;

    const subscription = user.currentSubscription;

    return (
        <Modal open={open} onCancel={onCancel} footer={null} centered title={null} width={500} closable={false} className="!p-0 custom-modal bg-white rounded-lg relative">
            <div className="absolute top-0 right-0 rounded-bl-xl p-3 cursor-pointer" onClick={onCancel}>
                <CloseOutlined className="text-xl" />
            </div>

            {/* Title */}
            <div className="text-center pt-4">
                <h2 className="text-[#333333] text-2xl">Subscription Details</h2>
            </div>

            {/* Rows */}
            <div className="text-lg mt-4 text-[#333333] px-6">
                {subscription?.stripeSubscriptionId && (
                    <div className="flex justify-between py-3 ">
                        <span className="font-medium">Stripe ID:</span>
                        <span className="text-[#333333]">#{subscription.stripeSubscriptionId.substring(0, 8)}...</span>
                    </div>
                )}

                <div className="flex justify-between py-3 ">
                    <span className="font-medium">Name:</span>
                    <span className="text-[#333333]">{user.fullName || user.name}</span>
                </div>

                {subscription?.plan && (
                    <>
                        <div className="flex justify-between py-3 ">
                            <span className="font-medium">Plan:</span>
                            <span className="text-[#333333] capitalize">{subscription.plan.name}</span>
                        </div>

                        <div className="flex justify-between py-3 ">
                            <span className="font-medium">Price:</span>
                            <span className="text-[#333333]">
                                ${subscription.plan.price} / {subscription.plan.interval}
                            </span>
                        </div>
                    </>
                )}

                <div className="flex justify-between py-3 ">
                    <span className="font-medium">Status:</span>
                    <span className="text-[#333333] capitalize">{subscription?.status || "free"}</span>
                </div>

                {subscription?.currentPeriodStart && (
                    <div className="flex justify-between py-3 ">
                        <span className="font-medium">Period Start:</span>
                        <span className="text-[#333333]">{new Date(subscription.currentPeriodStart).toLocaleDateString()}</span>
                    </div>
                )}

                {subscription?.currentPeriodEnd && (
                    <div className="flex justify-between py-3 ">
                        <span className="font-medium">Period End:</span>
                        <span className="text-[#333333]">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                    </div>
                )}

                {subscription?.trialEnd && (
                    <div className="flex justify-between py-3 ">
                        <span className="font-medium">Trial End:</span>
                        <span className="text-[#333333]">{new Date(subscription.trialEnd).toLocaleDateString()}</span>
                    </div>
                )}

                {subscription?.cancelAtPeriodEnd && (
                    <div className="flex justify-between py-3">
                        <span className="font-medium">Cancel at Period End:</span>
                        <span className="text-[#333333]">{subscription.cancelAtPeriodEnd ? "Yes" : "No"}</span>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default UserSubscriptionDetailsModal;
