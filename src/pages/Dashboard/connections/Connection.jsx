import ConnectionTable from "./ConnectionTable";
import { Dropdown, Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetConnectionsQuery } from "../../../redux/api/connectionsApi";

const Connections = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    // const [role, setRole] = useState("");

    const { data, error, isLoading } = useGetConnectionsQuery({
        page,
        limit: 10,
        searchTerm,
        // role,
    });

    console.log(data);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <div className="flex justify-end mb-5 mx-2 gap-x-2">
                {/* Search Box */}
                <div className="flex items-center bg-transparent border border-black rounded-xl px-2 py-1 w-full lg:w-[234px] h-14">
                    <SearchOutlined className="!text-[#6D717F] text-sm" />
                    <Input
                        placeholder="Search here"
                        bordered={false}
                        className="focus:outline-none w-full pl-2"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            <ConnectionTable data={data} />
        </div>
    );
};

export default Connections;
