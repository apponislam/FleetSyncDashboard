
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { FaArrowLeft } from 'react-icons/fa';
const ChangePassword = () => {
          const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    reset();
    
  };
  return (
    <div>

         <div className="flex items-center my-10 text-2xl">
        <Link to={'/settings'} className="text-xl"><FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" /></Link>

        <h2 className="text-[#00A430]  font-semibold">
          Change Password
        </h2>
      </div>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white rounded-lg w-full lg:max-w-3xl p-6 shadow-md">
  <div>
    <label className="label-class">
      Old Password
    </label>
    <input
      {...register("oldPassword")}
      type="password"
      required
      placeholder="Write Current Password"
      className="form-input"
    />
  </div>



  <div>
    <label className="label-class">
      Enter New Password
    </label>
    <input
      {...register("newPassword")}
      type="password"
      required
      placeholder="Enter New Password"
      className="form-input"
    />
  </div>

  <div>
    <label className="label-class">
      Confirm New Password
    </label>
    <input
      {...register("confirmNewPassword")}
      type="password"
      required
      placeholder="Confirm New Password"
      className="form-input  focus:border-[#4796B5]"
    />
  </div>

 
<div className="flex justify-end items-end mt-10 ">
<button type='submit' className="bg-[#00A430]  hover:bg-green-700 text-white w-[180px] px-6 py-2 rounded-full font-medium">
            Update
          </button>
</div>
</form>



    </div>
  )
}

export default ChangePassword