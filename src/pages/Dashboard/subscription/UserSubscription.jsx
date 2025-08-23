import { useState } from "react";
import CustomSearch from "../../../Components/Shared/CustomSearch";
import Filter from "../../../Components/Shared/Filter";
import UserSubscriptionTable from "./UserSubscriptionTable";

const UserSubscription = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleFilter = (filter) => {
        setRoleFilter(filter);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end  mb-5 mx-2 gap-x-2">
                <CustomSearch setSearch={handleSearch} search={searchTerm} />
                <Filter setFilter={handleFilter} />
            </div>

            <UserSubscriptionTable searchTerm={searchTerm} roleFilter={roleFilter}></UserSubscriptionTable>
        </div>
    );
};

export default UserSubscription;
