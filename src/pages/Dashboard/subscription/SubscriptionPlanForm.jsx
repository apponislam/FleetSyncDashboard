// import { useState, useEffect } from "react";
// import { Modal } from "antd";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useCreateSubscriptionPlanMutation, useUpdateSubscriptionPlanMutation } from "../../../redux/features/subscription/subscriptionManagementApi";
// import { toast } from "sonner";

// const planSchema = z.object({
//     name: z.string().min(1, "Plan name is required"),
//     description: z.string().min(1, "Description is required"),
//     price: z.number().positive("Price must be positive"),
//     currency: z.string().default("usd"),
//     interval: z.enum(["month", "year"]),
//     intervalCount: z.number().default(1),
//     trialPeriodDays: z.number().min(0).default(0),
//     maxUsers: z.number().positive("Max users must be positive"),
//     maxTrucks: z.number().positive("Max trucks must be positive"),
//     userTypes: z.array(z.string()).min(1, "Select at least one user type"),
//     features: z.string().min(1, "Features are required"),
//     priority: z.number().optional(),
// });

// const SubscriptionPlanForm = ({ open, onClose, defaultUserType, refetch, editData }) => {
//     const [createPlan, { isLoading: isCreating }] = useCreateSubscriptionPlanMutation();
//     const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();
//     const [features, setFeatures] = useState([]);

//     const isLoading = isCreating || isUpdating;
//     const isEditMode = Boolean(editData);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//         setValue,
//         watch,
//     } = useForm({
//         resolver: zodResolver(planSchema),
//         defaultValues: {
//             currency: "usd",
//             interval: "month",
//             intervalCount: 1,
//             trialPeriodDays: 0,
//             userTypes: [],
//             priority: 1,
//         },
//     });

//     // Set form values when in edit mode or when defaultUserType changes
//     useEffect(() => {
//         if (isEditMode && editData) {
//             // Set form values from editData
//             const featuresArray = Array.isArray(editData.features) ? editData.features : (editData.features || "").split(",").filter((f) => f.trim());

//             setFeatures(featuresArray);

//             reset({
//                 name: editData.name || "",
//                 description: editData.description || "",
//                 price: editData.price || 0,
//                 currency: editData.currency || "usd",
//                 interval: editData.interval || "month",
//                 intervalCount: editData.intervalCount || 1,
//                 trialPeriodDays: editData.trialPeriodDays || 0,
//                 maxUsers: editData.maxUsers || 1,
//                 maxTrucks: editData.maxTrucks || 1,
//                 userTypes: editData.userTypes || [],
//                 features: featuresArray.join(","),
//                 priority: editData.priority || 1,
//             });
//         } else if (defaultUserType) {
//             // Set default user type for new plans
//             setValue("userTypes", [defaultUserType]);
//             setFeatures([]);
//         } else {
//             setValue("userTypes", []);
//             setFeatures([]);
//         }
//     }, [editData, defaultUserType, isEditMode, reset, setValue]);

//     const userTypesOptions = [
//         { value: "driver", label: "Driver" },
//         { value: "mechanic", label: "Mechanic" },
//         { value: "admin", label: "Admin" },
//         { value: "cook", label: "Cook" },
//         { value: "fuel_provider", label: "Fuel Provider" },
//     ];

//     const handleAddFeature = (e) => {
//         if (e.key === "Enter" && e.target.value.trim()) {
//             e.preventDefault();
//             const newFeature = e.target.value.trim();
//             setFeatures((prev) => [...prev, newFeature]);
//             setValue("features", [...features, newFeature].join(","));
//             e.target.value = "";
//         }
//     };

//     const removeFeature = (index) => {
//         const newFeatures = features.filter((_, i) => i !== index);
//         setFeatures(newFeatures);
//         setValue("features", newFeatures.join(","));
//     };

//     const onSubmit = async (data) => {
//         try {
//             const planData = {
//                 ...data,
//                 features: data.features.split(",").filter((f) => f.trim()),
//                 userTypes: data.userTypes,
//                 price: data.price,
//                 maxUsers: data.maxUsers,
//                 maxTrucks: data.maxTrucks,
//                 trialPeriodDays: data.trialPeriodDays,
//             };

//             if (isEditMode) {
//                 await updatePlan({ id: editData._id, data: planData }).unwrap();
//                 toast.success("Subscription plan updated successfully!");
//             } else {
//                 await createPlan(planData).unwrap();
//                 toast.success("Subscription plan created successfully!");
//             }

//             reset();
//             setFeatures([]);
//             if (refetch) {
//                 refetch();
//             }
//             onClose();
//         } catch (error) {
//             const action = isEditMode ? "update" : "create";
//             toast.error(`Failed to ${action} subscription plan`);
//             console.error(`${action} plan error:`, error);
//         }
//     };

//     const handleCancel = () => {
//         reset();
//         setFeatures([]);
//         onClose();
//     };

//     // Watch userTypes to handle checkbox changes
//     const userTypes = watch("userTypes") || [];

//     const handleUserTypeChange = (value) => {
//         const newUserTypes = userTypes.includes(value) ? userTypes.filter((type) => type !== value) : [...userTypes, value];
//         setValue("userTypes", newUserTypes);
//     };

//     // Reset form when modal opens/closes
//     useEffect(() => {
//         if (open && !isEditMode) {
//             reset({
//                 currency: "usd",
//                 interval: "month",
//                 intervalCount: 1,
//                 trialPeriodDays: 0,
//                 userTypes: defaultUserType ? [defaultUserType] : [],
//                 priority: 1,
//             });
//             setFeatures([]);
//         }
//     }, [open, defaultUserType, reset, isEditMode]);

//     return (
//         <Modal open={open} onCancel={handleCancel} footer={null} centered width={500} className="subscription-plan-modal">
//             <div className="p-4">
//                 <h2 className="text-lg font-bold text-green-600 mb-3 text-center">
//                     {isEditMode ? "Edit" : "Create"} Subscription Plan {defaultUserType ? `for ${defaultUserType}` : ""}
//                 </h2>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="block text-xs font-medium mb-1">Plan Name *</label>
//                             <input {...register("name")} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="e.g., Driver Pro" />
//                             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium mb-1">Price ($) *</label>
//                             <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="49.99" />
//                             {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium mb-1">Description *</label>
//                         <textarea {...register("description")} rows={2} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="Describe the plan features and benefits..." />
//                         {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="block text-xs font-medium mb-1">Billing Interval *</label>
//                             <select {...register("interval")} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent">
//                                 <option value="month">Monthly</option>
//                                 <option value="year">Yearly</option>
//                             </select>
//                             {errors.interval && <p className="text-red-500 text-xs mt-1">{errors.interval.message}</p>}
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium mb-1">Trial Period (Days)</label>
//                             <input type="number" {...register("trialPeriodDays", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="10" />
//                             {errors.trialPeriodDays && <p className="text-red-500 text-xs mt-1">{errors.trialPeriodDays.message}</p>}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="block text-xs font-medium mb-1">Max Users *</label>
//                             <input type="number" {...register("maxUsers", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="1" />
//                             {errors.maxUsers && <p className="text-red-500 text-xs mt-1">{errors.maxUsers.message}</p>}
//                         </div>

//                         <div>
//                             <label className="block text-xs font-medium mb-1">Max Trucks *</label>
//                             <input type="number" {...register("maxTrucks", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="3" />
//                             {errors.maxTrucks && <p className="text-red-500 text-xs mt-1">{errors.maxTrucks.message}</p>}
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium mb-1">User Types *</label>
//                         <div className="grid grid-cols-3 gap-1">
//                             {userTypesOptions.map((option) => (
//                                 <label key={option.value} className="flex items-center text-xs">
//                                     <input type="checkbox" checked={userTypes.includes(option.value)} onChange={() => handleUserTypeChange(option.value)} className="mr-1 scale-90" />
//                                     {option.label}
//                                 </label>
//                             ))}
//                         </div>
//                         {errors.userTypes && <p className="text-red-500 text-xs mt-1">{errors.userTypes.message}</p>}
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium mb-1">Features *</label>
//                         <input onKeyPress={handleAddFeature} placeholder="Type feature and press Enter..." className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent mb-1" />
//                         <div className="flex flex-wrap gap-1">
//                             {features.map((feature, index) => (
//                                 <span key={index} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs flex items-center">
//                                     {feature}
//                                     <button type="button" onClick={() => removeFeature(index)} className="ml-1 text-red-500 hover:text-red-700 text-xs">
//                                         ×
//                                     </button>
//                                 </span>
//                             ))}
//                         </div>
//                         {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features.message}</p>}
//                     </div>

//                     <div>
//                         <label className="block text-xs font-medium mb-1">Priority</label>
//                         <input type="number" {...register("priority", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="1" />
//                         {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
//                     </div>

//                     <div className="flex justify-end gap-2 pt-3">
//                         <button type="button" onClick={handleCancel} className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
//                             Cancel
//                         </button>
//                         <button type="submit" disabled={isLoading} className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
//                             {isLoading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Plan" : "Create Plan"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     );
// };

// export default SubscriptionPlanForm;

import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateSubscriptionPlanMutation, useUpdateSubscriptionPlanMutation } from "../../../redux/features/subscription/subscriptionManagementApi";
import { toast } from "sonner";

const planSchema = z.object({
    name: z.string().min(1, "Plan name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    currency: z.string().default("usd"),
    interval: z.enum(["month", "year"]),
    intervalCount: z.number().default(1),
    trialPeriodDays: z.number().min(0).default(0),
    maxUsers: z.number().positive("Max users must be positive"),
    maxTrucks: z.number().positive("Max trucks must be positive"),
    userTypes: z.array(z.string()).min(1, "Select at least one user type"),
    features: z.string().min(1, "Features are required"),
    priority: z.number().optional(),
});

const SubscriptionPlanForm = ({ open, onClose, defaultUserType, refetch, editData }) => {
    const [createPlan, { isLoading: isCreating }] = useCreateSubscriptionPlanMutation();
    const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();
    const [features, setFeatures] = useState([]);

    const isLoading = isCreating || isUpdating;
    const isEditMode = Boolean(editData);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(planSchema),
        defaultValues: {
            currency: "usd",
            interval: "month",
            intervalCount: 1,
            trialPeriodDays: 0,
            userTypes: [],
            priority: 1,
        },
    });

    // Set form values when in edit mode or when defaultUserType changes
    useEffect(() => {
        if (isEditMode && editData) {
            // Set form values from editData
            const featuresArray = Array.isArray(editData.features) ? editData.features : (editData.features || "").split(",").filter((f) => f.trim());

            setFeatures(featuresArray);

            reset({
                name: editData.name || "",
                description: editData.description || "",
                price: editData.price || 0,
                currency: editData.currency || "usd",
                interval: editData.interval || "month",
                intervalCount: editData.intervalCount || 1,
                trialPeriodDays: editData.trialPeriodDays || 0,
                maxUsers: editData.maxUsers || 1,
                maxTrucks: editData.maxTrucks || 1,
                userTypes: editData.userTypes || [],
                features: featuresArray.join(","),
                priority: editData.priority || 1,
            });
        } else if (defaultUserType) {
            // Set default user type for new plans
            setValue("userTypes", [defaultUserType]);
            setFeatures([]);
        } else {
            setValue("userTypes", []);
            setFeatures([]);
        }
    }, [editData, defaultUserType, isEditMode, reset, setValue]);

    const userTypesOptions = [
        { value: "driver", label: "Driver" },
        { value: "mechanic", label: "Mechanic" },
        { value: "admin", label: "Admin" },
        { value: "cook", label: "Cook" },
        { value: "fuel_provider", label: "Fuel Provider" },
    ];

    const handleAddFeature = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            e.preventDefault();
            const newFeature = e.target.value.trim();
            setFeatures((prev) => [...prev, newFeature]);
            setValue("features", [...features, newFeature].join(","));
            e.target.value = "";
        }
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
        setValue("features", newFeatures.join(","));
    };

    const onSubmit = async (data) => {
        try {
            let planData;

            if (isEditMode) {
                // For updates, only include editable fields
                planData = {
                    name: data.name,
                    description: data.description,
                    features: data.features.split(",").filter((f) => f.trim()),
                    maxUsers: data.maxUsers,
                    maxTrucks: data.maxTrucks,
                    priority: data.priority,
                };

                await updatePlan({ id: editData._id, data: planData }).unwrap();
                toast.success("Subscription plan updated successfully!");
            } else {
                // For creates, include all fields
                planData = {
                    ...data,
                    features: data.features.split(",").filter((f) => f.trim()),
                    userTypes: data.userTypes,
                    price: data.price,
                    maxUsers: data.maxUsers,
                    maxTrucks: data.maxTrucks,
                    trialPeriodDays: data.trialPeriodDays,
                };

                await createPlan(planData).unwrap();
                toast.success("Subscription plan created successfully!");
            }

            reset();
            setFeatures([]);
            if (refetch) {
                refetch();
            }
            onClose();
        } catch (error) {
            const action = isEditMode ? "update" : "create";
            toast.error(`Failed to ${action} subscription plan`);
            console.error(`${action} plan error:`, error);
        }
    };

    const handleCancel = () => {
        reset();
        setFeatures([]);
        onClose();
    };

    // Watch userTypes to handle checkbox changes
    const userTypes = watch("userTypes") || [];

    const handleUserTypeChange = (value) => {
        const newUserTypes = userTypes.includes(value) ? userTypes.filter((type) => type !== value) : [...userTypes, value];
        setValue("userTypes", newUserTypes);
    };

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open && !isEditMode) {
            reset({
                currency: "usd",
                interval: "month",
                intervalCount: 1,
                trialPeriodDays: 0,
                userTypes: defaultUserType ? [defaultUserType] : [],
                priority: 1,
            });
            setFeatures([]);
        }
    }, [open, defaultUserType, reset, isEditMode]);

    return (
        <Modal open={open} onCancel={handleCancel} footer={null} centered width={500} className="subscription-plan-modal">
            <div className="p-4">
                <h2 className="text-lg font-bold text-green-600 mb-3 text-center">
                    {isEditMode ? "Edit" : "Create"} Subscription Plan {defaultUserType ? `for ${defaultUserType}` : ""}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium mb-1">Plan Name *</label>
                            <input {...register("name")} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="e.g., Driver Pro" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {!isEditMode && (
                            <div>
                                <label className="block text-xs font-medium mb-1">Price ($) *</label>
                                <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="49.99" />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Description *</label>
                        <textarea {...register("description")} rows={2} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="Describe the plan features and benefits..." />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    {!isEditMode && (
                        <>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Billing Interval *</label>
                                    <select {...register("interval")} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent">
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                    </select>
                                    {errors.interval && <p className="text-red-500 text-xs mt-1">{errors.interval.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1">Trial Period (Days)</label>
                                    <input type="number" {...register("trialPeriodDays", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="10" />
                                    {errors.trialPeriodDays && <p className="text-red-500 text-xs mt-1">{errors.trialPeriodDays.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1">User Types *</label>
                                <div className="grid grid-cols-3 gap-1">
                                    {userTypesOptions.map((option) => (
                                        <label key={option.value} className="flex items-center text-xs">
                                            <input type="checkbox" checked={userTypes.includes(option.value)} onChange={() => handleUserTypeChange(option.value)} className="mr-1 scale-90" />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                                {errors.userTypes && <p className="text-red-500 text-xs mt-1">{errors.userTypes.message}</p>}
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium mb-1">Max Users *</label>
                            <input type="number" {...register("maxUsers", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="1" />
                            {errors.maxUsers && <p className="text-red-500 text-xs mt-1">{errors.maxUsers.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1">Max Trucks *</label>
                            <input type="number" {...register("maxTrucks", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="3" />
                            {errors.maxTrucks && <p className="text-red-500 text-xs mt-1">{errors.maxTrucks.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Features *</label>
                        <input onKeyPress={handleAddFeature} placeholder="Type feature and press Enter..." className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent mb-1" />
                        <div className="flex flex-wrap gap-1">
                            {features.map((feature, index) => (
                                <span key={index} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs flex items-center">
                                    {feature}
                                    <button type="button" onClick={() => removeFeature(index)} className="ml-1 text-red-500 hover:text-red-700 text-xs">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Priority</label>
                        <input type="number" {...register("priority", { valueAsNumber: true })} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent" placeholder="1" />
                        {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-3">
                        <button type="button" onClick={handleCancel} className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                            {isLoading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Plan" : "Create Plan"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default SubscriptionPlanForm;
