import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import Logo from "../Shared/Logo";
import { useGetProfileQuery } from "../../redux/api/userApi";

const HeaderDashboard = ({ toggleSidebar, isSidebarOpen }) => {
    const { data: profile, isLoading, error } = useGetProfileQuery();

    // Function to get the complete image URL
    const getProfileImageUrl = (imagePath) => {
        if (!imagePath) return "/admin.jpg";

        // If imagePath already starts with http or https, return as is
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }

        // Otherwise, prefix with your server URL
        return `${import.meta.env.VITE_BASE_URL}${imagePath}`;
    };

    return (
        <div className="flex items-center justify-between h-[80px] bg-[#121217] px-4 md:px-14 lg:px-20 pt-2">
            {/* Left section */}
            <>
                <div className="hidden lg:flex ">{/* <RouteHeader /> */}</div>
                <div className="lg:hidden flex">
                    <Logo sm />
                </div>
            </>

            {/* Right Section */}
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Notification */}
                {/* <Link to="/notifications" className="relative flex items-center justify-center">
                    <img src="/notification.png" alt="Notification" className="h-7 w-7" />
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs px-1 rounded-full">1</span>
                </Link> */}

                {/* Admin Profile */}
                <Link to="/settings/profile" className="flex items-center gap-2">
                    {isLoading ? (
                        // Loading skeleton
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse"></div>
                            <div className="h-4 w-20 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                    ) : error ? (
                        // Error state - fallback to default image
                        <div className="flex items-center gap-2">
                            <img src="/admin.jpg" alt="Admin" className="w-10 h-10 rounded-full border-[3px] border-white object-cover" style={{ border: "4px solid #0B3666 !important" }} />
                            <h2 className="text-white font-semibold text-base">Admin</h2>
                        </div>
                    ) : (
                        // Success state - display actual profile data
                        <div className="flex items-center gap-2">
                            <img
                                src={getProfileImageUrl(profile?.profile)}
                                alt={profile?.name || "Admin"}
                                className="w-10 h-10 rounded-full border-[3px] border-white object-cover"
                                style={{ border: "4px solid #0B3666 !important" }}
                                onError={(e) => {
                                    e.target.src = "/admin.jpg";
                                }}
                            />
                            <h2 className="text-white font-semibold text-base">{profile?.name || "Admin"}</h2>
                        </div>
                    )}
                </Link>

                {/* Mobile Sidebar Toggle */}
                <button onClick={toggleSidebar} className="lg:hidden text-3xl !text-white focus:outline-none cursor-pointer" aria-label="Toggle Sidebar">
                    {isSidebarOpen ? <MdClose size={28} /> : <RxHamburgerMenu size={28} />}
                </button>
            </div>
        </div>
    );
};

export default HeaderDashboard;
