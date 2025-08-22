// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { FaArrowLeft } from "react-icons/fa";
// const ChangePassword = () => {
//     const { register, handleSubmit, reset } = useForm();

//     const onSubmit = (data) => {
//         console.log("Submitted Data:", data);
//         reset();
//     };
//     return (
//         <div>
//             <div className="flex items-center my-10 text-2xl">
//                 <Link to={"/settings"} className="text-xl">
//                     <FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" />
//                 </Link>

//                 <h2 className="text-[#00A430]  font-semibold">Change Password</h2>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white rounded-lg w-full lg:max-w-3xl p-6 shadow-md">
//                 <div>
//                     <label className="label-class">Old Password</label>
//                     <input {...register("oldPassword")} type="password" required placeholder="Write Current Password" className="form-input" />
//                 </div>

//                 <div>
//                     <label className="label-class">Enter New Password</label>
//                     <input {...register("newPassword")} type="password" required placeholder="Enter New Password" className="form-input" />
//                 </div>

//                 <div>
//                     <label className="label-class">Confirm New Password</label>
//                     <input {...register("confirmNewPassword")} type="password" required placeholder="Confirm New Password" className="form-input  focus:border-[#4796B5]" />
//                 </div>

//                 <div className="flex justify-end items-end mt-10 ">
//                     <button type="submit" className="bg-[#00A430]  hover:bg-green-700 text-white w-[180px] px-6 py-2 rounded-full font-medium">
//                         Update
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ChangePassword;

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../../redux/api/userApi";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        try {
            const passwordData = {
                currentPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmNewPassword,
            };

            const result = await changePassword(passwordData).unwrap();
            console.log(result);
            toast.success(result.message || "Password changed successfully!");
            reset();
        } catch (error) {
            console.log(error);
            toast.error(error.data.message || "Error changing password");
        }
    };

    return (
        <div>
            <div className="flex items-center my-10 text-2xl">
                <Link to={"/settings"} className="text-xl">
                    <FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" />
                </Link>
                <h2 className="text-[#00A430] font-semibold">Change Password</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white rounded-lg w-full lg:max-w-3xl p-6 shadow-md">
                <div>
                    <label className="label-class">Current Password</label>
                    <input {...register("oldPassword", { required: "Current password is required" })} type="password" placeholder="Write Current Password" className="form-input" />
                    {errors.oldPassword && <span className="text-red-500">{errors.oldPassword.message}</span>}
                </div>

                <div>
                    <label className="label-class">New Password</label>
                    <input
                        {...register("newPassword", {
                            required: "New password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        })}
                        type="password"
                        placeholder="Enter New Password"
                        className="form-input"
                    />
                    {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
                </div>

                <div>
                    <label className="label-class">Confirm New Password</label>
                    <input
                        {...register("confirmNewPassword", {
                            required: "Please confirm your password",
                            validate: (value) => value === newPassword || "Passwords do not match",
                        })}
                        type="password"
                        placeholder="Confirm New Password"
                        className="form-input focus:border-[#4796B5]"
                    />
                    {errors.confirmNewPassword && <span className="text-red-500">{errors.confirmNewPassword.message}</span>}
                </div>

                <div className="flex justify-end items-end mt-10">
                    <button type="submit" disabled={isLoading} className="bg-[#00A430] hover:bg-green-700 text-white w-[180px] px-6 py-2 rounded-full font-medium disabled:bg-gray-400">
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
