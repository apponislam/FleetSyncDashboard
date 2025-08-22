import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import SupportRequestTable from "./SupportRequestTable";

export const SupportRequest = () => {
    return (
        <div>
            <div className="flex items-center my-10 text-2xl">
                <Link to={"/settings"} className="text-xl">
                    <FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" />
                </Link>

                <h2 className="text-[#00A430]  font-semibold">Support Request</h2>
            </div>

            <SupportRequestTable />
        </div>
    );
};
