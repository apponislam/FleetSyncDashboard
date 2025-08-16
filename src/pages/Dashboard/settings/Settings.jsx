import { Link } from "react-router-dom";


const Settings = () => {
      const settingsItems = [
    { label: "Profile Information", to: "/settings/profile" },
    { label: "Change Password", to: "/settings/change-password" },
    { label: "Support Request", to: "/settings/support-request" },
    { label: "About", to: "/settings/about" },
    { label: "Privacy Policy", to: "/settings/privacy" },
    { label: "Terms and Conditions", to: "/settings/terms" },


  ];
  return (
    <div>

        
 <div className="space-y-2 p-4 max-w-4xl">
           {/* Settings Links */}
        {settingsItems.map(({ label, to }, idx) => (
          <Link
            key={idx}
            to={to}
            className="flex justify-between items-center bg-white px-4 py-4 rounded-md shadow-sm  font-medium text-gray-800 hover:bg-gray-100 transition border border-gray-300"
          >
            {label}
            <span className=" text-gray-800 text-lg font-medium ">&gt;</span>
          </Link>
        ))}
 </div>
    </div>
  )
}

export default Settings