import { PlusOutlined } from "@ant-design/icons";


const SubscriptionCard = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Left side: Role + Card */}
      <div>
        <h3 className="font-semibold text-2xl mb-2">• Driver Role</h3>
        <div className="bg-[#2C2C2C] rounded-xl p-4 w-60 text-center">
          <p className="text-white text-base">Monthly</p>
          <p className="text-green-500 font-bold text-lg mb-3">$1.99/month</p>

          <div className="flex gap-2 items-center justify-center">
            <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">
              Delete
            </button>
            <button className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm">
              Edit Now
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Circle + Add button */}
      <div className="flex flex-col items-center gap-2 mt-12  ">
        <div className="w-20 h-20 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center">
 <PlusOutlined size={64} className="text-4xl  text-slate-300" />
        </div>
        <button className="bg-green-600 text-white px-5 py-1 rounded-full shadow">
          Add
        </button>
      </div>
    </div>
  );
};

const SubscriptionManagment = () => {
  return (
    <div className="p-6 grid grid-cols-2 gap-8">
      <SubscriptionCard />
      <SubscriptionCard />
      <SubscriptionCard />
      <SubscriptionCard />
      <SubscriptionCard />
    </div>
  );
};

export default SubscriptionManagment;
