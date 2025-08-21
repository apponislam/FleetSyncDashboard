import { useState } from "react";
import CustomSearch from "../../../Components/Shared/CustomSearch";
import Filter from "../../../Components/Shared/Filter";
import UserManagementTable from "./UserManagementTable";

const UserDetailsPage = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleFilter = (filterValue) => {
        setFilter(filterValue);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end  mb-5 mx-2 gap-x-2">
                <CustomSearch search={search} setSearch={handleSearch}></CustomSearch> <Filter setFilter={handleFilter}></Filter>
            </div>

            <UserManagementTable search={search} filter={filter}></UserManagementTable>
        </div>
    );
};

export default UserDetailsPage;
