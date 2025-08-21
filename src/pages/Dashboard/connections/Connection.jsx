import ConnectionTable from './ConnectionTable';
import { Dropdown, Menu, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useGetConnectionsQuery } from '../../../redux/api/connectionsApi';

const Connections = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");

  const { data, error, isLoading } = useGetConnectionsQuery({ 
    page, 
    limit: 10, 
    searchTerm, 
    role 
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const menuItems = [
    { key: "driver", label: "Driver" },
    { key: "company", label: "Company" },
    { key: "mechanic", label: "Mechanic" },
  ];

  const menu = (
    <Menu
      items={menuItems}
      onClick={(info) => {
        setRole(info.key);
        setPage(1); 
      }}
    />
  );

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
              setPage(1); // search change হলে page reset
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="bg-[#00A430] px-4 rounded-full cursor-pointer flex justify-center items-center">
            <img src="/filter.png" className="h-6" alt="filter" />
          </div>
        </Dropdown>
      </div>

      <ConnectionTable data={data} page={page} setPage={setPage} />
    </div>
  );
};

export default Connections;
