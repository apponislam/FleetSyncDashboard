import { useState } from "react";
import CustomSearch from "../../../Components/Shared/CustomSearch";
import Filter from "../../../Components/Shared/Filter";
import VerificationTable from "./VerificationTable";

const Verifications = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    return (
        <div className="p-4">
            <div className="flex justify-end  mb-5 mx-2 gap-x-2">
                <CustomSearch setSearch={setSearch} search={search} />
                <Filter setFilter={setFilter} />
            </div>

            <VerificationTable search={search} filter={filter} />
        </div>
    );
};

export default Verifications;
