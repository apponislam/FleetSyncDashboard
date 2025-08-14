import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

import Logo from "../Shared/Logo";
import DashbordSVG from "../../../public/DashbordSVG";
import PredictionSVG from "../../../public/PredictionsSVG";
import UserSVG from "../../../public/UserSVG";
import TicketSVG from "../../../public/TicketSVG";
import TransactionSVG from "../../../public/TransactionSVG";
import JackpotSVG from "../../../public/JackpotSVG";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    renderIcon: (isActive) => (
      <DashbordSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />
    ),
  },
  {
    label: "Predictions",
    path: "/predictions",
    renderIcon: (isActive) => (
      <PredictionSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />
    ),
  },
  {
    label: "User Details",
    path: "/user-details-page",
    renderIcon: (isActive) => (
      <UserSVG strokeColor={isActive ? "#FEFEFE" : "#FEFEFE"} />
    ),
  },
  {
    label: "Ticket Management",
    path: "/ticket-management",
    renderIcon: (isActive) => (
      <TicketSVG strokeColor={isActive ? "#0B3666" : "#FEFEFE"} />
    ),
  },
  {
    label: "Transaction",
    path: "/transaction",
    renderIcon: (isActive) => (
      <TransactionSVG strokeColor={isActive ? "#0B3666" : "#FEFEFE"} />
    ),
  },
  {
    label: "Settings",
    path: "/settings",
    renderIcon: (isActive) => (
      <CiSettings
        size={28}
        className={`text-${isActive ? "#0B3666" : "#FEFEFE"}`}
      />
    ),
  },
  {
    label: "Jackpot Tracker",
    path: "/jackpot-tracker",
    renderIcon: (isActive) => (
      <JackpotSVG strokeColor={isActive ? "#0B3666" : "#FEFEFE"} />
    ),
  },
];

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="h-full px-3 pt-2" style={{ fontFamily: "Manrope" }}>
      {/* Logo */}
      <div className="flex items-center justify-center pb-6 cursor-pointer">
        <Logo  />
      </div>

      {/* Menu Items */}
      <div style={{ backgroundColor: "#121217", color: "#929292" }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <div
              key={item.path}
              className={
                isActive
                  ? "bg-[#00A430] text-[#FEFEFE] font-semibold text-xl rounded-sm transition-transform"
                  : "text-[#FEFEFE] text-xl"
              }
            >
              <Link
                to={item.path}
                onClick={closeSidebar}
                className="flex items-center gap-4 px-4 py-3"
              >
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
