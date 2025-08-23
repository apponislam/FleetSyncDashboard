import { PlusOutlined } from "@ant-design/icons";
import { useGetSubscriptionPlansQuery, useUpdateSubscriptionPlanMutation } from "../../../redux/features/subscription/subscriptionManagementApi";
import { useState } from "react";
import SubscriptionPlanForm from "./SubscriptionPlanForm";
import Swal from "sweetalert2";

const SubscriptionCard = ({ role, plans, onAddClick, onEditClick, onDeleteClick }) => {
    const rolePlans = plans?.filter((plan) => plan.userTypes?.includes(role.key)) || [];

    return (
        <div className="bg-white p-6 rounded-xl">
            <h3 className="font-semibold text-2xl mb-4">• {role.label} Role</h3>

            <div className="flex items-center gap-4 flex-wrap">
                {/* Plan Cards - Horizontal */}
                {rolePlans.length > 0 ? (
                    rolePlans.map((plan) => (
                        <div key={plan._id} className="bg-[#2C2C2C] rounded-xl p-4 w-60 text-center flex-shrink-0">
                            <p className="text-white text-base">{plan.name}</p>
                            <p className="text-green-500 font-bold text-lg mb-3">
                                ${plan.price}/{plan.interval}
                            </p>

                            <div className="flex gap-2 items-center justify-center">
                                <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600" onClick={() => onDeleteClick(plan._id)}>
                                    Delete
                                </button>
                                <button className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm" onClick={() => onEditClick(plan)}>
                                    Edit Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-[#2C2C2C] rounded-xl p-4 w-60 text-center flex-shrink-0">
                        <p className="text-white text-base">No plans</p>
                        <p className="text-gray-400 text-sm mb-3">Add a plan</p>
                    </div>
                )}

                {/* Add Button */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors" onClick={() => onAddClick(role.key)}>
                        <PlusOutlined className="text-4xl text-slate-300 hover:text-green-500 transition-colors" />
                    </div>
                    <button className="bg-green-600 text-white px-5 py-1 rounded-full shadow hover:bg-green-700 transition-colors" onClick={() => onAddClick(role.key)}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

const SubscriptionManagement = () => {
    const { data: plansData, isLoading, error, refetch } = useGetSubscriptionPlansQuery();
    const [updatePlan] = useUpdateSubscriptionPlanMutation();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [editData, setEditData] = useState(null);

    const roles = [
        { key: "driver", label: "Driver" },
        { key: "mechanic", label: "Mechanic" },
        { key: "admin", label: "Admin" },
        { key: "cook", label: "Cook" },
        { key: "fuel_provider", label: "Fuel Provider" },
    ];

    const handleAddClick = (roleKey) => {
        setSelectedRole(roleKey);
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (planData) => {
        setEditData(planData);
        setIsFormOpen(true);
    };

    const handleDeleteClick = async (planId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await updatePlan({
                    id: planId,
                    data: { isActive: false },
                }).unwrap();

                // Show success message
                Swal.fire("Deleted!", "The subscription plan has been deleted.", "success");

                // Refetch the data to update the UI
                refetch();
            } catch (error) {
                console.error("Failed to delete subscription plan:", error);

                // Show error message
                Swal.fire("Error!", "Failed to delete the subscription plan.", "error");
            }
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedRole("");
        setEditData(null);
    };

    if (isLoading) {
        return (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                    <div key={role.key} className="bg-white p-6 rounded-xl">
                        <h3 className="font-semibold text-2xl mb-4">• {role.label} Role</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-200 rounded-xl p-4 w-60 h-24 animate-pulse flex-shrink-0"></div>
                            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                                    <PlusOutlined className="text-4xl text-gray-300" />
                                </div>
                                <div className="bg-gray-300 rounded-full w-16 h-8 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="text-center text-red-500">Error loading subscription plans</div>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                    <SubscriptionCard key={role.key} role={role} plans={plansData} onAddClick={handleAddClick} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
                ))}
            </div>

            <SubscriptionPlanForm open={isFormOpen} onClose={handleCloseForm} defaultUserType={selectedRole} refetch={refetch} editData={editData} />
        </>
    );
};

export default SubscriptionManagement;
