import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

import Logo from "../Shared/Logo";
import DashbordSVG from "../../../public/DashbordSVG";
import UserSVG from "../../../public/UserSVG";
import TicketSVG from "../../../public/TicketSVG";
import JackpotSVG from "../../../public/JackpotSVG";
import VerificationSVG from "../../../public/VerificationSVG";

import PromoSVG from "../../../public/PrmoSVG";
import Promo2SVG from "../../../public/Prmo2SVG";

const menuItems = [
    {
        label: "Dashboard",
        path: "/",
        renderIcon: (isActive) => <DashbordSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    },

    {
        label: "User Details",
        path: "/user-details-page",
        renderIcon: (isActive) => <UserSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    },
    {
        label: "Connections",
        path: "/connections",
        renderIcon: (isActive) => <TicketSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    },
    {
        label: "Subscription",
        path: "/subscription",
        renderIcon: (isActive) => <JackpotSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    },
    {
        label: "Verifications",
        path: "/verifications",
        renderIcon: (isActive) => <VerificationSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    },
    // {
    //     label: "Promotional",
    //     path: "/promotional",
    //     renderIcon: (isActive) => <PromoSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    // },
    // {
    //     label: "Promotin",
    //     path: "/promotion",
    //     renderIcon: (isActive) => <Promo2SVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />,
    // },
    {
        label: "Settings",
        path: "/settings",
        renderIcon: (isActive) => <CiSettings size={28} className={`text-${isActive ? "#FEFEFE" : "#FEFEFE"}`} />,
    },
];

const Sidebar = ({ closeSidebar }) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="h-full px-3 pt-2" style={{ fontFamily: "Manrope" }}>
            {/* Logo */}
            <div className="flex items-center justify-center pb-6 cursor-pointer">
                <Logo />
            </div>

            {/* Menu Items */}
            <div style={{ backgroundColor: "#121217", color: "#929292" }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <div key={item.path} className={isActive ? "bg-[#00A430] text-[#FEFEFE] font-semibold text-xl rounded-[20px] transition-transform" : "text-[#FEFEFE] text-xl font-semibold"}>
                            <Link to={item.path} onClick={closeSidebar} className="flex items-center gap-4 px-5 py-4">
                                <span>{item.renderIcon(isActive)}</span>
                                {item.label}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
